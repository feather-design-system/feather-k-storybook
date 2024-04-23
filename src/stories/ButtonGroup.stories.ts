import { Meta, StoryObj } from '@storybook/vue3';
import { ButtonGroup } from '@progress/kendo-vue-buttons';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Feather K/Buttons/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
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
  render: (args) => ({
    data () {
      return {
        togglable: true,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <ButtonGroup v-bind="args">
      <Button :togglable="togglable">Bold</Button>
      <Button :togglable="togglable">Italic</Button>
      <Button :togglable="togglable">Underline</Button>
    </ButtonGroup>
    `,
  }),
};