import { Meta, StoryObj } from "@storybook/vue3-vite";
import { ColorPicker } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof ColorPicker> = {
  title: "Feather K/ColorPicker",
  // title: "Feather K/Input/ColorPicker",
  component: ColorPicker,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>ColorPicker is a form component that allows users to select a color from a predefined palette.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/ColorPickerProps/" target="_blank">ColorPicker API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/colorpicker/" target="_blank">ColorPicker Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-colorpicker</legend>
              <pre>
                &lt;ColorPicker palette="basic" :tileSize="20" /&gt;
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
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { ColorPicker },
    data() {
      return {
        value: "#FFA372",
      };
    },
    setup() {
      return { args };
    },
    template: `
      <ColorPicker
        v-model="value"
        :palette="args.palette"
        :tileSize="args.tileSize"
        :disabled="args.disabled"
      />
    `,
  }),
};