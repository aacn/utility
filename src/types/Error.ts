type Error = ErrorConstructor & {
  status: number;
  message: string;
  error: string;
};

export { Error };
