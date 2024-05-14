import { Meta, StoryObj } from "@storybook/vue3";
import { MultiSelect } from "@progress/kendo-vue-dropdowns";
import { Label, Hint } from "@progress/kendo-vue-labels";

const items = [
  {
    text: "Basketball",
    value: "basketball",
  },
  {
    text: "Football",
    value: "football",
  },
  {
    text: "Golf",
    value: "golf",
  },
  {
    text: "Tennis",
    value: "tennis",
  },
  {
    text: "Volleyball",
    value: "volleyball",
  },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Feather K/MultiSelect",
  // title: "Feather K/DropDowns/MultiSelect",
  component: MultiSelect,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>MultiSelect is a form component that allows multiple selections form a provided list of options.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/api/MultiSelectProps/" target="_blank">MultiSelect API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/multiselect/" target="_blank">MultiSelect Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-multiselect</legend>
              <pre>
                &lt;MultiSelect 
                  label="Pizza Toppings (component label)" 
                  textField="text" 
                  valueField="value" 
                  placeholder="" 
                  fillMode="outline" 
                  rounded="medium" 
                  :dataItems="
                    Array('Garlic', 'Cheese', 'Pepperoni', 'Onions', 'Peppers').map(
                      (item, index) => ({ text: item, value: index })
                    )"
                  :style="{ width: '40em' }" 
                /&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-multiselect:ext</legend>
              <pre>
                &lt;Label>Label&lt;/Label&gt;
                &lt;MultiSelect
                  textField="text"
                  valueField="value"
                  placeholder=""
                  fillMode="outline"
                  rounded="medium"
                  :dataItems="
                    Array('Apples', 'Bananas', 'Oranges', 'Pears', 'Pineapples').map(
                      (item, index) => ({ text: item, value: index })
                    )"
                /&gt;
                &lt;Hint&gt;Hint&lt;/Hint&gt;
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
    dataItems: { control: "object" },
    valueField: { control: "object" },
    textField: { control: "text" },
    disabled: { control: "boolean" },
    filterable: { control: "boolean" },
    placeholder: { control: "text" },
    fillMode: { control: "select", options: ["solid", "outline"] },
    rounded: {
      control: "select",
      options: ["full", "small", "medium", "large"],
    },
  },
  args: {
    dataItems: items,
    valueField: "value",
    textField: "text",
    disabled: false,
    filterable: true,
    placeholder: "",
    fillMode: "outline",
    rounded: "medium",
  },
  parameters: {
    style: {
      width: "40em",
    },
    hint: {
      content: "Choose your favorite sports",
      default: true,
    }
  },
  render: (args) => ({
    components: { MultiSelect, Label, Hint },
    setup() {
      return { args };
    },
    template: `
    <Label> Favorite Sports </Label>
    <MultiSelect v-bind="args" :style="args.style"/>
    <Hint>Choose your favorite sports</Hint>
    `,
  }),
};
