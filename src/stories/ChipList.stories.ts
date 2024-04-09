import { Meta, StoryObj } from "@storybook/vue3";
import { ChipList } from "@progress/kendo-vue-buttons";
import { mapMarkerTargetIcon } from "@progress/kendo-svg-icons";


const meta: Meta<typeof ChipList> = {
  title: "Feather K/Buttons/ChipList",
  component: ChipList,
  tags: ["autodocs"],
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
    icon: mapMarkerTargetIcon,
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
    disabled: false,
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
    selection: { control: "select", options: [undefined, "single", "multiple"] },
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

// export const WithIcons: Story = {
//   // ...Default,
//   argTypes: {
//     selection: { control: "select", options: [undefined, "single", "multiple"] },
//   },
//   render: (args) => ({
//     components: { Chip, ChipList, SvgIcon },
//     data() {  
//       return {
//         cities: cities,
//         mapMarkerTargetIcon: mapMarkerTargetIcon
//       };
//     },
//     setup() {
//       return { args };
//     },
//     template: `
//       <template v-for="city in cities">
//         <Chip
//           :rounded="'full'"
//           :text="city.text"
//           :value="city.value"
//           :disabled="city.disabled"
//           >
//           <template #icon>
//             <SvgIcon :icon="city.icon" />
//           </template>
//         </Chip>
//       </template>
//     `,
//   }),
// };