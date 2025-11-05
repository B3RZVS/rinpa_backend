export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export async function paginate<T>(
  queryFn: (skip: number, take: number) => Promise<[T[], number]>,
  { page = 1, limit = 10 }: PaginationParams,
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit;
  const [data, totalItems] = await queryFn(skip, limit);

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
