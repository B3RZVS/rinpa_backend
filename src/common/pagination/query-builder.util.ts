import { PaginationParams, PaginatedResult } from './pagination.util';

/**
 * Opciones para construir la consulta paginada
 * @template WhereInput - Tipo de filtro Where (ej: Prisma.UsuarioWhereInput)
 */
export interface QueryBuilderOptions<WhereInput = any>
  extends PaginationParams {
  search?: string;
  filters?: string;
  filtersValues?: string;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  baseWhere?: WhereInput;
  /**
   * Campos en los que se realizará la búsqueda global
   * Ej: ['nombreUser', 'apellidoUser', 'correoUser']
   */
  searchFields?: string[];
  /**
   * Campos válidos para ordenamiento
   * Ej: ['nombreUser', 'correoUser', 'tipo.nombre']
   */
  sortableFields?: string[];
  /**
   * Campos que son enums (no soportan contains)
   * Ej: ['fuerza', 'estado']
   */
  enumFields?: string[];
}

/**
 * Construye una consulta paginada con soporte para búsqueda, filtros y ordenamiento
 * @template T - Tipo de entidad
 * @template WhereInput - Tipo de filtro Where
 * @param queryFn - Función que ejecuta la consulta
 * @param options - Opciones de paginación, búsqueda, filtros y ordenamiento
 * @returns Resultado paginado
 */
export async function queryBuilder<T, WhereInput = any>(
  queryFn: (
    where: WhereInput,
    skip: number,
    take: number,
    orderBy?: any,
  ) => Promise<[T[], number]>,
  options: QueryBuilderOptions<WhereInput>,
): Promise<PaginatedResult<T>> {
  const {
    page = 1,
    page_size = 10,
    search,
    filters,
    filtersValues,
    sort,
    sortOrder = 'asc',
    baseWhere = {} as WhereInput,
    searchFields = [],
    sortableFields = [],
    enumFields = [],
  } = options;

  const skip = (page - 1) * page_size;
  const take = Number(page_size) || 10;

  // --- Construcción dinámica del WHERE ---
  let where: any = { ...baseWhere };

  // Búsqueda global en múltiples campos
  if (search && searchFields.length > 0) {
    const searchConditions = searchFields.map((field) =>
      buildNestedFilter(field, search, enumFields),
    );
    where.OR = where.OR ? [...where.OR, ...searchConditions] : searchConditions;
  }

  // Filtros específicos
  if (filters && filtersValues) {
    const fields = filters.split(',');
    const values = filtersValues.split(',');
    const filterConditions = fields.map((field, i) =>
      buildNestedFilter(field, values[i], enumFields),
    );
    where.OR = where.OR ? [...where.OR, ...filterConditions] : filterConditions;
  }

  // Construcción del ordenamiento
  let orderBy: any = undefined;
  if (sort && sortableFields.length > 0) {
    // Validar que el campo sea ordenable
    if (sortableFields.includes(sort)) {
      orderBy = buildOrderBy(sort, sortOrder);
    }
  }

  // Ejecutar consulta y count
  const [data, totalItems] = await queryFn(where, skip, take, orderBy);

  return {
    data,
    meta: {
      totalItems,
      totalPages: Math.ceil(totalItems / page_size),
      currentPage: page,
      page_size: page_size,
    },
  };
}

/**
 * Construye un filtro anidado para campos con relaciones
 * @param field - Campo a filtrar (puede ser anidado, ej: 'tipo.nombre')
 * @param value - Valor a buscar
 * @param enumFields - Lista de campos que son enums
 * @returns Objeto de filtro de Prisma
 */
function buildNestedFilter(
  field: string,
  value: string,
  enumFields: string[] = [],
): any {
  const parts = field.split('.');
  const finalField = parts[parts.length - 1];
  const isEnumField = enumFields.includes(finalField);
  // Intentar convertir a número
  const numValue = Number(value);
  const isNumeric = !isNaN(numValue) && value.trim() !== '';

  // Verificar si es un campo enum

  // Construcción recursiva del filtro (de adentro hacia afuera)
  return parts.reverse().reduce((acc, key, index) => {
    if (index === 0) {
      // último nivel
      if (isNumeric) {
        return { [key]: numValue };
      }

      if (isEnumField) {
        return { [key]: { equals: value } };
      }

      return { [key]: { contains: value, mode: 'insensitive' } };
    }

    return { [key]: acc };
  }, {});
}

/**
 * Construye el objeto de ordenamiento para Prisma
 * @param field - Campo por el que ordenar (puede ser anidado, ej: 'tipo.nombre')
 * @param order - Orden (asc o desc)
 * @returns Objeto de ordenamiento de Prisma
 */
function buildOrderBy(field: string, order: 'asc' | 'desc'): any {
  const parts = field.split('.');

  // Construcción recursiva del ordenamiento (de adentro hacia afuera)
  return parts.reverse().reduce((acc, key, index) => {
    if (index === 0) {
      return { [key]: order };
    }
    return { [key]: acc };
  }, {});
}
