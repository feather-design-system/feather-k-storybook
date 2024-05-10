import { Meta, StoryObj } from "@storybook/vue3";
import { Switch } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof Switch> = {
  title: "Feather K/Input/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>Switch is a form component that represents a binary choice.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/SwitchProps/" target="_blank">Switch API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/switch/" target="_blank">Switch Documentation</a></li>
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
    size: { control: "select", options: ["small", "medium", "large"] },
    thumbRounded: { control: "select", options: ["full", "circle", "small", "medium", "large"] },
    trackRounded: { control: "select", options: ["full", "circle", "small", "medium", "large"] },
    disabled: { control: "boolean" },

  },
  args: {
    size: "medium",
    thumbRounded: "full",
    trackRounded: "full",
    disabled: false,
  },
};

export const YesNo: Story = {
  argTypes: {
    ...Default.argTypes,
    onLabel: { control: "text" },
    offLabel: { control: "text" },
  },
  args: {
    ...Default.args,
    onLabel: "Yes",
    offLabel: "No",
  },
};
