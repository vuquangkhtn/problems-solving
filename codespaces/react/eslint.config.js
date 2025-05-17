import eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';

export default {
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      project: true,
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      ...eslint.configs.recommended.languageOptions?.globals,
      document: 'readonly',
      window: 'readonly'
    }
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    'react': reactPlugin,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'prettier': prettier
  },
  rules: {
    ...eslint.configs.recommended.rules,
    ...tseslint.configs.recommended[0].rules,
    ...reactPlugin.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignores: ['dist/**', 'node_modules/**', '*.config.js']
};
