import type { ArgTypes, Args, Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@progress/kendo-vue-buttons";
import { folderIcon, calendarIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof Button> = {
  title: "Feather K/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>Button is a component that triggers an action when clicked.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ButtonProps/" target="_blank">Button API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/button/" target="_blank">Button Documentation</a></li>
          </ul>
        `,
      },
    },
  
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ArgTypes and Args are defined as partials to allow for merging
const ArgTypesButtonText: Partial<ArgTypes> = {
  _buttonText: { control: "text" },
};
const ArgsButtonText: Partial<Args> = { _buttonText: "Button" };

const ArgTypesDefault: Partial<ArgTypes> = {
  fillMode: {
    control: "select",
    options: ["solid (primary)", "outline (secondary)", "flat (text)"],
    mapping: { "solid (primary)": "solid", "outline (secondary)": "outline", "flat (text)": "flat" },
  },
  rounded: {
    control: "select",
    options: ["full", "small", "medium", "large"],
  },
  disabled: { control: "boolean" },
};
const ArgsDefault: Partial<Args> = {
  fillMode: "solid (primary)",
  rounded: "medium",
  disabled: false,
};
const ArgTypesIconOnly: Partial<ArgTypes> = {
  svgIcon: {
    control: "select",
    options: ["folder", "calendar"],
    mapping: { folder: folderIcon, calendar: calendarIcon },
  },
};
const ArgsIconOnly: Partial<Args> = { svgIcon: "folder" };

// The Default, IconOnly, and IconAndLabel stories are defined as separate Story objects
export const Default: Story = {
  argTypes: {
    ...ArgTypesButtonText,
    ...ArgTypesDefault,
  },
  args: {
    ...ArgsButtonText,
    ...ArgsDefault,
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <Button 
      themeColor="primary"
      :disabled="args.disabled" 
      :fillMode="args.fillMode"
      :rounded="args.rounded"
    >
      {{args._buttonText}}
    </Button>
    `,
  }),
};

export const IconOnly: Story = {
  argTypes: {
    ...ArgTypesDefault,
    ...ArgTypesIconOnly,
  },
  args: {
    ...ArgsDefault,
    ...ArgsIconOnly,
  },
  render: (args) => ({
    data() {
      return {
        folderIcon,
        calendarIcon,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <Button 
      themeColor="primary" 
      :svgIcon="args.svgIcon" 
      :fillMode="args.fillMode"
      :rounded="args.rounded"
      :disabled="args.disabled"
    />
    `,
  }),
};

export const IconAndLabel: Story = {
  argTypes: {
    ...ArgTypesButtonText,
    ...ArgTypesDefault,
    ...ArgTypesIconOnly,
  },
  args: {
    ...ArgsButtonText,
    ...ArgsDefault,
    ...ArgsIconOnly,
  },
  render: (args) => ({
    data() {
      return {
        folderIcon,
        calendarIcon,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <Button 
      themeColor="primary" 
      :svgIcon="args.svgIcon" 
      :fillMode="args.fillMode"
      :rounded="args.rounded"
      :disabled="args.disabled"
      >
        {{args._buttonText}}
      </Button>
    `,
  }),
};