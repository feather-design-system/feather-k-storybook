import { Meta, StoryObj } from '@storybook/vue3';
import { Menu } from '@progress/kendo-vue-layout';

const meta: Meta<typeof Menu> = {
  title: 'Feather K/Menu',
  component: Menu,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>The Menu component is used to display a list of navigational links.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/menu/" target="_blank">Menu Documentation</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/MenuProps/" target="_blank">Menu API</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-menu</legend>
              <pre>
                &lt;Menu
                  :items=&quot;[{ text: 'Home' }, { text: 'About' }, { text: 'Contact' }]&quot;
                  :vertical=&quot;true&quot;
                  :style=&quot;{ width: '200px' }&quot;
                /&gt;
              </pre>
            </fieldset>
          </div>`
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    items: {
      control: 'object',
      description: 'An array of menu items to display.'
    },
    vertical: {
      control: 'boolean',
      description: 'If true, the menu will be displayed vertically.'
    },
    style: {
      control: 'object',
      description: 'CSS styles to apply to the menu.'
    }
  },
  args: {
    items: [
      { id: 'home', text: 'Home' },
      { id: 'about', text: 'About' },
      { id: 'contact', text: 'Contact' }
    ],
    vertical: true,
    style: { width: '200px' }
  },
};