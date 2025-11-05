import { Prisma } from '@prisma/client';
import { PaginationParams, PaginatedResult } from './pagination.util';

interface QueryOptions<T> extends PaginationParams {
  search?: string;
  filters?: string;
  filtersValues?: string;
  baseWhere?: Prisma.Enumerable<Prisma.EntregaWhereInput>;
}

export async function queryBuilder<T>(
  queryFn: (where: any, skip: number, take: number) => Promise<[T[], number]>,
  options: QueryOptions<T>,
): Promise<PaginatedResult<T>> {
  const {
    page = 1,
    limit = 10,
    search,
    filters,
    filtersValues,
    baseWhere = {},
  } = options;

  const skip = (page - 1) * limit;

  // --- Construcción dinámica del WHERE ---
  let where: any = { ...baseWhere };

  if (filters && filtersValues) {
    const fields = filters.split(',');
    const values = filtersValues.split(',');
    where.OR = fields.map((field, i) => buildNestedFilter(field, values[i]));
  }

  // Ejecutar consulta y count
  const [data, totalItems] = await queryFn(where, skip, limit);

  return {
    data,
    meta: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      pageSize: limit,
    },
  };
}

function buildNestedFilter(field: string, value: string) {
  const parts = field.split('.');

  // Intentar convertir a número
  const numValue = Number(value);
  const isNumeric = !isNaN(numValue);

  // Construcción recursiva del filtro (de adentro hacia afuera)
  return parts.reverse().reduce((acc, key, index) => {
    if (index === 0) {
      if (isNumeric) {
        return { [key]: numValue };
      }

      return { [key]: { contains: value, mode: 'insensitive' } };
    }
    return { [key]: acc };
  }, {});
}
