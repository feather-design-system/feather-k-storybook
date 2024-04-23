import { Meta, StoryObj } from "@storybook/vue3";
import { ColorPalette } from "@progress/kendo-vue-inputs";

const meta: Meta<typeof ColorPalette> = {
  title: "Feather K/Input/ColorPalette",
  component: ColorPalette,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>ColorPalette is a form component that allows users to select a color from a predefined palette.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/api/ColorPaletteProps/" target="_blank">ColorPalette API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/inputs/colorpalette/" target="_blank">ColorPalette Documentation</a></li>
          </ul>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const customColors = [
  { hex: "#ff0000", name: "Red" },
  { hex: "#ff8000", name: "Orange" },
  { hex: "#ffff00", name: "Yellow" },
  { hex: "#80ff00", name: "Green" },
  { hex: "#00ff00", name: "Light Green" },
  { hex: "#00ff80", name: "Turquoise" },
  { hex: "#00ffff", name: "Light Blue" },
  { hex: "#0080ff", name: "Blue" },
  { hex: "#0000ff", name: "Dark Blue" },
];

export const Default: Story = {
  argTypes: {
    palette: {
      control: "select",
      options: ["basic", "apex", "office", "monochrome"],
    },
    tileSize: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    palette: "basic",
    tileSize: 30,
    disabled: false,
  },
  render: (args) => ({
    components: { ColorPalette },
    data() {
      return {
        value: "#ff2599",
      };
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <ColorPalette 
        v-model="value"
        :palette="args.palette"
        :tileSize="args.tileSize"
        :disabled="args.disabled" 
      />
    </div>
    `,
  }),
};

export const CustomColors: Story = {
  argTypes: {
    tileSize: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    tileSize: 40,
    disabled: false,
  },
  render: (args) => ({
    components: { ColorPalette },
    computed: {
      customColors() {
        return customColors.map((color: any) => color.hex);
      },
      customColorNames() {
        return customColors.map((color: any) => color.name);
      },
    },
    data() {
      return {
        customColor: null,
      };
    },
    methods: {
      onChange(e: any) {
        const customColor = customColors.find((color: any) => {
          if (color.hex === e.value) {
            return color;
          }
        });
        this.customColor = customColor;
      },
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <ColorPalette 
        v-model="args.value"
        :palette="customColors"
        :tileSize="args.tileSize"
        :disabled="args.disabled" 
        @change="onChange"
      />
      <div class="k-column-title">{{customColor?.name}} {{customColor ? customColor?.hex : ''}}</div>
    </div>
    `,
  }),
};
