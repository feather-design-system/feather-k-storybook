import { Preview, setup } from "@storybook/vue3";

import { Button } from "@progress/kendo-vue-buttons";

import '@progress/kendo-theme-default/dist/all.css';

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

setup(async (app) => {
  app.component("Button", Button);
});
