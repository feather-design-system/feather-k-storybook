module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'storybook-static/', 'build/', 'public/'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ],
  plugins: ['vue', '@typescript-eslint', 'storybook'],
  rules: {
    // project-specific rules; keep minimal to start
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'vue/html-indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['*.stories.ts', '*.stories.tsx', 'stories/**/*.ts', 'stories/**/*.tsx'],
      rules: {
        // Allow story exports that may not be used elsewhere
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
};
