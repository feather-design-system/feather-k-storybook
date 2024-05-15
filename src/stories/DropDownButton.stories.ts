import { Meta, StoryObj } from "@storybook/vue3";
import { DropDownButton } from "@progress/kendo-vue-buttons";

import { gearIcon, globeLinkIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof DropDownButton> = {
  title: "Feather K/DropDownButton",
  // title: "Feather K/Buttons/DropDownButton",
  component: DropDownButton,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>DropDownButton is a button that opens a list of actions when clicked.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/DropDownButtonProps/" target="_blank">DropDownButton API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/dropdownbutton/" target="_blank">DropDownButton Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-dropdownbutton</legend>
              <pre>
                &lt;DropDownButton 
                  text="Menu"
                  themeColor="primary"
                  fillMode="outline"
                  rounded="medium"
                  :items="['My Profile', 'Settings', 'Sign Out']" 
                /&gt;
            </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  // #endregion autodocs
};

const items = ["Home", "My Account", "Settings", "Sign Out"];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    text: { control: "select", options: [undefined, "Actions", "Menu", "Settings"] },
    themeColor: {
      control: "select",
      options: [undefined, "primary", "secondary"],
    },
    disabled: { control: "boolean" },
    items: { control: "object" },
    svgIcon: {
      control: "select",
      options: [undefined, "gear", "globeLink"],
      mapping: { gear: gearIcon, globeLink: globeLinkIcon },
    },
  },
  args: {
    text: "Actions",
    svgIcon: gearIcon,
    themeColor: undefined,
    disabled: false,
    items: items,
  },
  render: (args) => ({
    components: { DropDownButton },
    data() {
      return {
        items,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <DropDownButton v-bind="args"></DropDownButton>
    `,
  }),
};
