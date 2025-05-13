import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@/types/enums/HttpStatus';
import { PostgresError } from '@/types/enums/PostgresError';
import { NativeException } from '@/util/Expections/Exception';
import { PgException } from '@/util/Expections/PgException';

const statusMap: { [key: number]: string } = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a Teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  424: 'Failed Dependency',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
};

/**
 * Use in Node.js context only!
 */
class Exceptions {
  private static getHttpStatusText(statusCode: number): string {
    const statusText = statusMap[statusCode];

    if (!statusText) {
      return 'Error';
    }

    return statusText;
  }

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
        error: this.getHttpStatusText(_error.code),
      },
      _error.code
    );
  }
}

export { Exceptions };
