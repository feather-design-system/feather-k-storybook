import { Meta, StoryObj } from "@storybook/vue3";
import {
  Animation,
  Slide,
  Push,
  Expand,
  Fade,
  Zoom,
  Reveal,
} from "@progress/kendo-vue-animation";

const meta: Meta<typeof Animation> = {
  title: "Feather K/Animation",
  component: Animation,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>Animation is a visual indicator that informs the user that content is being loaded.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/animation/api/AnimationProps/" target="_blank">Animation API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/animation/" target="_blank">Animation Documentation</a></li>
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
    appear: { control: "boolean" },
    enter: { control: "boolean" },
    exit: { control: "boolean" },
    transitionEnterDuration: { control: "number" },
    transitionExitDuration: { control: "number" },
  },
  args: {
    appear: true,
    enter: false,
    exit: false,
    transitionEnterDuration: 2000,
    transitionExitDuration: 2000,
  },
  render: (args) => ({
    components: { Animation, Slide, Push, Expand, Fade, Zoom, Reveal },
    data() {
      return {};
    },
    setup() {
      return { args };
    },
    template: `
      <h1>Animation</h1>
      <div :style="{
        display: 'flex',
        flexDirection: 'row',
        gap: '1em',
        padding: '1em'
        }">
        <div :style="{outline: '1px solid #bbb', padding: '1em'}">
          <Slide v-bind="args">
              <div>Slide</div>
          </Slide>
        </div>
        <div :style="{outline: '1px solid #bbb', padding: '1em'}">
          <Push v-bind="args">
              <div>Push</div>
          </Push>
        </div>
        <div :style="{outline: '1px solid #bbb', padding: '1em'}">
          <Expand v-bind="args">
              <div>Expand</div>
          </Expand>
        </div>
        <div :style="{outline: '1px solid #bbb', padding: '1em'}">
          <Fade v-bind="args">
              <div>Fade</div>
          </Fade>
        </div>
        <div :style="{outline: '1px solid #bbb', padding: '1em'}">
          <Zoom v-bind="args">
            <div>Zoom</div>
          </Zoom>
        </div>
        <div :style="{outline: '1px solid #bbb', padding: '1em'}">
          <Reveal v-bind="args">
            <div>Reveal</div>
          </Reveal>
        </div>
      </div>
    `,
  }),
};
