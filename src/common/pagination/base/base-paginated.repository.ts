import { IPaginatedRepository } from '../interfaces/paginated-repository.interface';

/**
 * Clase base abstracta para repositories que soportan paginación
 * @template T - Tipo de entidad
 * @template WhereInput - Tipo de filtro Where (ej: Prisma.UsuarioWhereInput)
 */
export abstract class BasePaginatedRepository<T, WhereInput = any>
  implements IPaginatedRepository<T, WhereInput>
{
  /**
   * Obtiene una lista paginada de entidades
   * Debe ser implementado por las clases hijas
   */
  abstract findAllPaginated(
    where: WhereInput,
    skip: number,
    take: number,
    orderBy?: any,
  ): Promise<[T[], number]>;
}
