import { Meta, StoryObj } from "@storybook/vue3";
import { DropDownButton } from "@progress/kendo-vue-buttons";

import { gearIcon, globeLinkIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof DropDownButton> = {
  title: "Feather K/Buttons/DropDownButton",
  component: DropDownButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>DropDownButton is a button that opens a list of actions when clicked.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/DropDownButtonProps/" target="_blank">DropDownButton API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/dropdownbutton/" target="_blank">DropDownButton Documentation</a></li>
          </ul>
        `,
      },
    },
  },
};

const items = ["Home", "My Account", "Settings", "Sign Out"];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    text: { control: "select", options: [undefined, "Actions", "Menu", "Settings"] },
    themeColor: {
      control: "select",
      options: [undefined, "primary", "secondary"],
    },
    disabled: { control: "boolean" },
    items: { control: "object" },
    svgIcon: {
      control: "select",
      options: [undefined, "gear", "globeLink"],
      mapping: { gear: gearIcon, globeLink: globeLinkIcon },
    },
  },
  args: {
    text: "Actions",
    svgIcon: gearIcon,
    themeColor: undefined,
    disabled: false,
    items: items,
  },
  render: (args) => ({
    data() {
      return {
        items,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <DropDownButton v-bind="args"></DropDownButton>
    `,
  }),
};
