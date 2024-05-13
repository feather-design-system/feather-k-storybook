import { Meta, StoryObj } from "@storybook/vue3";
import { Chip } from "@progress/kendo-vue-buttons";

const meta: Meta<typeof Chip> = {
  title: "Feather K/Chip",
  // title: "Feather K/Buttons/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `<p>Chip is a component that allows users to enter information, make selections, filter content, or trigger actions.</p>` +
        `<h3>Links</h3>` + 
         `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ChipProps/" target="_blank">Chip API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/chip/" target="_blank">Chip Documentation</a></li>
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
