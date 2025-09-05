import { Meta, StoryObj } from "@storybook/vue3-vite";
import { Stepper } from "@progress/kendo-vue-layout";
import { Button } from "@progress/kendo-vue-buttons";
import {
  cartIcon,
  dollarIcon,
  eyeIcon,
  mapMarkerIcon,
  trackChangesAcceptIcon,
} from "@progress/kendo-svg-icons";

const meta: Meta<typeof Stepper> = {
  title: "Feather K/Stepper",
  component: Stepper,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>Stepper is a component that allows you to create a stepper.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/StepperProps/" target="_blank">Stepper API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/stepper/" target="_blank">Stepper Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-stepper</legend>
              <pre>
              &lt;Stepper
                :value=&quot;0&quot;
                :items=&quot;[
                  { id: 1, label: &apos;Start&apos; },
                  { id: 2, label: &apos;Processing&apos; },
                  { id: 3, label: &apos;Complete&apos; }
                ]&quot;
                orientation=&quot;horizontal&quot;
                :animationDuration=&quot;500&quot;
                @change=&quot;console.log(&apos;change&apos;)&quot;
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
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  argTypes: {
    value: {
      control: { type: "number" },
    },
    items: {
      control: { type: "object" },
    },
  },
  args: {
    value: 0,
    items: [
      { id: "1", label: "Cart", svgIcon: cartIcon },
      { id: "2", label: "Delivery Address", svgIcon: mapMarkerIcon },
      { id: "3", label: "Payment Method", svgIcon: dollarIcon },
      { id: "4", label: "Order Summary", svgIcon: eyeIcon },
      { id: "5", label: "Confirmation", svgIcon: trackChangesAcceptIcon },
    ],
  },
  render: (args) => ({
    components: { Button, Stepper },

    setup() {
      const handleStepperChange = (e: any) => {
        args.value = e.newValue;
      };
      return { args, handleStepperChange };
    },
    template: `
      <div>
        <Button
          type="button"
          fillMode="solid"
          themeColor="primary"
          rounded="medium"
          @click="(args.value < args.items.length - 1) ? args.value++ : args.value = 0">
            {{ args.value === args.items.length - 1 ? "reset" : "Next Step" }}
        </Button>
        <Stepper :value="args.value" :items="args.items" @change="handleStepperChange"/>
      </div>
    `,
  }),
};
