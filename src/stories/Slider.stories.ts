import { Meta, StoryObj } from "@storybook/vue3";
import { Slider, SliderLabel } from "@progress/kendo-vue-inputs";
import { NumericTextBox } from "@progress/kendo-vue-inputs";

import "./slider.css";

const meta: Meta<typeof Slider> = {
  title: "Feather K/Input/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `<h5>Slider is a component that allows the user to select a numeric value from a predefined range.</h5>` +
        `<h3>Links</h3>` + 
         `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/SliderProps/" target="_blank">Slider API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/slider/" target="_blank">Slider Documentation</a></li>
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
    vertical: { control: "boolean" },
    buttons: { control: "boolean" },
    step: { control: "number" },
    defaultValue: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
  },
  args: {
    vertical: false,
    buttons: false,
    step: 1,
    defaultValue: 0,
    min: 0,
    max: 20,
    value: 0,
  },
  render: (args) => ({
    components: { Slider, SliderLabel, NumericTextBox },
    computed: {
      sliderValue() {
        return this.value;
      },
    },
    data() {
      return {
      };
    },
    setup() {
      return { args };
    },
    template: `
    <div class="my-slider-container">
      <div>
        <Slider 
          :vertical="args.vertical"
          :buttons="args.buttons"
          :step="args.step"
          :defaultValue="args.defaultValue"
          :min="args.min"
          :max="args.max"
          v-model="args.value"
          
        >
          <SliderLabel slot="label" :position="0">0</SliderLabel>
          <SliderLabel slot="label" :position="5">5</SliderLabel>
          <SliderLabel slot="label" :position="10">10</SliderLabel>
          <SliderLabel slot="label" :position="15">15</SliderLabel>
          <SliderLabel slot="label" :position="20">20</SliderLabel>
        </Slider> 
      </div
      <hr/>
      <p>
        <NumericTextBox :label="'Value'" :value="Number.parseInt(args.value)" :fillMode="'outline'" :disabled="true" />
      </p>
    </div>
    `,
  }),
};
