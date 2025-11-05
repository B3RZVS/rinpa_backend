export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  page_size: number;
}
export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export async function paginate<T>(
  queryFn: (skip: number, take: number) => Promise<[T[], number]>,
  { page = 1, page_size = 10 }: PaginationParams,
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * page_size;
  const [data, totalItems] = await queryFn(skip, page_size);

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
