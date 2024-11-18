import { provide, reactive, ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { Stepper } from "@progress/kendo-vue-layout";
import { Form } from "@progress/kendo-vue-form";
import { Button } from "@progress/kendo-vue-buttons";
// import { checkCircleIcon } from "@progress/kendo-svg-icons";

import Register from "./content/wizard/Register.vue";
import UserInfo from "./content/wizard/UserInfo.vue";
import LoginInfo from "./content/wizard/LoginInfo.vue";

import "./content/wizard/wizard.css";

const meta: Meta<typeof Stepper> = {
  title: "Feather K/Wizard",
  component: Stepper,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>The Kendo UI for Vue Wizard is not a separate component that can provide the Wizard functionality out of the box. However, using the combination of the Native Form and Stepper components, you can achieve the functionality of a virtual Wizard component.</p>` +
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
              &lt;Stepper
                :value=&quot;0&quot;
                :items=&quot;[
                  { id: 1, label: &apos;Step 1&apos; },
                  { id: 2, label: &apos;Step 2&apos; }
                ]&quot;
                orientation=&quot;horizontal&quot;
                :animationDuration=&quot;500&quot;
                @change=&quot;console.log(&apos;change&apos;)&quot;
              /&gt;
              &lt;Form @submit=&quot;console.log(&apos;submitted&apos;)&quot;&gt;
                &lt;div class=&quot;wizard-content&quot;&gt;Components for steps here...&lt;/div&gt;
              &lt;/Form&gt;
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
    components: { Stepper, Button, Form, LoginInfo, Register, UserInfo },
    setup() {
      const step = ref(args.value);
      const steps = reactive(args.items);

      const registered = ref(false);
      provide("registered", registered);

      const handleSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2));
      };

      const handleStepperChange = (delta: 1 | -1) => {
        if (step.value === steps.length - 1 && delta === 1) {
          registered.value = true;
          return
        }
        if (step.value === 0 && delta === -1) {
          return;
        }
        // if (step.value === steps.length - 1 && delta === 1) {
        //   return;
        // }
        if (step.value < steps.length) {
          step.value += delta;
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
    <div class="wizard-story">
      <Stepper
        :value="step"
        :items="steps"
        class="stepper"
        >
      </Stepper>
      <div class="content">
        <Form @submit="handleSubmit">
          <UserInfo v-show="step === 0" />
          <LoginInfo v-show="step === 1" />
          <Register v-show="step === 2" :register="registered" />
        </Form>
        <div v-if="!registered" class="progress">
          Step {{ step + 1 }} of {{ steps.length }}
        </div>
        <div class="actions">
          <Button
            class="wizard-button"
            type="button"
            fillMode="outline"
            themeColor="primary"
            rounded="medium"
            :disabled="registered || step === 0"
            @click="handleStepperChange(-1)"
            >
              Previous
          </Button>
          <Button
            class="wizard-button"
            type="button"
            fillMode="outline"
            themeColor="primary"
            rounded="medium"
            :disabled="registered"
            @click="handleStepperChange(1)"
            >
              {{ step === steps.length - 1 ? "Register" : "Next" }}
          </Button>
        </div>
      </div>
    </div>
    `,
  }),
};
