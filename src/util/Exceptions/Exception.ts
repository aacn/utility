import { HttpStatus } from '@/types/enums/HttpStatus';

/**
 * Custom exception object used by Native Systems, which extends the Error interface
 * and adds the 'code' attribute, to be able to provide an additional httpStatus.
 */
class NativeException extends Error {
  public code: HttpStatus;

  constructor(code: HttpStatus, message: string) {
    super(message);
    this.name = 'NativeError';
    this.code = code;
  }
}

export { NativeException };
