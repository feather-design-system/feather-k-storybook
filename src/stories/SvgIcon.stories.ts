import { Meta, StoryObj } from "@storybook/vue3";
import { SvgIcon } from "@progress/kendo-vue-common";
import { calendarIcon, globeIcon, mapMarkerIcon, pinIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof SvgIcon> = {
  title: "Feather K/Icons/SvgIcon",
  component: SvgIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    icon: {
      control: "select",
      options: ["calendar", "globe", "map", "pin"],
      mapping: {
        calendar: calendarIcon,
        globe: globeIcon,
        pin: pinIcon,
        map: mapMarkerIcon,
      },
    },
  },
  args: {
    size: "medium",
    icon: globeIcon,
  },
};
