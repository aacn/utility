// import { generatePrefix } from '../../src/util/generatePrefix';
//
// describe('generatePrefix', () => {
//   test('handles camelCase names', () => {
//     expect(generatePrefix('EventCo')).toBe('evc');
//     expect(generatePrefix('NextGenSoft')).toBe('ngs');
//     expect(generatePrefix('TechVision')).toBe('tv');
//   });
//
//   test('handles names with spaces', () => {
//     expect(generatePrefix('OpenAI Labs')).toBe('oal');
//     expect(generatePrefix('Mega Data Corp')).toBe('mdc');
//     expect(generatePrefix('Alpha Beta Gamma')).toBe('abg');
//   });
//
//   test('handles all-uppercase names', () => {
//     expect(generatePrefix('NASA')).toBe('nasa');
//     expect(generatePrefix('CERN')).toBe('cern');
//     expect(generatePrefix('IBM')).toBe('ibm');
//   });
//
//   test('handles all-lowercase names', () => {
//     expect(generatePrefix('eventco')).toBe('eventco');
//     expect(generatePrefix('openai')).toBe('openai');
//   });
//
//   test('handles single-letter and short names', () => {
//     expect(generatePrefix('X')).toBe('x');
//     expect(generatePrefix('AB')).toBe('ab');
//     expect(generatePrefix('A')).toBe('a');
//   });
//
//   test('handles numeric and alphanumeric names', () => {
//     expect(generatePrefix('123Tech')).toBe('t');
//     expect(generatePrefix('Tech123')).toBe('t');
//     expect(generatePrefix('A1B2C3')).toBe('abc');
//   });
//
//   test('handles special characters gracefully', () => {
//     expect(generatePrefix('Dev!Org#2024')).toBe('do');
//     expect(generatePrefix('Data&Science*Lab')).toBe('dsl');
//     expect(generatePrefix('AI@Open')).toBe('ao');
//   });
//
//   test('handles empty and invalid input with fallback', () => {
//     expect(generatePrefix('')).toBe('org');
//     expect(generatePrefix('!!!')).toBe('org');
//   });
//
//   test('uses custom fallback when provided', () => {
//     expect(generatePrefix('', 'fallback')).toBe('fallback');
//     expect(generatePrefix('###', 'abc')).toBe('abc');
//   });
//
//   test('ensures result is lowercase and url-safe', () => {
//     const result = generatePrefix('OpenAI Labs');
//     expect(result).toMatch(/^[a-z0-9-]+$/);
//     expect(result).toBe(result.toLowerCase());
//   });
// });
