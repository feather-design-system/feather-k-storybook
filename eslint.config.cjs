// ESLint flat config for Vue 3 + TypeScript + Storybook
const path = require("path");

// Patterns taken from .eslintignore
const ignorePatterns = [
  "node_modules/**",
  "dist/**",
  "storybook-static/**",
  "build/**",
  "public/**",
  "*.min.js",
  "coverage/**",
  "*.log",
];

module.exports = [
  {
    ignores: ignorePatterns,
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        parser: require("@typescript-eslint/parser"),
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
      },
    },
    plugins: {
      vue: require("eslint-plugin-vue"),
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      storybook: require("eslint-plugin-storybook"),
      prettier: require("eslint-plugin-prettier"),
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Base rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Run Prettier as an ESLint rule and report formatting issues as errors
      "prettier/prettier": ["error"],
      // Vue style
      "vue/html-indent": ["error", 2],
      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.stories.*", "stories/**/*.*"],
    rules: {
      // Story files frequently export helpers/objects that appear unused
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
