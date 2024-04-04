import type { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@progress/kendo-vue-buttons";
import { folderIcon, calendarIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof Button> = {
  title: "KendoFeather/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    themeColor: { control: "select", options: ["primary", "secondary"] },
    disabled: { control: "boolean" },
  },
  args: {
    themeColor: "primary",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">Browse</Button>
    `,
  }),
};

export const WithIcon: Story = {
  argTypes: {
    // @ts-ignore slots
    buttonText: { control: "text"},
  },
  args: {
    svgIcon: folderIcon,
    // @ts-ignore slots
    buttonText: "Button",
  },
  render: (args) => ({
    data() {
      return {
        folderIcon,
        calendarIcon,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">{{args.buttonText}}</Button>
    `,
  }),
};
export const IconOnly: Story = {
  argTypes: {},
  args: {
    svgIcon: folderIcon,
  },
  render: (args) => ({
    data() {
      return {
        folderIcon,
        calendarIcon,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args"></Button>
    `,
  }),
};
