import { Meta, StoryObj } from "@storybook/vue3";
import { NumericTextBox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof NumericTextBox> = {
  title: "Feather K/NumericTextBox",
  // title: "Feather K/Input/NumericTextBox",
  component: NumericTextBox,
  parameters: {
    docs: {
      description: {
        component: `<p>NumericTextBox is a component that allows the user to input a numeric value.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/NumericTextBoxProps/" target="_blank">NumericTextBox API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/numerictextbox/" target="_blank">NumericTextBox Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-numerictextbox</legend>
              <pre>
                &lt;NumericTextBox 
                  label="Years of service" 
                  placeholder="Enter a number" 
                  fillMode="outline" 
                  rounded="medium" 
                  format="n0" 
                /&gt;              
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    disabled: { control: "boolean" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    format: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    value: { control: "number" },
  },
  args: {
    disabled: false,
    fillMode: "outline",
    label: "Age",
    format: "n",
    min: 0,
    max: 100,
    step: 1,
    value: 30,
  },
  render: (args) => ({
    components: { NumericTextBox },
    setup() {
      return { args };
    },
    template: `
    <NumericTextBox v-bind="args" />
    `,
  }),
};
