import { Meta, StoryObj } from "@storybook/vue3";
import { RadioButton } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof RadioButton> = {
  title: "Feather K/Input/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: [undefined, "small", "medium", "large"] },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Single Choice",
    size: "medium",
    disabled: false,
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <RadioButton v-bind="args"></RadioButton>
    <strong>Hey Brian P.  Not sure when a standalone RadioButton would be useful.</strong>
    `,
  }),
};