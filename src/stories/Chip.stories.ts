import { Meta, StoryObj } from "@storybook/vue3";
import { Chip } from "@progress/kendo-vue-buttons";

const meta: Meta<typeof Chip> = {
  title: "Feather K/Buttons/Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    disabled: { control: "boolean" },
    text: { control: "text" },
    rounded: { control: "select", options: [ "full", "small", "medium", "large"]},
    removable: { control: "boolean" },
    value: { control: "select", options: ["base", "info", "success", "warning", "error"] },
  },
  args: {
    disabled: false,
    text: "Chip component",
    rounded: "full",
    removable: true,
    value: "info",
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <Chip 
      :text="args.text"
      :rounded="args.rounded"
      :removable="args.removable"
      :themeColor="args.value" 
      :disabled="args.disabled" 
    />
    `,
  }),    
};
