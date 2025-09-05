import { Meta, StoryObj } from "@storybook/vue3-vite";
import { RadioGroup } from "@progress/kendo-vue-inputs";

const items = [
  {
    size: "large",
    label: "Option 1",
    value: "1",
  },
  {
    size: "small",
    label: "Option 2",
    value: "2",
  },
  {
    size: "small",
    label: "Option 3",
    value: "3",
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Feather K/RadioGroup",
  // title: "Feather K/Input/RadioGroup",
  component: RadioGroup,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>RadioGroup is a component that allows the user to select a single value from a predefined set of options.</p>` +
          `<h3>Links</h3>` +
          `<ul>
          <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/RadioGroupProps/" target="_blank">RadioGroup API</a></li>
          <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/radiogroup/" target="_blank">RadioGroup Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-radiogroup</legend>
              <pre>
                &lt;RadioGroup
                  labelPlacement="after"
                  layout="horizontal"
                  :dataItems="
                    ['Option 1', 'Option 2', 'Option 3'].map((item, index) => ({
                      label: item,
                      value: index,
                    }))"
                /&gt;             
              </pre>
            </fieldset>
          </div>` +
          `<h3>Potential Kendo UI Bug</h3>` +
          `<p>
            There appears to be a bug with passing size to the RadioButtonProps object.  No matter what size is passed, the radio button is always the same size.
            The class rendered is always <code>.k-radio-md</code> regardless of the size passed.  If medium is what we
            want to follow for our design system, then we should be good to go.  If we want to use small or large, 
            we may need to create a ticket for Telerik.  See RadioButton.stories.ts for small, medium and large examples.
          </p>`,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
    labelPlacement: { control: "select", options: ["before", "after"] },

    dataItems: { control: "object" },
    disabled: { control: "boolean" },
  },
  args: {
    layout: "horizontal",
    labelPlacement: "after",
    dataItems: items,
    disabled: false,
  },
  render: (args) => ({
    components: { RadioGroup },
    data() {
      return {
        items,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <RadioGroup 
      :layout="args.layout"
      :labelPlacement="args.labelPlacement"
      :dataItems="args.dataItems"
      :disabled="args.disabled"
      >
    </RadioGroup>
    `,
  }),
};
