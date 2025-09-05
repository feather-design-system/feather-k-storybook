import { Meta, StoryObj } from "@storybook/vue3-vite";
import { DropDownList } from "@progress/kendo-vue-dropdowns";

const items = [
    "Basketball",
    "Football",
    "Tennis",
    "Volleyball",
];

const meta: Meta<typeof DropDownList> = {
  title: "Feather K/DropDownList",
  // title: "Feather K/DropDowns/DropDownList",
  component: DropDownList,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>DropDownList is a form component that provides a list of options.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/api/DropDownListProps/" target="_blank">DropDownList API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/dropdownlist/" target="_blank">DropDownList Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-dropdownlist</legend>
              <pre>
                &lt;DropDownList 
                  :dataItems="['Baseball', 'Basketball', 'Football', 'Golf', 'Tennis']" 
                  label="Favorite sport" 
                  fillMode="outline" 
                  rounded="medium" 
                  size="medium" 
                  :style="{ width: '30em' }" 
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
    dataItems: { control: "object" },
    fillMode: { control: "select", options: ["solid", "outline"] },
    rounded: { control: "select", options: ["full", "small", "medium", "large"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    style: { control: "object" },
  },
  args: {
    label: "Favorite Sport",
    dataItems: items,
    fillMode: "outline",
    rounded: "medium",
    size: "medium",
    style: { width: "30em" },
  },
};