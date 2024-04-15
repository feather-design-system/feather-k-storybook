import { Meta, StoryObj } from "@storybook/vue3";
import { DropDownList } from "@progress/kendo-vue-dropdowns";

const items = [
    "Basketball",
    "Football",
    "Tennis",
    "Volleyball",
];

const meta: Meta<typeof DropDownList> = {
  title: "Feather K/DropDowns/DropDownList",
  component: DropDownList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Original: Story = {
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
    style: { width: "15em" },
  },
};