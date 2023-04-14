module.exports = {
  transform: {
    "^.+\\.tsx?$": "es-jest"
  },
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  watchPathIgnorePatterns: ['.*.js$'],
}
