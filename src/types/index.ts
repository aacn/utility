export type { Paginated } from './Paginated';
export type { CancelableComponent } from './CancelableComponent';
export type { CRUDCompontent } from './CRUDCompontent';
export type {
  UseStateComponent,
  DirectUseStateComponent,
} from './UseStateComponent';
export { HttpStatus } from './enums/HttpStatus';
export { PostgresError } from './enums/PostgresError';

export type NativeError = ErrorConstructor & {
  status: number;
  message: string;
  error: string;
};

export interface NativeErrorResponse extends Response {
  isNativeError: boolean;
}

export namespace native {
  export type Error = NativeError;
  export type ErrorResponse = NativeErrorResponse;
}
