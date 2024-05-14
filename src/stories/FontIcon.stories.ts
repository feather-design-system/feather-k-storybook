import { Meta, StoryObj } from "@storybook/vue3";
import { FontIcon } from "@progress/kendo-vue-common";

const meta: Meta<typeof FontIcon> = {
  title: "Feather K/FontIcon",
  // title: "Feather K/Icons/FontIcon",
  component: FontIcon,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>FontIcon is a component that displays a Font Awesome icon.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/icons/api/FontIconProps/" target="_blank">FontIcon API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/icons/icon/" target="_blank">FontIcon Documentation</a></li>
          </ul>
        `,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    name: { control: "select", options: ["globe", "folder", "calendar"] },
    size: { control: "select", options: ["small", "medium", "large"] },
  },
  args: {
    name: "globe",
  },
};

export const ViaRender: Story = {
  argTypes: {
    name: { control: "select", options: ["globe", "folder", "calendar"] },
    size: { control: "select", options: ["small", "medium", "large"] },
  },
  args: {
    name: "globe",
    size: "medium",
  },
  render: (args) => ({
    data() {
      return {
        name: args.name,
        size: args.size,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <p>Not working see SvgIcon instead</p>
    <p>Icon: {{args.size}} {{args.name}}</p>
    <p> 
      <FontIcon v-bind="args" />
      <FontIcon :name="name" :size="size" />
    </p>
    `,
  }),
};
