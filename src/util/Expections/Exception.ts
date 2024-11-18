import { HttpStatus } from '@nestjs/common';

/**
 * Custom exception object used by Native Systems, which extends the Error interface
 * and adds the 'code' attribute, to be able to provide an additional httpStatus.
 */
class NativeException extends Error {
  public code: HttpStatus;

  constructor(code: HttpStatus, message: string) {
    super(message);
    this.name = 'ShophubError';
    this.code = code;
  }
}

export { NativeException };
