import { describe, expect, it } from '@jest/globals';
import {
  eqPlugin,
  PatternCompiler,
  stringPlugin,
  urlPlugin,
} from '../src/pattern';

describe('@native-systems/utility/pattern', () => {
  it('compiles templates with the PatternCompiler and plugins', () => {
    const compiler = new PatternCompiler(
      { name: 'Native Systems', role: 'admin' },
      (handlebars) => {
        eqPlugin(handlebars);
        stringPlugin(handlebars);
        urlPlugin(handlebars);
      }
    );

    expect(compiler.compile('Hello {{name}}')).toBe('Hello Native Systems');
    expect(compiler.compile('{{#if (eq role "admin")}}allowed{{/if}}')).toBe(
      'allowed'
    );
    expect(compiler.compile('{{subString name 0 6}}')).toBe('Native');
    expect(compiler.compile('{{urlSafe name}}')).toBe('Native%20Systems');
  });
});
