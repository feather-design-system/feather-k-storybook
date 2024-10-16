import { Meta, StoryObj } from "@storybook/vue3";
import { PanelBar } from "@progress/kendo-vue-layout";
import { Input } from "@progress/kendo-vue-inputs";

const panelBarItems = [
  {
    title: "Demographics",
    content: "demographics-content",
    expanded: true,
  },
  {
    title: "Contact Information",
    content: "contact-information-content",
  },
  {
    title: "Employment",
    content: "employment-content",
  },
  {
    title: "Emergency Contact",
    content: "emergency-contact-content",
  },
];

const meta: Meta<typeof PanelBar> = {
  title: "Feather K/PanelBar",
  component: PanelBar,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<h5>PanelBar description goes here.</h5>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/PanelBarProps/" target="_blank">PanelBar API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/panelbar/" target="_blank">PanelBar Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-panelbar</legend>
              <pre>
                &lt;PanelBar&gt;
                &lt;/PanelBar&gt;
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
    expandMode: { control: "select", options: ["single", "multiple"], defaultValue: "single" },
    items: { control: "object" },
  },
  args: {
    expandMode: "single",
    items: panelBarItems,
  },
  render: (args) => ({
    components: { PanelBar, Input },
    computed: {
      sliderValue() {
        return this.value;
      },
    },
    data() {
      return {};
    },
    setup() {
      return { args };
    },
    template: `
    <div class="my-panelbar-container">
      <PanelBar :expandMode="args.expandMode" :items="args.items">
        <template #demographics-content>
          <div>
            <label>First name</label>
            <Input></Input>
            <label>Last name</label>
            <Input></Input>
          </div>
        </template>
        <template #contact-information-content>
          <div>
            <label>Email</label>
            <Input></Input>
            <label>Phone</label>
            <Input></Input>
          </div>
        </template>
        <template #employment-content>
          <div>
            <label>Company</label>
            <Input></Input>
            <label>Position</label>
            <Input></Input>
          </div>
        </template>
        <template #emergency-contact-content>
          <div>
            <label>Name</label>
            <Input></Input>
            <label>Phone</label>
            <Input></Input>
          </div>
        </template>
      </PanelBar>
    </div>
    `,
  }),
};
