import { Meta, StoryObj } from "@storybook/vue3";
import { Skeleton } from "@progress/kendo-vue-indicators";

const meta: Meta<typeof Skeleton> = {
  title: "Feather K/Skeleton",
  component: Skeleton,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>Skeleton is a visual indicator that informs the user that content is being loaded.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/indicators/api/SkeletonProps/" target="_blank">Skeleton API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/indicators/skeleton/" target="_blank">Skeleton Documentation</a></li>
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
    shape: {
      control: "select",
      options: ["circle", "rectangle", "text"],
    },
    animation: {
      boolean: "boolean",
    },
  },
  args: {
    shape: "text",
    animation: true,
  },
  render: (args) => ({
    components: { Skeleton },
    computed: {
      style() {
        let style = {};

        switch (args.shape) {
          case "circle":
            style = { width: "100px", height: "100px" };
            break;
          case "rectangle":
            style = { width: "300px", height: "300px" };
            break;
          default:
            style = { width: "15em" };
            break;
        }

        return style;
      },
    },
    data() {
      return {};
    },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Skeleton :class="'wave'" :style="style" :shape="args.shape" :animation="args.animation" />
      </div>
    `,
  }),
};
