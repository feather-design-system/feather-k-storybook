import { Preview, setup } from "@storybook/vue3";

import "../src/style.css";

import "../src/assets/css/feather-ks.css";
// import "../src/assets/css/feather-ks-v18-migration-test.css"
// import "../src/assets/css/feather-k-override.css";

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
