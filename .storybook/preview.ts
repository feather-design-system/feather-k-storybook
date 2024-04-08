import { Preview, setup } from "@storybook/vue3";

import { Button } from "@progress/kendo-vue-buttons";
import { Checkbox } from "@progress/kendo-vue-inputs";

import '@progress/kendo-theme-material/dist/all.css';

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
  app.component("Checkbox", Checkbox);
});
