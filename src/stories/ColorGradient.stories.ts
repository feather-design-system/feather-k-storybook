import { Meta, StoryObj } from "@storybook/vue3";
import { ColorGradient } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof ColorGradient> = {
  title: "Feather K/ColorGradient",
  // title: "Feather K/Input/ColorGradient",
  component: ColorGradient,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>ColorGradient is a form component that allows users to select a color gradient.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/ColorGradientProps/" target="_blank">ColorGradient API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/colorgradient/" target="_blank">ColorGradient Documentation</a></li>
          </ul>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { ColorGradient },
    data() {
      return {
        value: "#ff2599",
      };
    },
    // methods: {
    //   onChange(e: any) {
    //     this.value = e.value;
    //   },
    // },
    setup() {
      return { args };
    },
    template: `
    <ColorGradient 
      v-model="value"
      // @change="onChange"
      :disabled="args.disabled" 
    />
    `,
  }),
};
