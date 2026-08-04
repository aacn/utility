import { describe, expect, it, jest } from '@jest/globals';

jest.mock('handlebars', () => {
  throw new Error('The browser-safe root entry must not load Handlebars');
});

import { CookieHelper, DateFormatter, HttpStatus, parseTemplate } from '../src';

describe('@native-systems/utility root entry', () => {
  it('loads without evaluating Handlebars-dependent modules', () => {
    expect(parseTemplate('/users/{id}').expand({ id: '42' })).toBe('/users/42');
    expect(DateFormatter.formatFormal('2025-08-14T15:30:00Z')).toBe(
      '14.08.2025'
    );
    expect(HttpStatus.OK).toBe(200);
    expect(CookieHelper).toBeDefined();
  });
});
