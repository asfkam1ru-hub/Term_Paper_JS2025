export default {
  testEnvironment: 'jsdom',
  passWithNoTests: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/App.test.tsx',
    '/src/DeckList.test.tsx'
  ],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.tsx',
    '!src/test/**',
    '!src/ui-library.d.ts'
  ]
}
