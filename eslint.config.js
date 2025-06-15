import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import prettier from 'eslint-config-prettier';

export default [
  js.config({
    env: {
      browser: true,
      node: true,
      es6: true,
    },
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-native': reactNative,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      ...prettier.rules,
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
