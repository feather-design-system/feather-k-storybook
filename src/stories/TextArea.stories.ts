import { Meta, StoryObj } from "@storybook/vue3";
import { TextArea } from "@progress/kendo-vue-inputs";
import { Hint, Label } from "@progress/kendo-vue-labels";

const meta: Meta<typeof TextArea> = {
  title: "Feather K/Input/TextArea",
  component: TextArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    title: { control: "text" },
    placeholder: { control: "text" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
    rows: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    title: "Self Evaluation",
    fillMode: "outline",
    rounded: "medium",
    placeholder: "",
    rows: 3,
    disabled: false,
  },
  render: (args) => ({
    components: { TextArea, Hint, Label },
    data() {
      return {
        max: 500,
        value: "",
      };
    },
    methods: {
      handleChange(e: any) {
        this.value = e.value;
      }
    },
    setup() {
      return { args };
    },
    template: `
      <Label> Self Evaluation </Label>
      <TextArea v-bind="args" @input="handleChange" />
      <Hint >Tell us about yourself. &nbsp;&nbsp; {{value.length}} / {{ max }}</Hint>
    `,
  }),
};