import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.node, // Set Node.js environment
      parser: tseslint.parser, // Use TypeScript parser
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // ✅ BEST PRACTICES
      'no-var': 'error', // Prefer let/const over var
      'prefer-const': 'error', // Use const when variables are not reassigned
      eqeqeq: ['error', 'always'], // Enforce === instead of ==
      'object-shorthand': ['error', 'always'], // Use shorthand for object methods
      'no-unsafe-finally': 'error', // Prevent unsafe return in finally blocks
      'no-return-await': 'error', // Prevent redundant return-await
      'no-duplicate-imports': 'error', // Prevent duplicate imports
      'sort-imports': ['error', { ignoreDeclarationSort: true }], // Organize imports alphabetically

      // ✅ TYPE SAFETY RULES
      '@typescript-eslint/no-explicit-any': 'warn', // Avoid `any` (warn instead of error)
      '@typescript-eslint/explicit-function-return-type': 'error', // Require function return types
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused args with _
      '@typescript-eslint/no-non-null-assertion': 'error', // No `!` non-null assertions
      '@typescript-eslint/no-inferrable-types': 'error', // Avoid unnecessary type annotations
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Use `interface` over `type`
      '@typescript-eslint/strict-boolean-expressions': 'warn', // Prevent loose boolean checks

      // ✅ EXPRESS-SPECIFIC RULES
      'no-process-exit': 'error', // Prevent process.exit() calls
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }], // Prevent missing await in async calls
    },
  },
  ...tseslint.configs.recommended,
];
