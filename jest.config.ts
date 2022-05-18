import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverage: true,
  errorOnDeprecated: true,
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
};

export default config;
