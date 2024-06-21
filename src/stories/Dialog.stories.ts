import { Meta, StoryObj } from "@storybook/vue3";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { Button } from "@progress/kendo-vue-buttons";
import { within, expect, userEvent } from "@storybook/test";
import pause from "./utils/pause";

const meta: Meta<typeof Dialog> = {
  title: "Feather K/Dialog",
  component: Dialog,
  parameters: {
    // #region autodocs
    docs: {
      description: {
        component:
          `<p>Dialog is a component that displays a modal dialog.</p>` +
          `<h3>Installation</h3><pre><small>npm install @progress/kendo-vue-dialog</small></pre>` +
          `<h3>Links</h3>` +
          `<ul>
          <li><a href="https://www.telerik.com/kendo-vue-ui/components/dialogs/api/DialogProps/" target="_blank">Dialog API</a></li>
          <li><a href="https://www.telerik.com/kendo-vue-ui/components/dialogs/dialog/" target="_blank">Dialog Documentation</a></li>
        </ul>` +
          `<div className="fk-emmet">
          <fieldset>
            <legend>fk-dialog</legend>
            <pre>
              &lt;Dialog v-if="dialogIsVisible"
                title="Dialog Title"
                class="my-dialog"
                @close="toggleDialog" 
                &gt;
                lorem
                &lt;DialogActionsBar&gt;
                  &lt;Button 
                  type="button"
                  fillMode="solid"
                  themeColor="primary"
                  rounded="medium" 
                  @click="toggleDialog"
                  &gt;Ok
                  &lt;/Button&gt;
                &lt;/DialogActionsBar&gt;
              &lt;/Dialog&gt;
            </pre>
          </fieldset>
        </div>`,
      },
    },
    // #endregion autodocs
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
    data() {
      return {
        dialogIsVisible: false,
      };
    },
    methods: {
      toggleDialog() {
        this.args.visible = !this.args.visible;
      },
    },
    setup() {
      return { args };
    },
    template: `
      <Dialog
        :title="args.title"
        :width="args.width"
        :height="args.height"
        :contentStyle="args.contentStyle"
      >
        Ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

        <DialogActionsBar>
          <Button
            type="submit"
            fillMode="solid"
            themeColor="primary"
            rounded="medium"
            :style="{'max-width': 'fit-content'}" 
            @click="dialogIsVisible = false"
            >Ok
          </Button>
          <Button
            type="button"
            fillMode="outline"
            themeColor="primary"
            rounded="medium"
            :style="{'max-width': 'fit-content'}"
            @click="dialogIsVisible = false"
            >Cancel
          </Button>
  
        </DialogActionsBar>
      </Dialog>
    `,
  }),
};

export const Interaction: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args },
  render: (args) => ({
    components: { Dialog, DialogActionsBar, Button },
    data() {
      return {
        dialogIsVisible: false,
      };
    },
    methods: {
      toggleDialog() {
        this.args.visible = !this.args.visible;
      },
    },
    setup() {
      return { args };
    },
    template: `
      <Button 
        @click="dialogIsVisible = !dialogIsVisible"
        type="button"
        fillMode="outline"
        themeColor="primary"
        rounded="medium"        
        >Open Dialog</Button>
      <Dialog
        data-testid="dialog-title"
        v-if="dialogIsVisible"
        v-model=dialogIsVisible
        @close="dialogIsVisible = false"
        :title="args.title"
        :width="args.width"
        :height="args.height"
        :contentStyle="args.contentStyle"
      >
        Ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

        <DialogActionsBar>
          <Button
            type="submit"
            fillMode="solid"
            themeColor="primary"
            rounded="medium"
            :style="{'max-width': 'fit-content'}" 
            @click="dialogIsVisible = false"
            >Ok
          </Button>
          <Button
            type="button"
            fillMode="outline"
            themeColor="primary"
            rounded="medium"
            :style="{'max-width': 'fit-content'}"
            @click="dialogIsVisible = false"
            >Cancel
          </Button>
  
        </DialogActionsBar>
      </Dialog>
    `,
  }),
};
// #region interactions
Interaction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await pause(500);
  await userEvent.click(canvas.getByText("Open Dialog"));
  await expect(canvas.getByText("Dialog Title")).toBeInTheDocument();

  await pause(500);
  await userEvent.click(canvas.getAllByRole("button")[0]);
  await expect(canvas.queryByText("Dialog Title")).toBeNull();

  await pause(500);
  await userEvent.click(canvas.getByText("Open Dialog"));

  await pause(2000);
};
// #endregion interactions
