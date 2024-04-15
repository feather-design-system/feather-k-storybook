import { Meta, StoryObj } from "@storybook/vue3";
import { MaskedTextBox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof MaskedTextBox> = {
  title: "Feather K/Input/MaskedTextBox",
  component: MaskedTextBox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    mask: { control: "text" },
    disabled: { control: "boolean" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
  },
  args: {
    mask: "(000) 000-0000",
    disabled: false,
    fillMode: "outline",
    label: "Phone #",
    placeholder: "(mobile preferred)",
    rounded: "large",
  },
};

export const SSN: Story = {
  ...Default,
  args: {
    mask: "000-00-0000",
    disabled: false,
    fillMode: "outline",
    label: "Social Security #",
    placeholder: "Enter SSN",
  },
};
