import type { Meta } from "@storybook/vue3";
// import type { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@progress/kendo-vue-buttons";
import { folderIcon, calendarIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof Button> = {
  title: "KendoFeather/Button/DoNotUse",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
// type Story = StoryObj<typeof meta>;

// @ts-ignore
const Template = (args) => ({
  argsTypes: { 
    themeColor: { control: "select", options: ["primary", "secondary"] },
    
  },
  components: { Button },
  data() {
    return {
      folderIcon: folderIcon,
      calendarIcon: calendarIcon,
    };
  },
  setup() {
    return { args };
  },
  template: `<Button v-bind="args">Button</Button>`,
});

// @ts-ignore

const TemplateIconOnly = (args) => ({
  components: { Button },
  data() {
    return {
      folderIcon,
      calendarIcon,
    };
  },
  setup() {
    return { args };
  },
  template: `<Button v-bind="args">Button</Button>`,
});

export const Primary = Template.bind({});
// @ts-ignore
Primary.args = { themeColor: "primary" };

export const PrimaryDisabled = Template.bind({});
// @ts-ignore
PrimaryDisabled.args = { themeColor: "primary", disabled: true };

export const Secondary = Template.bind({});
// @ts-ignore
Secondary.args = { themeColor: "secondary" };

export const SecondaryDisabled = Template.bind({});
// @ts-ignore
SecondaryDisabled.args = { themeColor: "secondary", disabled: true };

export const PrimaryIcon = TemplateIconOnly.bind({});
// @ts-ignore
PrimaryIcon.args = { themeColor: "primary", svgIcon: folderIcon };

// export const Secondary: Story = {
//   args: {
//     themeColor: "secondary",
//   },
//   render: (args) => ({
//     data() {
//       return {
//         folderIcon,
//         calendarIcon,
//       };
//     },
//     setup() {
//       return { args };
//     },
//     template: `
//        <Button :theme-color="args.themeColor">Browse</Button>
//     `,
//   }),
// };
// export const DefaultButtonIcon: Story = {
//   args: DefaultButton.args,
//   render: DefaultButton.render,
//   template: `<Button>Icon</Icon>`,
// }
