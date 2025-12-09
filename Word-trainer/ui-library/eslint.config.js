import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    // ❗ НЕ игнорируем src, только служебные папки
    ignores: ['dist', 'coverage', 'node_modules']
  },

  // Базовые правила JS
  js.configs.recommended,

  // Рекомендованные правила для TypeScript
  ...tseslint.configs.recommended,

  {
    // Применяем правила только к исходникам библиотеки
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },

    rules: {
      semi: ['error', 'never'],
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
)
