import { Meta, StoryObj } from "@storybook/vue3";
import { RadioGroup } from "@progress/kendo-vue-inputs";

const items = [
  {
    label: "Option 1",
    value: "1",
  },
  {
    label: "Option 2",
    value: "2",
  },
  {
    label: "Option 3",
    value: "3",
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Feather K/Input/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    disabled: { control: "boolean" },
    layout: { control: "select", options: ["horizontal", "vertical"] },
    dataItems: { control: "array" },
    labelPlacement: { control: "select", options: ["before", "after"] },
  },
  args: {
    disabled: false,
    layout: "horizontal",
    dataItems: items,
    labelPlacement: "after",
  },
  render: (args) => ({
    components: { RadioGroup },
    data() {
      return {
        items,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <RadioGroup v-bind="args">
    </RadioGroup>
    `,
  }),
};