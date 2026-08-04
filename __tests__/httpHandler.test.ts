import { afterAll, describe, expect, it, jest } from '@jest/globals';
import {
  HttpHandler,
  HttpStatus,
  NativeException,
  type NativeError,
  type NativeErrorResponse,
} from '../src';
import { logger } from '../src/util/Logger';

const loggerError = jest
  .spyOn(logger, 'error')
  .mockImplementation(() => undefined);

afterAll(() => {
  loggerError.mockRestore();
});

describe('HttpHandler.error', () => {
  it('preserves native error responses', async () => {
    const error = {
      status: HttpStatus.BAD_REQUEST,
      message: 'Invalid request',
      error: 'BadRequest',
    } as NativeError;
    const response = {
      isNativeError: true,
      json: async () => error,
    } as unknown as NativeErrorResponse;

    await expect(HttpHandler.error<void>(response)).rejects.toBe(error);
    expect(logger.error).toHaveBeenCalledWith('Request failed:', error.message);
  });

  it.each([
    ['Error', new Error('connection failed')],
    ['TypeError', new TypeError('fetch failed')],
  ])('wraps a network %s in NativeException', async (_name, error) => {
    await expect(HttpHandler.error<void>(error)).rejects.toMatchObject({
      name: 'NativeError',
      code: HttpStatus.NOT_IMPLEMENTED,
      message: error.toString(),
    });
    await expect(HttpHandler.error<void>(error)).rejects.toBeInstanceOf(
      NativeException
    );
  });

  it.each([
    ['null', null, 'Request failed for unknown reason. (Network error)'],
    [
      'undefined',
      undefined,
      'Request failed for unknown reason. (Network error)',
    ],
  ])(
    'handles %s without throwing synchronously',
    async (_name, error, message) => {
      await expect(HttpHandler.error<void>(error)).rejects.toMatchObject({
        name: 'NativeError',
        code: HttpStatus.NOT_IMPLEMENTED,
        message,
      });
    }
  );

  it.each([
    ['a string', 'connection failed', 'connection failed'],
    ['a number', 503, '503'],
    ['a boolean', false, 'false'],
    ['a symbol', Symbol('connection failed'), 'Symbol(connection failed)'],
  ])('wraps %s as a network error', async (_name, error, message) => {
    await expect(HttpHandler.error<void>(error)).rejects.toMatchObject({
      name: 'NativeError',
      code: HttpStatus.NOT_IMPLEMENTED,
      message,
    });
  });
});
