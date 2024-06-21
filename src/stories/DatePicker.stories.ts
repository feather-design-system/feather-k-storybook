import { Meta, StoryObj } from "@storybook/vue3";
import { DatePicker } from "@progress/kendo-vue-dateinputs";
import { expect, userEvent, within } from "@storybook/test";
import pause from "./utils/pause";

const meta: Meta<typeof DatePicker> = {
  title: "Feather K/DatePicker",
  component: DatePicker,
  parameters: {
    // #region autodocs
    docs: {
      description: {
        component:
          `<p>DatePicker is a form component that allows users to select a date.</p>` +
          `<h3>Installation</h3><pre><small>npm install @progress/kendo-vue-dateinputs</small></pre>` +
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
    // #endregion autodocs
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
    format: {
      control: "select",
      options: ["yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy"],
    },
    rounded: {
      control: "select",
      options: ["full", "small", "medium", "large"],
    },
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

// #region interactions
export const CalendarDate: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, defaultValue: new Date("2020-03-13:08:00:00Z") },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);

    await pause(500);
    await userEvent.click(canvas.getByLabelText("Toggle calendar"));
    await expect(canvas.getByText("March 2020")).toBeInTheDocument();
    
    await pause(500);
    await userEvent.click(canvas.getByText("20"));
    await expect(canvas.getByDisplayValue("03/20/2020")).toBeInTheDocument();
    
    await pause(500);
    await userEvent.click(canvas.getByLabelText("Toggle calendar"));
    await expect(canvas.getByText("March 2020")).toBeInTheDocument();
    
    await pause(500);
    await userEvent.click(canvas.getByText("27"));
    await expect(canvas.getByDisplayValue("03/27/2020")).toBeInTheDocument();

    await pause(500);
    await userEvent.click(canvas.getByLabelText("Toggle calendar"));
    await expect(canvas.getByDisplayValue("03/27/2020")).toBeInTheDocument();

    // 📷 https://www.chromatic.com/docs/delay/#use-an-assertion-to-delay-snapshot-capture
    await pause(2000);
  },
};

export const CalendarYear: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, defaultValue: new Date("2024-07-04:08:00:00Z") },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);

    await userEvent.click(canvas.getByLabelText("Toggle calendar"));
    await pause(500);
    await userEvent.click(canvas.getByText("July 2024"));
    await expect(canvas.getByText("2024")).toBeInTheDocument();
    await pause(500);
    await userEvent.click(canvas.getByText("2024"));
    await expect(canvas.getByText("2024")).toBeInTheDocument();
    await pause(500);
    await userEvent.click(canvas.getByText("2025"));
    await expect(canvas.getByText("2025")).toBeInTheDocument();
    await pause(500);
    await userEvent.click(canvas.getByText("Oct"));
    await expect(canvas.getByText("31")).toBeInTheDocument();
    await pause(500);
    await userEvent.click(canvas.getByText("31"));
    await pause(500);

    await pause(500);
    await userEvent.click(canvas.getByLabelText("Toggle calendar"));
    await expect(canvas.getByDisplayValue("10/31/2025")).toBeInTheDocument();

    // 📷
    await pause(2000);
  },
};

// #endregion interactions
