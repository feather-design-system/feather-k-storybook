import { Meta, StoryObj } from "@storybook/vue3";
import { TextBox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof TextBox> = {
  title: "Feather K/TextBox",
  // title: "Feather K/Input/TextBox",
  component: TextBox,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>TextBox is a component that allows the user to enter text.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/TextBoxProps/" target="_blank">TextBox API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/textbox/" target="_blank">TextBox Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-textbox</legend>
              <pre>
                &lt;TextBox 
                  label="First Name"
                  placeholder="Enter your first name" 
                  fillMode="outline" 
                  rounded="medium" 
                  size="medium" 
                /&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Name",
    fillMode: "outline",
    rounded: "medium",
    placeholder: "Enter Name",
    disabled: false,
  },
  render: (args) => ({
    components: { TextBox },
    setup() {
      return { args };
    },
    template: `
      <TextBox v-bind="args" />
    `,
  }),
};
