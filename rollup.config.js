import pkg from './package.json' with { type: 'json' };

import { swc } from 'rollup-plugin-swc3';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import flatDts from 'rollup-plugin-flat-dts';
import prettier from 'rollup-plugin-prettier';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import path from 'node:path';

const input = {
  index: 'src/index.ts',
  pattern: 'src/pattern.ts',
};

const external = Object.keys(pkg.peerDependencies || {});

const sharedPlugins = () => [
  nodeResolve(),
  typescriptPaths({
    preserveExtensions: true,
  }),
  json(),
  commonjs(),
  nodePolyfills(), // Circular dependencies warning cant be fixed and will be ignored until further notice
  // Transpile with swc
  swc({
    jsc: {
      baseUrl: path.resolve('./src'),
      paths: { '@/*': ['*'] },
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      target: 'es5',
      loose: false,
      minify: {
        compress: false,
        mangle: false,
      },
    },
  }),
  prettier(),
];

const declarationOptions = {
  moduleName: pkg.name,
  internal: [
    'util/PatternCompiler/index',
    'util/PatternCompiler/Plugin/index',
  ],
  entries: {
    'pattern': {
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/IPatternCompiler': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/PatternCompiler': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/CompilerPlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/EqPlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/MarkdownPlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/StringPlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/TimezonePlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/UrlPlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
    'util/PatternCompiler/Plugin/UserTimezonePlugin': {
      as: 'pattern',
      file: 'pattern.d.ts',
    },
  },
};

const config = [
  {
    input,
    external,
    plugins: [del({ targets: ['dist/*'] }), ...sharedPlugins()],
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      plugins: [flatDts(declarationOptions)],
      exports: 'named',
    },
  },
  {
    input,
    external,
    plugins: sharedPlugins(),
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      exports: 'named',
    },
  },
];

export default config;
