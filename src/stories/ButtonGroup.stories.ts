import { Meta, StoryObj } from '@storybook/vue3';
import { ButtonGroup, Button } from '@progress/kendo-vue-buttons';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Feather K/Buttons/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<p>ButtonGroup is a container for buttons that can be grouped together.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/api/ButtonGroupProps/" target="_blank">ButtonGroup API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/buttons/buttongroup/" target="_blank">ButtonGroup Documentation</a></li>
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
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { ButtonGroup, Button },
    setup() {
      return { args };
    },
    template: `
    <div>
      <ButtonGroup v-bind="args">
        <Button :togglable="true">Bold</Button>
        <Button :togglable="true">Italic</Button>
        <Button :togglable="true">Underline</Button>
      </ButtonGroup>
    </div>
    `,
  }),
};