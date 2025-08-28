import { PostgresError } from '@/types/enums/PostgresError';

type SpecificErrorMsg = Partial<Record<PostgresError, string>>;

/**
 * An exception instance thrown when a postgres error is encountered.
 * The exception extends the default Error object.
 */
class PgException extends Error {
  /** The error object originated from Postgres. */
  public err: any;
  /** Error messages specific for a HttpStatus. */
  private readonly specific: SpecificErrorMsg | undefined;

  /**
   * Creates a new PgException instance.
   * @param err - The original error object from Postgres.
   * @param message - A general error message describing the exception.
   * @param specific - Optional. A record of specific error messages for different HTTP status codes.
   */
  constructor(err: any, message: string, specific?: SpecificErrorMsg) {
    super(message);
    this.name = 'PgError';
    this.err = err;
    this.specific = specific;
  }

  /**
   * Get the postgres error code of the exception object.
   * If no code is set for this error, return the fallback undefined postgres error code.
   * @returns The postgres error code that is associated with this exception.
   */
  getStatus(): PostgresError {
    return this.err?.code ?? PostgresError.UNDEFINED_CODE;
  }

  /**
   * Check and return a message for a specific postgres error code.
   * @param status - The Postgres error code which is related to the desired error message.
   * @returns Either the specific error message or null if not defined for that error code.
   */
  getSpecificMessage(status: PostgresError): string | null {
    if (this.specific && this.specific[status.toString()]) {
      return this.specific[status.toString()];
    }

    return null;
  }
}

export { PgException };
