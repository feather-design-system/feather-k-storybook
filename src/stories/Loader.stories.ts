import { Meta, StoryObj } from "@storybook/vue3";
import { Loader } from "@progress/kendo-vue-indicators";

const meta: Meta<typeof Loader> = {
  title: "Feather K/Loader",
  component: Loader,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>Loader is a visual indicator that informs the user that content is being loaded.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/indicators/api/LoaderProps/" target="_blank">Loader API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/indicators/loader/" target="_blank">Loader Documentation</a></li>
          </ul>
        `,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    type: {
      control: "select",
      options: [
        "pulsing",
        "infinite-spinner",
        "converging-spinner",
      ],
    },
    themeColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "inverse",
      ],
    },
  },
  args: {
    size: "medium",
    type: "pulsing",
    themeColor: "primary",
  },
  render: (args) => ({
    components: { Loader },
    data() {
      return {};
    },
    setup() {
      return { args };
    },
    template: `
      <Loader
        :size="args.size"
        :type="args.type"
        :themeColor="args.themeColor"
        />`,
  }),
};
