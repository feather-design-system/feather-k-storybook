import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  // Include Vue SFC stories
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: 'vue-component-meta',
    },
  },

  docs: {}
};
export default config;
