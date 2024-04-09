import { Meta, StoryObj } from "@storybook/vue3";
import { NumericTextBox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof NumericTextBox> = {
  title: "Feather K/Input/NumericTextBox",
  component: NumericTextBox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    disabled: { control: "boolean" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    format: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    value: { control: "number" },
  },
  args: {
    disabled: false,
    fillMode: "outline",
    label: "Age",
    format: "n",
    min: 0,
    max: 100,
    step: 1,
    value: 30,
  },
  render: (args) => ({
    components: { NumericTextBox },
    setup() {
      return { args };
    },
    template: `
    <NumericTextBox v-bind="args" />
    `,
  }),
};
