import { describe, expect, it } from '@jest/globals';
import { countryCodeToFlag } from '../src/util/countryCodeToFlag';

describe('countryCodeToFlag', () => {
  it('converts a country code to regional indicator symbols', () => {
    expect(countryCodeToFlag('de')).toBe('🇩🇪');
    expect(countryCodeToFlag('US')).toBe('🇺🇸');
  });

  it('preserves the current behavior for non-empty input', () => {
    expect(countryCodeToFlag('deu')).toBe('🇩🇪🇺');
    expect(countryCodeToFlag('')).toBe('');
  });
});
