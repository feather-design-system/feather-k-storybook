import { Preview, setup } from "@storybook/vue3";

import { AutoComplete, ComboBox, DropDownList, DropDownTree, MultiSelect } from "@progress/kendo-vue-dropdowns";
import {
  Button,
  ButtonGroup,
  Chip,
  ChipList,
  DropDownButton,
  FloatingActionButton,
  SplitButton,
  Toolbar,
} from "@progress/kendo-vue-buttons";
import {
  Checkbox,
  ColorGradient,
  ColorPalette,
  ColorPicker,
  MaskedTextBox,
  NumericTextBox,
  RadioButton,
  RadioGroup,
  RangeSlider,
  Signature,
  Slider,
  Switch,
  TextBox,
  TextArea,
} from "@progress/kendo-vue-inputs";
import { Hint, Label } from "@progress/kendo-vue-labels";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  CardSubtitle,
  CardTitle,
  Drawer,
  DrawerContent,
  DrawerItem,
} from "@progress/kendo-vue-layout";
import { FontIcon, SvgIcon } from "@progress/kendo-vue-common";
import { Grid } from "@progress/kendo-vue-grid";
import { DatePicker } from "@progress/kendo-vue-dateinputs";

// import '@progress/kendo-theme-material/dist/all.css';
// import "../src/assets/css/feather-ui.css";
import "../src/assets/css/feather-ks.css";
import "../src/assets/css/feather-k-override.css";

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup(async (app) => {
  app.component("AppBar", AppBar);
  app.component("AppBarSection", AppBarSection);
  app.component("AppBarSpacer", AppBarSpacer);
  app.component("AutoComplete", AutoComplete);
  app.component("Button", Button);
  app.component("ButtonGroup", ButtonGroup);
  app.component("Card", Card);
  app.component("CardActions", CardActions);
  app.component("CardBody", CardBody);
  app.component("CardFooter", CardFooter);
  app.component("CardHeader", CardHeader);
  app.component("CardImage", CardImage);
  app.component("CardSubtitle", CardSubtitle);
  app.component("CardTitle", CardTitle);
  app.component("Checkbox", Checkbox);
  app.component("Chip", Chip);
  app.component("ChipList", ChipList);
  app.component("ColorGradient", ColorGradient);
  app.component("ColorPalette", ColorPalette);
  app.component("ColorPicker", ColorPicker);
  app.component("ComboBox", ComboBox);
  app.component("DatePicker", DatePicker);
  app.component("Drawer", Drawer);
  app.component("DrawerContent", DrawerContent);
  app.component("DrawerItem", DrawerItem);
  app.component("DropDownButton", DropDownButton);
  app.component("DropDownList", DropDownList);
  app.component("DropDownTree", DropDownTree);
  app.component("FloatingActionButton", FloatingActionButton);
  app.component("FontIcon", FontIcon);
  app.component("Grid", Grid);
  app.component("Hint", Hint);
  app.component("Label", Label);
  app.component("MaskedTextBox", MaskedTextBox);
  app.component("MultiSelect", MultiSelect);
  app.component("NumericTextBox", NumericTextBox);
  app.component("RangeSlider", RangeSlider);
  app.component("RadioButton", RadioButton);
  app.component("RadioGroup", RadioGroup);
  app.component("Signature", Signature);
  app.component("Slider", Slider);
  app.component("SplitButton", SplitButton);
  app.component("SvgIcon", SvgIcon);
  app.component("Switch", Switch);
  app.component("TextArea", TextArea);
  app.component("TextBox", TextBox);
  app.component("Toolbar", Toolbar);
});
export const tags = ["autodocs"];
