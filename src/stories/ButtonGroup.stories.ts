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