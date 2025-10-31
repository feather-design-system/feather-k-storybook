import { Preview, setup } from "@storybook/vue3-vite";

import "../src/style.css";

import "@featherk/styles/dist/css/featherk-q3-2024-v1.css";

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup(async () => {});
export const tags = ["autodocs", "autodocs", "autodocs"];
