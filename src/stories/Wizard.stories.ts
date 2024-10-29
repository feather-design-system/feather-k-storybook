import { provide, reactive, ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { Stepper } from "@progress/kendo-vue-layout";
import { Form } from "@progress/kendo-vue-form";
import { Button } from "@progress/kendo-vue-buttons";
// import { checkCircleIcon } from "@progress/kendo-svg-icons";

import Registered from "./content/wizard/Registered.vue";
import UserInfo from "./content/wizard/UserInfo.vue";
import LoginInfo from "./content/wizard/LoginInfo.vue";

const meta: Meta<typeof Stepper> = {
  title: "Feather K/Wizard",
  component: Stepper,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>The Kendo UI for Vue Wizard is not a separate component that can provide the Wizard functionality out of the box. However, using the combination of the Native Form and Stepper components, we can effortlessly achieve the functionality of a virtual Wizard component.</p>` +
          `<p>NOTE:  There is no separate Wizard component; A Wizard can be achieved using a combination of the Stepper component and Forms.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/wizard/" target="_blank">Wizard Overview</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/stepper/" target="_blank">Stepper Overview</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/StepperProps/" target="_blank">Stepper API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/form/" target="_blank">Form Overview</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/form/api/FormProps/" target="_blank">Form API</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-wizard</legend>
              <pre>
                &lt;fk-wizard&gt;
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
      { id: "1", label: "User Info" },
      { id: "2", label: "Login Info" },
      { id: "3", label: "Register" },
    ],
  },
  render: (args) => ({
    components: { Stepper, Button, Form, LoginInfo, Registered, UserInfo },
    setup() {
      const step = ref(args.value);
      const steps = reactive(args.items);

      const registered = ref(false);
      provide("registered", registered);

      const handleSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2));
      };

      const handleStepperChange = () => {
        console.log(step.value, steps.length);
        if (step.value === steps.length - 1) {
          registered.value = true;
        }
        if (step.value < steps.length - 1) {
          step.value++;
        }
      };

      return {
        args,
        handleStepperChange,
        handleSubmit,
        registered,
        step,
        steps,
      };
    },
    template: `
    <div>
      <Stepper
        :value="step"
        :items="steps"
        >
      </Stepper>
      <Form @submit="handleSubmit">
        <UserInfo v-show="step === 0" />
        <LoginInfo v-show="step === 1" />
        <Registered v-show="step === 2" :register="registered" />
      </Form>
      <div v-if="!registered">
        Step {{ step + 1 }} of {{ steps.length }}
      </div>
      <div :style="{padding: '2em', textAlign: 'right'}">
        <Button
          type="button"
          fillMode="solid"
          themeColor="primary"
          rounded="medium"
          :disabled="registered"
          @click="handleStepperChange"
          >
            {{ step === steps.length - 1 ? "Register" : "Next" }}
        </Button>
      </div>
    </div>
    `,
  }),
};
