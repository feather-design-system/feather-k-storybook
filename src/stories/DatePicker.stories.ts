import { Meta, StoryObj } from "@storybook/vue3";
import { DatePicker } from "@progress/kendo-vue-dateinputs";

const meta: Meta<typeof DatePicker> = {
  title: "Feather K/DatePicker",
  // title: "Feather K/DateInputs/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>DatePicker is a form component that allows users to select a date.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dateinputs/api/DatePickerProps/" target="_blank">DatePicker API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dateinputs/datepicker/" target="_blank">DatePicker Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-datepicker</legend>
              <pre>
                &lt;DatePicker 
                  label="Select a date" 
                  :defaultValue="new Date()" 
                  :defaultShow="false"
                  :style="{ width: '258px' }" 
                  fillMode="outline" 
                  rounded="medium" 
                  size="medium" 
                /&gt;            
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-datepicker:weeknum</legend>
              <pre>
                &lt;DatePicker 
                  label="Select a date" 
                  :defaultValue="new Date()" 
                  :defaultShow="false"
                  :weekNumber="true" 
                  :style="{ width: '285px' }" 
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    defaultShow: { control: "boolean" },
    defaultValue: { control: "object" },
    fillMode: { control: "select", options: ["solid", "outline"] },
    label: { control: "text" },
    format: { control: "select", options: ["yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy"] },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    weekNumber: { control: "boolean" },
    title: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    defaultShow: false,
    defaultValue: new Date(),
    fillMode: "solid",
    rounded: "medium",
    size: "medium",
    label: "Appointment Date",
    format: "MM/dd/yyyy",
    weekNumber: false,
    title: "Select a date",
    disabled: false,
  },
  render: (args) => ({
    components: { DatePicker },
    setup() {
      return { args };
    },
    template: `
    <DatePicker 
      :disabled="args.disabled" 
      :defaultValue="args.defaultValue"
      :defaultShow="args.defaultShow"
      :format="args.format"
      :fillMode="args.fillMode"
      :rounded="args.rounded"
      :size="args.size"
      :weekNumber="args.weekNumber"
      :label="args.label"
      />
    `,
  }),
};