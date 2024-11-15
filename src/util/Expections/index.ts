import { HttpException, HttpStatus } from '@nestjs/common';

import { PostgresError } from '@/types/enums/PostgresError';
import { NativeException } from '@/util/Expections/Exception';
import { PgException } from '@/util/Expections/PgException';
import { getHttpStatusText } from '@/util/getHttpStatusText';

class Exceptions {
  /**
   * Evaluates a thrown postgres error object, which is then sanitized into an appropriate NativeError object.
   * @param error a postgres error that, for example is from a rejected promise.
   * @returns {NativeException} a NativeError object with either a concrete reason or a generic error message.
   */
  private static transformPgError(error: PgException): NativeException {
    let httpStatus: HttpStatus;
    let errMsg: string | null = null;

    switch (error.getStatus()) {
      case PostgresError.FOREIGN_KEY_VIOLATION:
        httpStatus = HttpStatus.NOT_FOUND;
        errMsg = error.getSpecificMessage(PostgresError.FOREIGN_KEY_VIOLATION);
        break;
      case PostgresError.UNIQUE_VIOLATION:
        httpStatus = HttpStatus.CONFLICT;
        errMsg = error.getSpecificMessage(PostgresError.UNIQUE_VIOLATION);
        break;
      case PostgresError.INVALID_TEXT_REPRESENTATION:
        httpStatus = HttpStatus.BAD_REQUEST;
        errMsg = error.getSpecificMessage(
          PostgresError.INVALID_TEXT_REPRESENTATION
        );
        break;
      default:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new NativeException(httpStatus, errMsg ?? error.message);
  }

  /**
   * Transforms an exception instance into a HttpException instance and returns it.
   * @param error {PgException | NativeException} An error object of one of those instances.
   * @returns {HttpException} The transformed exception, modeled into a HttpException instance.
   */
  public static toHttpException(
    error: PgException | NativeException
  ): HttpException {
    let _error = error;

    if (_error instanceof PgException) {
      _error = this.transformPgError(_error);
    }

    return new HttpException(
      {
        status: _error.code,
        message: _error.message,
        error: getHttpStatusText(_error.code),
      },
      _error.code
    );
  }
}

export { Exceptions };
