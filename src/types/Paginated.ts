type Paginated<T> = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  data: T;
};

export type { Paginated };
