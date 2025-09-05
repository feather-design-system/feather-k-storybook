import { Meta, StoryObj } from "@storybook/vue3-vite";
import { MaskedTextBox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof MaskedTextBox> = {
  title: "Feather K/MaskedTextBox",
  // title: "Feather K/Input/MaskedTextBox",
  component: MaskedTextBox,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component: `<p>MaskedTextBox is a component that allows the user to enter data in a secure format.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/MaskedTextBoxProps/" target="_blank">MaskedTextBox API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/maskedtextbox/" target="_blank">MaskedTextBox Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-maskedtextbox:phone</legend>
              <pre>
                &lt;MaskedTextBox 
                  label="Enter phone number"
                  mask="(999) 000-0000" 
                  placeholder="(___) ___-____" 
                  fillMode="outline" 
                  rounded="medium" 
                /&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-maskedtextbox:ssn</legend>
              <pre>
                &lt;MaskedTextBox 
                  label="Enter SSN"
                  mask="000-00-0000" 
                  placeholder="___-__-____" 
                  fillMode="outline" 
                  rounded="medium" 
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
    mask: { control: "text" },
    disabled: { control: "boolean" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
  },
  args: {
    mask: "(000) 000-0000",
    disabled: false,
    fillMode: "outline",
    label: "Phone #",
    placeholder: "",
    rounded: "large",
  },
};

export const SSN: Story = {
  ...Default,
  args: {
    mask: "000-00-0000",
    disabled: false,
    fillMode: "outline",
    label: "Social Security #",
    placeholder: "",
  },
};
