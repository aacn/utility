type Paginated<T> = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  resultCount?: number;
  data: T;
};

export type { Paginated };
