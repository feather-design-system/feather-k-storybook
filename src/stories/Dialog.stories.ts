import { Meta, StoryObj } from "@storybook/vue3";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { Button } from "@progress/kendo-vue-buttons";

const meta: Meta<typeof Dialog> = {
  title: "Feather K/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          `<p>Dialog is a component that displays a modal dialog.</p>` +
          `<h3>Links</h3>` +
          `<ul>
          <li><a href="https://www.telerik.com/kendo-vue-ui/components/dialogs/api/DialogProps/" target="_blank">Dialog API</a></li>
          <li><a href="https://www.telerik.com/kendo-vue-ui/components/dialogs/dialog/" target="_blank">Dialog Documentation</a></li>
        </ul>` +
          `<div className="fk-emmet">
          <fieldset>
            <legend>fk-dialog</legend>
            <pre>
              &lt;Dialog 
                title="Dialog Title" 
                visible="true" 
                width="300px" 
                height="200px" 
                :closable="true" 
                :modal="true" 
              &gt;
                Dialog content
              &lt;/Dialog&gt;
            </pre>
          </fieldset>
        </div>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    title: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    contentStyle: { control: "object" },
  },
  args: {
    title: "Dialog Title",
    height: "fit-content",
    width: "400px",
  },
  render: (args) => ({
    components: { Dialog, DialogActionsBar, Button },
    setup() {
      return { args };
    },
    template: `
      <Dialog
        v-bind="args"
      >
        <p>Ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

        <DialogActionsBar>
          <Button
            type="submit"
            fillMode="solid"
            themeColor="primary"
            rounded="medium"
            :style="{'max-width': 'fit-content'}" 
            >
            Ok
          </Button>
          <Button
            type="button"
            fillMode="outline"
            themeColor="primary"
            rounded="medium"
            :style="{'max-width': 'fit-content'}"             >Cancel
          </Button>
  
        </DialogActionsBar>
      </Dialog>
    `,
  }),
};
