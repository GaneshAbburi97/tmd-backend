module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['**/*.ts', '!**/types/**', '!**/docs/**', '!**/tests/**']
};
