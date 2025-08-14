type CRUDCompontent<T, U = T, V = U> = {
  value: T;
  add: (value: U) => void;
  delete: (id: string) => void;
  update: (id: string, value: V) => void;
};

export type { CRUDCompontent };
