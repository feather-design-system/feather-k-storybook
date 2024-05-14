import { Meta, StoryObj } from "@storybook/vue3";
import { TextArea } from "@progress/kendo-vue-inputs";
import { Hint, Label } from "@progress/kendo-vue-labels";

const meta: Meta<typeof TextArea> = {
  title: "Feather K/TextArea",
  // title: "Feather K/Input/TextArea",
  component: TextArea,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component: `<p>TextArea is a component that allows the user to enter multiple lines of text.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/TextAreaProps/" target="_blank">TextArea API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/textarea/" target="_blank">TextArea Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-textarea</legend>
              <pre>
                &lt;Label&gt;Comments:&lt;/Label&gt;
                &lt;TextArea 
                  :rows="5"
                  placeholder="Enter your comments" 
                  fillMode="outline" 
                  rounded="medium" 
                  size="medium" 
                /&gt;
                &lt;Hint&gt;Hint goes here. (optional)&lt;/Hint&gt;
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
    title: { control: "text" },
    placeholder: { control: "text" },
    fillMode: { control: "select", options: ["solid", "underline", "outline"] },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
    rows: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    title: "Self Evaluation",
    fillMode: "outline",
    rounded: "medium",
    placeholder: "",
    rows: 3,
    disabled: false,
  },
  render: (args) => ({
    components: { TextArea, Hint, Label },
    data() {
      return {
        max: 500,
        value: "",
      };
    },
    methods: {
      handleChange(e: any) {
        this.value = e.value;
      }
    },
    setup() {
      return { args };
    },
    template: `
      <Label> Self Evaluation </Label>
      <TextArea v-bind="args" @input="handleChange" />
      <Hint >Tell us about yourself. &nbsp;&nbsp; {{value.length}} / {{ max }}</Hint>
    `,
  }),
};