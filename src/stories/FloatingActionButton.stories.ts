import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { FloatingActionButton } from "@progress/kendo-vue-buttons";

import { menuIcon, plusIcon, shareIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof FloatingActionButton> = {
  title: "Feather K/FloatingActionButton",
  // title: "Feather K/Buttons/FloatingActionButton",
  component: FloatingActionButton,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>FloatingActionButton is a circular button that performs an action when clicked.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/FloatingActionButtonProps/" target="_blank">FloatingActionButton API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/floatingactionbutton/" target="_blank">FloatingActionButton Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-floatingactionbutton</legend>
              <pre>
                &lt;FloatingActionButton
                  :align="{horizontal: 'end', vertical: 'bottom'}"
                  :alignOffset="{ x:60, y:60}"
                  :svgIcon="menuIcon"
                  fillMode="solid"
                  themeColor="primary"
                  @click="console.log('clicked')"
                  :items="[{ text: 'Profile' }, { text: 'Settings' }, { text: 'Sign Out' }]"
                /&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  // #endregion autodocs
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  argTypes: {
    svgIcon: {
      control: "select",
      options: ["menu", "plus", "share"],
      mapping: { menu: menuIcon, plus: plusIcon, share: shareIcon },
    },
    fillMode: {
      control: "select",
      options: ["solid"],
    },
    disabled: { control: "boolean" },
    align: {
      control: "select",
      description: "The alignment of the FloatingActionButton.",
      options: [
        "start-top",
        "start-middle",
        "start-bottom",
        "center-top",
        "center-middle",
        "center-bottom",
        "end-top",
        "end-middle",
        "end-bottom",
      ],
      mapping: {
        "start-top": { horizontal: "start", vertical: "top" },
        "start-middle": { horizontal: "start", vertical: "middle" },
        "start-bottom": { horizontal: "start", vertical: "bottom" },
        "center-top": { horizontal: "center", vertical: "top" },
        "center-middle": { horizontal: "center", vertical: "middle" },
        "center-bottom": { horizontal: "center", vertical: "bottom" },
        "end-top": { horizontal: "end", vertical: "top" },
        "end-middle": { horizontal: "end", vertical: "middle" },
        "end-bottom": { horizontal: "end", vertical: "bottom" },
      },
    },
  },
  args: {
    svgIcon: menuIcon,
    fillMode: "solid",
    align: { horizontal: "end", vertical: "bottom" },
    disabled: false,
  },
  render: (args) => ({
    components: { FloatingActionButton },
    data() {
      return {
        menuIcon,
        plusIcon,
        shareIcon,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <p>Changing alignment may require remounting component.  </p>
      <p>See 🔄 in Storybook chrome above.</p>
      <FloatingActionButton
        :svgIcon="args.svgIcon"
        :fillMode="args.fillMode"
        :align="args.align"
        :disabled="args.disabled"
        :items="[{ text: 'My Profile' },{ text: 'Settings' },{ text: 'Help' }].map((item, index) => ({ text: item.text }))"
      />
    </div>
    `,
  }),
};
