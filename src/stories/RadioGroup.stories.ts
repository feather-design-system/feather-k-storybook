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
  parameters: {
    docs: {
      description: {
        component:
          `<p>RadioGroup is a component that allows the user to select a single value from a predefined set of options.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/RadioGroupProps/" target="_blank">RadioGroup API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/radiogroup/" target="_blank">RadioGroup Documentation</a></li>
          </ul>
        `,
      },
    },
  
  },
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