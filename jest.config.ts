import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts'],

  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          target: 'es2022',
        },
        module: { type: 'commonjs' },
      },
    ],
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  clearMocks: true,
};

export default config;
