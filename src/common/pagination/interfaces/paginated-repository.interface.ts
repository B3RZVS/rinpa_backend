/**
 * Interfaz genérica para repositories que soportan paginación
 * @template T - Tipo de entidad
 * @template WhereInput - Tipo de filtro Where (ej: Prisma.UsuarioWhereInput)
 */
export interface IPaginatedRepository<T, WhereInput = any> {
  /**
   * Obtiene una lista paginada de entidades
   * @param where - Filtros de búsqueda
   * @param skip - Número de registros a saltar
   * @param take - Número de registros a tomar
   * @param orderBy - Ordenamiento de los resultados
   * @returns Tupla con [entidades, total de registros]
   */
  findAllPaginated(
    where: WhereInput,
    skip: number,
    take: number,
    orderBy?: any,
  ): Promise<[T[], number]>;
}
