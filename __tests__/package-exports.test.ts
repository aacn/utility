import { describe, expect, it } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type ConditionalExports = {
  types: string;
  import: string;
  require: string;
};

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../package.json'), 'utf8')
) as {
  exports: {
    '.': ConditionalExports;
    './pattern': ConditionalExports;
  };
};

describe('package exports', () => {
  it('resolves both root and pattern entrypoints for every module system', () => {
    expect(packageJson.exports).toEqual({
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.esm.js',
        require: './dist/index.cjs',
      },
      './pattern': {
        types: './dist/pattern.d.ts',
        import: './dist/pattern.esm.js',
        require: './dist/pattern.cjs',
      },
    });
  });
});
