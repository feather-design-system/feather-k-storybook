import { Meta, StoryObj } from "@storybook/vue3";
import { TextBox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof TextBox> = {
  title: "Feather K/Input/TextBox",
  component: TextBox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Name",
    fillMode: "outline",
    rounded: "medium",
    placeholder: "Enter Name",
    disabled: false,
  },
  render: (args) => ({
    components: { TextBox },
    setup() {
      return { args };
    },
    template: `
      <TextBox v-bind="args" />
    `,
  }),
};
