import { Meta, StoryObj } from "@storybook/vue3-vite";
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
            <li><strong>Pulse animation is currently only visible with a dark background.  May need to revisit this in ThemeBuilder.</strong></li>
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
      control: "select",
      options: ["pulse", "wave"],
      mapping: {
        pulse: { type: "pulse" },
        wave: { type: "wave" },
      },
    },
  },
  args: {
    shape: "rectangle",
    animation: { type: "wave" },
  },
  render: (args) => ({
    components: { Skeleton },
    computed: {
      skeletonStyle() {
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
        <Skeleton  :style="skeletonStyle" :shape="args.shape" :animation="args.animation" />
      </div>
    `,
  }),
};

export const Page: Story = {
  argTypes: {
    animation: {
      control: "select",
      options: ["pulse", "wave"],
      mapping: {
        pulse: { type: "pulse" },
        wave: { type: "wave" },
      },
    },
  },
  args: {
    animation: { type: "wave" },
  },
  render: (args) => ({
    components: { Skeleton },
    data() {
      return {};
    },
    setup() {
      return { args };
    },
    template: `
    <div :style="{backgroundColor: 'rgba(255,255,255,.4)', outline: '1px dashed #eee'}">
      <div :style="{marginBottom: '4em'}">
        <Skeleton
          :style="{ width: '100px', height: '100px' }"
          :shape="'circle'"
          :animation="args.animation"
          />
      </div>
      <div class="wrapper"
        :style="{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '2em',
                alignItems: 'flex-start',
                }">
        <div>
          <Skeleton
            :style="{ width: '300px', height: '300px' }"
            :shape="'rectangle'"
            :animation="args.animation"
            />
        </div>
        <div>
          <Skeleton
            :style="{ height: '40px', width: '20em' }"
            :shape="'text'"
            :animation="args.animation"
            />
          <Skeleton
            :style="{ height: '40px', width: '20em' }"
            :shape="'text'"
            :animation="args.animation"
            />
          <Skeleton
            :style="{ height: '40px', width: '20em' }"
            :shape="'text'"
            :animation="args.animation"
            />
          <Skeleton
            :style="{ height: '40px', width: '20em' }"
            :shape="'text'"
            :animation="args.animation"
            />
          <Skeleton
            :style="{ height: '40px', width: '20em' }"
            :shape="'text'"
            :animation="args.animation"
            />
        </div>
      </div>
    </div>
    `,
  }),
};
