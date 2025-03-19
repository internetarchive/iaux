import typescriptEslint from '@typescript-eslint/eslint-plugin';
import html from 'eslint-plugin-html';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      html,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src', 'demo'],
        },
      },
    },

    rules: {
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['**/*.js', '**/*.mjs'],
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
