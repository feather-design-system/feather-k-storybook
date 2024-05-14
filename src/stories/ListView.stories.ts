import { Meta, StoryObj } from "@storybook/vue3";
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-vue-listview";

const meta: Meta<typeof ListView> = {
  title: "Feather K/ListView",
  // title: "Feather K/ListView/ListView",
  component: ListView,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>ListView is a component that displays a list of items.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/listview/api/ListViewProps/" target="_blank">ListView API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/listview/" target="_blank">ListView Documentation</a></li>
          </ul>
        `,
      },
    },
  },
  // #endregion autodocs
};

export default meta;

type Story = StoryObj<typeof meta>;

const contacts = [
  {
    id: 1,
    name: "Jenson Delaney",
    email: "jenson.delany@mail.com",
    messagesCount: 3,
  },
  {
    id: 2,
    name: "Amaya Coffey",
    email: "amaya.coffey@mail.com",
    messagesCount: 1,
  },
  {
    id: 3,
    name: "Habib Joyce",
    email: "habib.joyce@mail.com",
    messagesCount: 5,
  },
];

export const Default: Story = {
  argTypes: {
    dataItems: {
      control: "object",
      description: "The data items to be displayed.",
    },
  },
  args: {
    dataItems: contacts,
  },
  render: (args) => ({
    components: {
      ListView,
      ListViewHeader,
      ListViewFooter,
    },
    setup() {
      return { args };
    },
    template: `
    <ListView 
      :dataItems="args.dataItems"
      item="itemSlot"
      header="headerSlot"
      footer="footerSlot"
      >
      <template v-slot:headerSlot="{ props }">
        <div>Header</div>
        <div>
          <strong>Contacts</strong>
        </div>
      </template>
      <template v-slot:itemSlot="{ props }">
        <p>
          <strong>{{props.dataItem.name}}</strong>
          <br />
          {{props.dataItem.email}} - {{props.dataItem.messagesCount}} incoming message{{props.dataItem.messagesCount > 1 ? 's' : ''}}
        </p>
      </template>
      <template v-slot:footerSlot="{ props }">
        <div>
          Footer
          <div>
            <strong>Total contacts</strong> {{args.dataItems.length}}
          </div>
          <div>
            <strong>Total messages</strong> {{args.dataItems.reduce((acc, item) => acc + item.messagesCount, 0)}}
          </div>
        </div>
      </template>
    </ListView>
    `,
  }),
};
