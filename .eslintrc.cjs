module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Disable "any" type warnings completely as requested by user
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Keep other important rules but allow reasonable warnings
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-useless-escape': 'error', // This can be auto-fixed
    'no-console': 'off', // Allow console logs for debugging
  },
  overrides: [
    {
      // For all TypeScript files, disable any-related rules
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.config.js',
    '*.config.ts',
  ],
};
