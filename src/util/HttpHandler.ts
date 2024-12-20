import { logger } from '@/util/Logger';
import { Native } from '@/types';
import { NativeException } from '@/util/Expections';

class HttpHandler {
  /**
   * Http request response handler, which checks if the given response is in status range 'ok'.
   * If this is the case, parse and return the data.
   * If the response is not ok, that means the response was successfully transmitted to the server, but the request failed.
   * This means, that the reason of the error is not a network error for example.
   * @param response {Response} The raw response data from the server, which could also be a Native.Error.
   * @returns {<T>} The expected data resource, if the status of the request is 'ok'.
   * @throws {Native.ErrorResponse} A modified version of the default Response object, to be able to detect if the error response is of the expected type.
   */
  public static response<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.text().then((text) => {
        // Check if the response body is empty
        if (!text) {
          return null as T;
        }
        return JSON.parse(text) as T;
      });
    }

    // Not printing native error here, but in the error function instead, since body can only be consumed once. (via res.json())
    const errorResponse: Native.ErrorResponse = Object.assign(response, {
      isNativeError: true,
    });

    return Promise.reject(errorResponse);
  }

  /**
   * Http request error handler, that always returns the correct error object.
   * Either fast forwards the already correctly formatted naive error or set up a new native error, based on the provided info.
   * The generic typing is just used to prevent type errors.
   * @param response {Response | Native.ErrorResponse} The Response object that errored. Can either be a default object, or the modified native version.
   * @throws {Native.Error} Always throws an error, which is always of this type.
   */
  public static error<T>(
    response: Response | Native.ErrorResponse
  ): Promise<T> {
    if ('isNativeError' in response && response.isNativeError) {
      return response.json().then((error: Native.Error) => {
        logger.error('Request failed:', error.message);

        return Promise.reject(error);
      });
    } else {
      logger.error('Request failed because of a network error.');
      const nativeError = new NativeException(
        500,
        response.toString() ??
          'Request failed for unknown reason. (Network error)'
      );
      return Promise.reject(nativeError);
    }
  }
}

export { HttpHandler };
