const baseConfig = require('./jest.config')

module.exports = {
  ...baseConfig,
  collectCoverage: false,
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@scalar/express-api-reference$': '<rootDir>/test/integration/mocks/scalar.ts',
  },
  setupFiles: ['<rootDir>/test/integration/setup-env.ts'],
  testMatch: ['**/*.integration-spec.ts'],
  testPathIgnorePatterns: [],
}
