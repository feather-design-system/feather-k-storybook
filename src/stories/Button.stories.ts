import type { ArgTypes, Args, Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@progress/kendo-vue-buttons";
import { folderIcon, calendarIcon } from "@progress/kendo-svg-icons";
import "../style.css";

const meta: Meta<typeof Button> = {
  title: "Feather K/Button",
  // title: "Feather K/Buttons/Button",
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
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-button:primary</legend>
            <pre>
            &lt;Button 
              @click="console.log('clicked')"
              type="button" 
              fillMode="solid" 
              themeColor="primary" 
              rounded="medium"
              &gt;Primary
            &lt;/Button&gt;
            </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-button:secondary</legend>
            <pre>
            &lt;Button 
              @click="console.log('clicked')"
              type="button" 
              fillMode="outline" 
              themeColor="primary" 
              rounded="medium"
              &gt;Secondary
            &lt;/Button&gt;
            </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-button:text</legend>
            <pre>
            &lt;Button 
              @click="console.log('clicked')"
              type="button" 
              fillMode="flat" 
              themeColor="primary" 
              rounded="medium"
              &gt;Text
            &lt;/Button&gt;
            </pre>
            </fieldset>
          </div>`,
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
    mapping: {
      "solid (primary)": "solid",
      "outline (secondary)": "outline",
      "flat (text)": "flat",
    },
  },
  disabled: { control: "boolean" },
};
const ArgsDefault: Partial<Args> = {
  fillMode: "solid (primary)",
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
      :rounded="'medium'"
    >
      {{args._buttonText}}
    </Button>
    `,
  }),
};

export const Primary: Story = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <Button 
      themeColor="primary"
      fillMode="solid"
      rounded="medium"
    >
      Submit
    </Button>
    `,
  }),
};

export const Secondary: Story = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <Button 
      themeColor="primary"
      fillMode="outline"
      rounded="medium"
    >
      Cancel
    </Button>
    `,
  }),
};

export const Text: Story = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
    <Button 
      themeColor="primary"
      fillMode="flat"
      rounded="medium"
    >
      Details
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
      :rounded="'medium'"
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
      :rounded="'medium'"
      :disabled="args.disabled"
      >
        {{args._buttonText}}
      </Button>
    `,
  }),
};
