import { Meta, StoryObj} from "@storybook/vue3"
import { Signature, TextArea } from "@progress/kendo-vue-inputs"

import "./signature.css";

const meta: Meta<typeof Signature> = {
  title: "Feather K/Signature",
  // title: "Feather K/Input/Signature",
  component: Signature,
  parameters: {
    docs: {
      description: {
        component:
          `<p>Signature is a form component that allows users to draw a signature.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/SignatureProps/" target="_blank">Signature API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/signature/" target="_blank">Signature Documentation</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs" target="_blank">Data URLs</a></li>
          </ul>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    fillMode: { control: "select", options: ["solid", "outline", "flat"] },
    disabled: { control: "boolean" },
  },
  args: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fillMode: "outline",
    disabled: false,
  },
  render: (args) => ({
    components: { Signature, TextArea },
    data() {
      return {
        value: "",
      };
    },
    setup() {
      return { args };
    },
    template: `
      <div class="storybook-demo-signature-wrapper">
        <Signature
          class="storybook-demo-signature"
          v-model="value"
          :backgroundColor="args.backgroundColor"
          :color="args.color"
          :fillMode="args.fillMode"
          :disabled="args.disabled"
        />

        <div>
          <TextArea 
            class="storybook-demo-textarea" 
            :rows="10"
            :placeholder="'Signature value'"
            fillMode="solid"
            :value="value" 
            >
          </TextArea>

        </div>
      </div>
    `,
  }),
};


