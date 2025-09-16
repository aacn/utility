import type { Paginated } from '@/types/Paginated';
import type { CancelableComponent } from '@/types/CancelableComponent';
import type { CRUDCompontent } from '@/types/CRUDCompontent';
import type {
  UseStateComponent,
  DirectUseStateComponent,
} from '@/types/UseStateComponent';

import { HttpStatus, PostgresError } from './enums';

declare namespace native {
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

export {
  type native,
  Paginated,
  CancelableComponent,
  CRUDCompontent,
  UseStateComponent,
  DirectUseStateComponent,
  HttpStatus,
  PostgresError,
};
