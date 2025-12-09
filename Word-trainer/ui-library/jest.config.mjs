/** @type {import('jest').Config} */
const config = {
  // Готовый пресет для TypeScript + ESM
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Говорим Jest, что .ts файлы — ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Считаем покрытие по всем TS-файлам библиотеки
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  // Настройки для ts-jest
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
}

export default config
