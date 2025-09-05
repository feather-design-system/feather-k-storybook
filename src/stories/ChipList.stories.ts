import { Meta, StoryObj } from "@storybook/vue3-vite";
import { ChipList } from "@progress/kendo-vue-buttons";
import { mapMarkerTargetIcon } from "@progress/kendo-svg-icons";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof ChipList> = {
  title: "Feather K/ChipList",
  // title: "Feather K/Buttons/ChipList",
  component: ChipList,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>ChipList is a component that displays a list of chips.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ChipListProps/" target="_blank">ChipList API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/chiplist/" target="_blank">ChipList Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-chiplist</legend>
              <pre>
                &lt;ChipList 
                  size="medium"
                  rounded="full"
                  :dataItems="Array('Boston', 'Paris', 'London', 'Buenos Aires', 'Belfast').map((item, index) => ({ text: item, value: item }))" 
                /&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-chiplist:single</legend>
              <pre>
                &lt;ChipList 
                  selection="single"
                  size="medium"
                  rounded="full"
                  :dataItems="Array('Boston', 'Paris', 'London', 'Buenos Aires', 'Belfast').map((item, index) => ({ text: item, value: item }))" 
                /&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-chiplist:multi</legend>
              <pre>
                &lt;ChipList 
                  selection="multiple"
                  size="medium"
                  rounded="full"
                  :dataItems="Array('Boston', 'Paris', 'London', 'Buenos Aires', 'Belfast').map((item, index) => ({ text: item, value: item }))" 
                /&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  //#endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

const cities = [
  {
    text: "Belfast",
    value: "Belfast",
    disabled: false,
    icon: mapMarkerTargetIcon.name,
  },
  {
    text: "Boston",
    value: "Boston",
    disabled: false,
    icon: mapMarkerTargetIcon.name,
  },
  {
    text: "Dallas",
    value: "Dallas",
    disabled: false,
    icon: mapMarkerTargetIcon.name,
  },
  {
    text: "Raleigh",
    value: "Raleigh",
    disabled: true,
    icon: mapMarkerTargetIcon.name,
  },
  {
    text: "Philadelphia",
    value: "Philadelphia",
    disabled: false,
    icon: mapMarkerTargetIcon.name,
  },
];

export const Default: Story = {
  argTypes: {
    selection: {
      control: "select",
      options: [undefined, "single", "multiple"],
    },
    size: { control: "select", options: ["small", "medium", "large"] },
    rounded: {
      control: "select",
      options: ["full", "small", "medium", "large"],
    },
    dataItems: { control: "object" },
  },
  args: {
    selection: undefined,
    size: "medium",
    rounded: "full",
    dataItems: cities,
  },
};

// #region interactions
export const SingleSelection: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, selection: "single" },
};

SingleSelection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  let chipList = await canvas.findAllByRole("option");

  await userEvent.click(chipList[1]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("true");

  await userEvent.click(chipList[2]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("false");
  await expect (chipList[2].getAttribute("aria-selected")).toBe("true");

  await userEvent.click(chipList[3]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("false");
  await expect (chipList[2].getAttribute("aria-selected")).toBe("false");
  await expect (chipList[3].getAttribute("aria-selected")).toBe("true");

};

export const MultiSelection: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, selection: "multiple" },
};

MultiSelection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  let chipList = await canvas.findAllByRole("option");

  await userEvent.click(chipList[1]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("true");

  await userEvent.click(chipList[2]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("true");
  await expect (chipList[2].getAttribute("aria-selected")).toBe("true");

  await userEvent.click(chipList[4]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("true");
  await expect (chipList[2].getAttribute("aria-selected")).toBe("true");
  await expect (chipList[4].getAttribute("aria-selected")).toBe("true");

  await userEvent.click(chipList[2]);
  await expect (chipList[1].getAttribute("aria-selected")).toBe("true");
  await expect (chipList[2].getAttribute("aria-selected")).toBe("false");
  await expect (chipList[4].getAttribute("aria-selected")).toBe("true");

}
//#endregion interactions
