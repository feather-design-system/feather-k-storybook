// Stepper.stories.ts
import { Meta, StoryObj } from "@storybook/vue3-vite";
import { ExpansionPanel, ExpansionPanelContent } from "@progress/kendo-vue-layout";
import { defineComponent } from "vue";

const meta: Meta<typeof ExpansionPanel> = {
  title: "Feather K/ExpansionPanel",
  component: ExpansionPanel,
  parameters: {
    docs: {
      description: {
        component:
          `<p>ExpansionPanel is a component that allows you to create an expansion panel.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/ExpansionPanelProps/" target="_blank">ExpansionPanel API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/expansionpanel/" target="_blank">ExpansionPanel Documentation</a></li>
          </ul>` +
          `<div class="fk-emmet">
            <fieldset>
              <legend>fk-expansionpanel</legend>
              <pre>
              &lt;ExpansionPanel
                :expanded="expanded"
                :title="'Title'"
                :subtitle="'Sub Title'"
                @action="expanded = !expanded;console.log('action event called.  Add: const expanded = ref(false);')"
              &gt;
                &lt;ExpansionPanelContent v-if="expanded"&gt;
                  &lt;p&gt;Expansion panel content.&lt;/p&gt;
                &lt;/ExpansionPanelContent&gt;
              &lt;/ExpansionPanel&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  argTypes: {
    expanded: { control: { type: "boolean" } },
    title: { control: { type: "text" } },
    subtitle: { control: { type: "text" } },
    style: { control: { type: "object" } },
  },
};

export default meta;
type Story = StoryObj<typeof ExpansionPanel>;

/* Default Story — using defineComponent (no string template!) */
export const Default: Story = {
  args: {
    expanded: false,
    title: "Expansion Panel Title",
    subtitle: "This is the subtitle",
    style: { width: "30rem" },
  },

  render: (args) =>
    defineComponent({
      components: { ExpansionPanel, ExpansionPanelContent },

      setup() {
        // Local reactive state (mirrors args.value so controls work)
        return { args };
      },

      template: `
        <div style="padding: 40px; background: #fafafa; min-height: 320px;">
          <ExpansionPanel v-bind="args" @action="args.expanded = !args.expanded">
            <template #title>
              {{ args.title }}
            </template>
            <template #subtitle>
              {{ args.subtitle }}
            </template>
            <ExpansionPanelContent v-if="args.expanded">
              <p>This is the content of the expansion panel.</p>
            </ExpansionPanelContent>
          </ExpansionPanel>
        </div>
      `,
    }),
};
