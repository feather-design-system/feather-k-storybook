// Stepper.stories.ts
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
import { defineComponent, ref } from "vue";

const meta: Meta<typeof Stepper> = {
  title: "Feather K/Stepper",
  component: Stepper,
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
          `<div class="fk-emmet">
            <fieldset>
              <legend>fk-stepper</legend>
              <pre>
&lt;Stepper
  :value="0"
  :items="[
    { label: &apos;Cart&apos; },
    { label: &apos;Delivery&apos; },
    { label: &apos;Payment&apos; },
    { label: &apos;Summary&apos; },
    { label: &apos;Confirmation&apos; }
  ]"
/&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  argTypes: {
    value: { control: { type: "number" } },
    items: { control: { type: "object" } },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/* Shared items — reuse across stories */
const stepperItems = [
  { id: "1", label: "Cart", svgIcon: cartIcon },
  { id: "2", label: "Delivery Address", svgIcon: mapMarkerIcon },
  { id: "3", label: "Payment Method", svgIcon: dollarIcon },
  { id: "4", label: "Order Summary", svgIcon: eyeIcon },
  { id: "5", label: "Confirmation", svgIcon: trackChangesAcceptIcon },
];

/* Default Story — using defineComponent (no string template!) */
export const Default: Story = {
  args: {
    value: 0,
    items: stepperItems,
  },

  render: (args) =>
    defineComponent({
      components: { Stepper, Button },

      setup() {
        // Local reactive state (mirrors args.value so controls work)
        const currentStep = ref<number>(args.value ?? 0);

        // Sync back to Storybook controls when Stepper emits change
        const onStepperChange = (e: { newValue: number }) => {
          currentStep.value = e.newValue;
          args.value = e.newValue; // Keeps the Args table in sync
        };

        const nextStep = () => {
          currentStep.value =
            currentStep.value < stepperItems.length - 1 ? currentStep.value + 1 : 0;
          args.value = currentStep.value;
        };

        return { args, currentStep, onStepperChange, nextStep, stepperItems };
      },

      template: `
        <div style="padding: 40px; background: #fafafa; min-height: 320px;">
          <Button
            theme-color="primary"
            fill-mode="solid"
            rounded="medium"
            @click="nextStep"
          >
            {{ currentStep === stepperItems.length - 1 ? 'Reset' : 'Next Step' }}
          </Button>

          <Stepper
            style="margin-top: 32px; max-width: 900px;"
            :value="currentStep"
            :items="stepperItems"
            @change="onStepperChange"
          />
        </div>
      `,
    }),
};
