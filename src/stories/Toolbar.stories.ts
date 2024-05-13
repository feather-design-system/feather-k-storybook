import { Meta, StoryObj } from "@storybook/vue3";
import { Toolbar, Button, ButtonGroup } from "@progress/kendo-vue-buttons";

import { boldIcon, italicIcon, underlineIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof Toolbar> = {
  title: "Feather K/Toolbar",
  // title: "Feather K/Buttons/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>Toolbar is a container for buttons that can be grouped together.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ToolbarProps/" target="_blank">Toolbar API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/toolbar/" target="_blank">Toolbar Documentation</a></li>
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
    size: { control: "select", options: ["small", "medium", "large"] },
  },
  args: {
    size: "medium",
  },
  render: (args) => ({
    components: { Toolbar, Button, ButtonGroup },
    data() {
      return { boldIcon, italicIcon, underlineIcon };
    },
    setup() {
      return { args };
    },
    template: `
    <Toolbar :size="args.size">
      <ButtonGroup>
        <Button :togglable="true" :svgIcon="boldIcon" />
        <Button :togglable="true" :svgIcon="italicIcon" />
        <Button :togglable="true" :svgIcon="underlineIcon" />
      </ButtonGroup>
    </Toolbar>
    `,
  }),
};
