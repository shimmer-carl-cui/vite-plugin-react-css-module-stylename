import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
const ignoreConfig = {
  ignores: [
    '**/.vscode',
    '**/document',
    '**/mock',
    '**/node_modules',
    '**/public',
    '**/build',
    '**/*.json',
    '**/*.xml',
    '**/*.pem',
    '**/*.cert',
    '**/*.key',
    '**/yarn.lock'
  ]
};
export default tseslint.config(ignoreConfig, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 1
  }
});
