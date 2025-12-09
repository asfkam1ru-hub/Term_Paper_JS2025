/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/test/styleMock.ts',
    '\\.(svg)$': '<rootDir>/src/test/styleMock.ts'
  },
  // Считаем покрытие ТОЛЬКО для одного компонента DeckList.tsx
  collectCoverageFrom: [
    'src/components/DeckList.tsx'
  ]
}

export default config
