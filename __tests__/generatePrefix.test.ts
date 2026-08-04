import { describe, expect, it } from '@jest/globals';
import { generatePrefix } from '../src/util/generatePrefix';

describe('generatePrefix', () => {
  it('generates a compact prefix from a camelCase name', () => {
    expect(generatePrefix('EventCo')).toBe('evc');
  });

  it('uses the default and custom fallback for empty names', () => {
    expect(generatePrefix('')).toBe('org');
    expect(generatePrefix('', 'fallback')).toBe('fallback');
  });
});
