declare namespace Native {
  type Error = ErrorConstructor & {
    status: number;
    message: string;
    error: string;
  };

  interface ErrorResponse extends Response {
    isNativeError: boolean;
  }

  export { Error, ErrorResponse };
}

export type { Native };
