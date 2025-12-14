export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json',
      },
    ],
  },

  // если где-то будут импорты с ".js" (часто в ESM), это помогает
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // чтобы покрытие считалось ТОЛЬКО для DeckList (как ты и хочешь)
  collectCoverage: true,
  collectCoverageFrom: ['src/components/DeckList.tsx'],
  coverageReporters: ['text', 'lcov'],

  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
}
