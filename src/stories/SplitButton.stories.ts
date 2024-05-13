import { Meta, StoryObj } from "@storybook/vue3";
import { SplitButton } from "@progress/kendo-vue-buttons";

const meta: Meta<typeof SplitButton> = {
  title: "Feather K/SplitButton",
  // title: "Feather K/Buttons/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>SplitButton is a button that provides a primary action and a dropdown of additional actions.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/SplitButtonProps/" target="_blank">SplitButton API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/splitbutton/" target="_blank">SplitButton Documentation</a></li>
          </ul>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const buttons = [
  { text: "Schedule for later" },
  { text: "Save draft" },
  { text: "Delete" },
];

export const Default: Story = {
  argTypes: {
    fillMode: {
      control: "select",
      options: ["primary", "secondary", "text"],
      mapping: { primary: "solid", secondary: "outline", text: "flat" },
    },
    rounded: {
      control: "select",
      options: ["full", "small", "medium", "large"],
    },
    items: { control: "object" },
    // @ts-ignore
    _text: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    fillMode: "primary",
    rounded: "medium",
    items: buttons,
    // @ts-ignore
    _text: "Send",
    disabled: false,
  },
  parameters: { _text: "Send" },
  render: (args) => ({
    components: { SplitButton },
    setup() {
      return { args };
    },
    template: `
    <SplitButton
      :fillMode="args.fillMode"
      :rounded="args.rounded"
      :disabled="args.disabled"
      :items="args.items"
    >
      {{args._text}}
    </SplitButton>
    `,
  }),
};
