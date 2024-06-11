import { Meta, StoryObj } from "@storybook/vue3";
import { Chip } from "@progress/kendo-vue-buttons";

const meta: Meta<typeof Chip> = {
  title: "Feather K/Chip",
  // title: "Feather K/Buttons/Chip",
  component: Chip,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>Chip is a component that allows users to enter information, make selections, filter content, or trigger actions.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ChipProps/" target="_blank">Chip API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/chip/" target="_blank">Chip Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-chip</legend>
              <pre>
                &lt;Chip
                  text="Triage"
                  :removable="true"
                  @remove="console.log('remove event called')"
                  rounded="full"
                  :style="{ width: '8em' }"
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
    disabled: { control: "boolean" },
    text: { control: "text" },
    rounded: {
      control: "select",
      options: ["full", "small", "medium", "large"],
    },
    removable: { control: "boolean" },
    value: {
      control: "select",
      options: ["base", "info", "success", "warning", "error"],
    },
  },
  args: {
    disabled: false,
    text: "Chip component",
    rounded: "full",
    removable: true,
    value: "info",
  },
  render: (args) => ({
    components: { Chip },
    data() {
      return { visible : true };
    },
    setup() {
      return { args };
    },
    template: `
    <Chip 
      v-if="visible"
      @remove="visible = false"
      :text="args.text"
      :rounded="args.rounded"
      :removable="args.removable"
      :themeColor="args.value" 
      :disabled="args.disabled" 
    />
    `,
  }),
};

