import { Meta, StoryObj } from "@storybook/vue3";
import { StackLayout } from "@progress/kendo-vue-layout";
import Tip from "../components/Tip.vue";

const meta: Meta<typeof StackLayout> = {
  title: "Feather K/StackLayout",
  component: StackLayout,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>StackLayout is a component that allows you to create a stack layout.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/StackLayoutProps/" target="_blank">StackLayout API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/stacklayout/" target="_blank">StackLayout Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-stacklayout</legend>
              <pre>
                &lt;fk-stacklayout&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof StackLayout>;

export const Default: Story = {
  argTypes: {
    gap: {
      control: { type: "number" },
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    // @ts-ignore
    stackStyle: {
      control: { type: "object" },
    },
  },
  args: {
    gap: 8,
    orientation: "vertical",
    // @ts-ignore
    stackStyle: {
      backgroundColor: "#fefefe",
      padding: "0.25em",
      height: "auto",
    },
  },
  render: (args) => ({
    components: { StackLayout, Tip },
    setup() {
      const stackTips = [
        {
          tip: 1,
          title: "The 'gap' Attribute",
          content:
            "The gap attribute specifies the padding between the elements.",
        },
        {
          tip: 2,
          title: "The 'orientation' Attribute",
          content:
            "The orientation attribute specifies the direction of the layout.",
        },
        {
          tip: 3,
          title: "The StackLayout vs. GridLayout",
          content:
            "The StackLayout is a flex layout, while the GridLayout is a grid layout.  StackLayout is more flexible, while GridLayout is more rigid.",
        },
        {
          tip: 4,
          title: "The 'stackStyle' Attribute",
          content:
            "The stackStyle attribute is not part of the StackLayout.  It is used to style the children inside StackLayout for Storybook demonstration purposes.",
        }
      ];
      return { args, stackTips };
    },
    template: `
      <div>
        <h1 style="width: 80%; margin: auto;">StackLayout</h1>
        <div style="margin: auto; width: 80%;">
          <StackLayout :gap="args.gap" :orientation="args.orientation">
            <div :style="args.stackStyle">
              <Tip :item="stackTips[0]" />
            </div>
            <div :style="args.stackStyle">
              <Tip :item="stackTips[1]" />
            </div>
            <div :style="args.stackStyle">
              <Tip :item="stackTips[2]" />
            </div>
            <div :style="args.stackStyle">
              <Tip :item="stackTips[3]" />
            </div>
          </StackLayout>
        </div>
      </div>
    `,
  }),
};
