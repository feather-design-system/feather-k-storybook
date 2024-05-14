import type { Meta, StoryObj } from "@storybook/vue3";
import { Checkbox } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof Checkbox> = {
  title: "Feather K/Checkbox",
  // title: "Feather K/Input/Checkbox",
  component: Checkbox,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component: `<p>Checkbox is a component that allows the user to select a boolean value.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/CheckboxProps/" target="_blank">Checkbox API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/checkbox/" target="_blank">Checkbox Documentation</a></li>
          </ul>` + 
          `<h3>Notes on Checkbox</h3>` +
          `<ul>
            <li>There is a bug with labelPlacement="before".  Punctuation pushed to beginning of label.  Very odd.</li>
            <li>This has been reproduced outside of Storybook.  It is a 🪳 in the Kendo UI Vue Checkbox component.</li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-checkbox</legend>
              <pre>
                &lt;Checkbox label="Subscribe?" labelPlacement="after" /&gt;
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
    labelPlacement: { control: "select", options: ["before", "after"] },
    disabled: { control: "boolean" },
    // value: { control: "select", options: [true, false, null] },
  },
  args: {
    label: "Self-Employed?",
    labelPlacement: "after",
    disabled: false,
  },
  render: (args) => ({
    methods: {
      handleChange(e:any) {
        console.log(e);
      },
    },
    setup() {
      return { args };
    },
    template: `
      <Checkbox 
        :labelPlacement="args.labelPlacement"
        :label="args.label"
        :disabled="args.disabled" 
       />
    `,
  }),
};
export const DefaultChecked: Story = {
  argTypes: {
    label: { control: "text" },
    defaultChecked: {
      control: "boolean",
      description: "Only affects control on load.",
    },
  },
  args: {
    label: "Subscribe to Newsletter?",
    defaultChecked: true,
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
      <Checkbox 
        :value="args.value"
        :label="args.label"
        :defaultChecked="args.defaultChecked">
      </Checkbox>
      <hr/>
      <p>
        <strong>NOTE</strong>:  "defaultChecked" should only used in "uncontrolled" 
        mode.  
      </p>
      <p>
        Please read the 
        <a 
          href="https://www.telerik.com/kendo-vue-ui/components/inputs/checkbox/controlled/"
          target="_blank"
          >Kendo UI Checkbox Controlled mode</a>
        to understand the difference between "controlled" mode and 
        "uncontrolled" mode.  Essentially "controlled" mode is defined by 
        binding a variable to the value property of the checkbox
      </p>
      <p>
        Also see 
          <a 
          href="https://www.telerik.com/kendo-vue-ui/components/inputs/checkbox/default-state/"
          target="_blank">
          Kendo UI Checkbox Default State
          </a>
      </p>
      <p>
        In Summary, The value prop (controlled) and the defaultChecked prop 
        (uncontrolled) should not be used together.
      </p>
    `,
  }),
};

export const CheckboxGroup: Story = {
  args: {},
  render: (args) => ({
    components: {
      Checkbox,
    },
    data() {
      return {
        options: [
          { id: 1, label: "Option 1", text: "Option 1" },
          { id: 2, label: "Option 2", text: "Option 2" },
          { id: 3, label: "Option 3", text: "Option 3" },
        ],
      };
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <a href="https://feather.nanthealth.com/Components/Checkbox/#checkboxgroup">
        No Kendo UI equivalent to Feather DS CheckboxGroup.
      </a>
      <p>Below is just a rendering of multiple checkboxes.</p>
      <p>Forced inline style for spacing (i.e. style="margin-right: 1rem;") 😔</p>
      <Checkbox 
        style="margin-right: 1rem;"
        v-for="option in options" 
        :key="option.id" 
        :label="option.label" 
        v-model="option.value"
        />
    </div>
    `,
  }),
};
