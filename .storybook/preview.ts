import { Preview, setup } from "@storybook/vue3-vite";

import "../src/style.css";

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
