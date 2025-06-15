import eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default {
  files: ['src/**/*.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
    globals: {
      ...eslint.configs.recommended.languageOptions?.globals,
      console: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    prettier: prettier,
  },
  rules: {
    ...eslint.configs.recommended.rules,
    ...tseslint.configs.recommended[0].rules,
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  ignores: ['dist/**', 'node_modules/**', '*.config.js'],
};
