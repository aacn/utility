type CancelableComponent<T> = {
  value: T;
  cancel: () => void;
};

export type { CancelableComponent };
