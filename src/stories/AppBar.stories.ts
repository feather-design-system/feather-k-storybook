import { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@progress/kendo-vue-buttons";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-vue-layout";
import { menuIcon } from "@progress/kendo-svg-icons";

import "./app-bar.css";

const meta: Meta<typeof AppBar> = {
  title: "Feather K/Layout/AppBar",
  component: AppBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    position: { control: "select", options: ["top", "bottom"] },
    positionMode: { control: "select", options: ["fixed", "static", "sticky"] },
    themeColor: { control: "select", options: ["light", "dark"] },
  },
  args: {
    position: "top",
    positionMode: "fixed",
    themeColor: "light",
  },
  parameters: {
    style: {
      width: "100%",
    },
  },
  render: (args) => ({
    components: { AppBar, AppBarSection, AppBarSpacer, Button },
    data() {
      return { menuIcon: menuIcon };
    },
    setup() {
      return { args };
    },
    template: ` 
    <AppBar 
      :position="args.position" 
      :themeColor="args.themeColor" 
      :positionMode="args.positionMode"
      >
      <AppBarSection>
        <Button :svgIcon="menuIcon" :fillMode="'flat'" />
      </AppBarSection>
      <AppBarSpacer :width="'1em'"/>
      <AppBarSection>
        <h1>Feather K App</h1>
      </AppBarSection>
      <AppBarSection>
        <ul>
          <li><span>Home</span></li>
          <li><span>Products</span></li>
          <li><span>About</span></li>
        </ul>
      </AppBarSection>
    </AppBar>
    `,
  }),
};
