import { Error } from './Error';
import { ErrorResponse } from '@/types/ErrorResponse';

declare namespace Native {
  export { Error, ErrorResponse };
}

export { Native };
