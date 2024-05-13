import { Meta, StoryObj } from "@storybook/vue3";
import { ChipList } from "@progress/kendo-vue-buttons";
import { mapMarkerTargetIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof ChipList> = {
  title: "Feather K/ChipList",
  // title: "Feather K/Buttons/ChipList",
  component: ChipList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>ChipList is a component that displays a list of chips.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ChipListProps/" target="_blank">ChipList API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/chiplist/" target="_blank">ChipList Documentation</a></li>
          </ul>
        `,
      },
    },
  },
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