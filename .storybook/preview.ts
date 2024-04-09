import { Preview, setup } from "@storybook/vue3";

import { AutoComplete, DropDownList, MultiSelect } from "@progress/kendo-vue-dropdowns";
import {
  Button,
  ButtonGroup,
  Chip,
  ChipList,
  DropDownButton,
} from "@progress/kendo-vue-buttons";
import {
  Checkbox,
  MaskedTextBox,
  NumericTextBox,
  RadioButton,
  RadioGroup,
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
import { mapMarkerTargetIcon } from "@progress/kendo-svg-icons";

// import '@progress/kendo-theme-material/dist/all.css';
import "../src/assets/css/feather-ui.css";

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
  app.component("CardBody", CardBody);
  app.component("Checkbox", Checkbox);
  app.component("Chip", Chip);
  app.component("ChipList", ChipList);
  app.component("Drawer", Drawer);
  app.component("DrawerContent", DrawerContent);
  app.component("DrawerItem", DrawerItem);
  app.component("DropDownButton", DropDownButton);
  app.component("DropDownList", DropDownList);
  app.component("FontIcon", FontIcon);
  app.component("Hint", Hint);
  app.component("Label", Label);
  app.component("MaskedTextBox", MaskedTextBox);
  app.component("MultiSelect", MultiSelect);
  app.component("NumericTextBox", NumericTextBox);
  app.component("RadioButton", RadioButton);
  app.component("RadioGroup", RadioGroup);
  app.component("SvgIcon", SvgIcon);
  app.component("TextArea", TextArea);
  app.component("TextBox", TextBox);
  app.component("mapMarkerTargetIcon", mapMarkerTargetIcon); // NOTE: CLARIFY THIS
});
