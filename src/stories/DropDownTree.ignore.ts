import { Meta, StoryObj } from "@storybook/vue3";
import { DropDownTree } from "@progress/kendo-vue-dropdowns";

const meta: Meta<typeof DropDownTree> = {
  title: "Feather K/DropDownTree",
  // title: "Feather K/Dropdowns/DropDownTree",
  component: DropDownTree,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>DropDownTree is a form component that allows users to select a value from a hierarchical tree.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/api/DropDownTreeProps/" target="_blank">DropDownTree API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/dropdowntree/" target="_blank">DropDownTree Documentation</a></li>
          </ul>
        `,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const expandedState = (item: any, dataItemKey: any, expanded: any) => {
  const nextExpanded = expanded.slice();
  const itemKey = item[dataItemKey];
  const index = expanded.indexOf(itemKey);
  index === -1 ? nextExpanded.push(itemKey) : nextExpanded.splice(index, 1);

  return nextExpanded;
};

const data = [
  {
    text: "Browsers",
    id: 11,
    items: [
      { text: "Chrome", id: 12 },
      { text: "Firefox", id: 13 },
      { text: "Safari", id: 14 },
      { text: "Edge", id: 15 },
    ],
  },
  {
    text: "JavaScript Frameworks",
    id: 5,
    items: [
      { text: "Vue", id: 6 },
      { text: "React", id: 7 },
      { text: "Angular", id: 8 },
      { text: "Svelte", id: 9 },
    ],
  },
];

const dataItemKey = "id";
const subItemsField = "items";
const expandField = "expanded";
const selectField = "selected";
const textField = "text";

const fields = {
  dataItemKey,
  subItemsField,
  expandField,
  selectField,
  textField,
};

export const Default: Story = {
  argTypes: {
    dataItems: { control: "object" },
    disabled: { control: "boolean" },
  },
  args: {
    dataItems: data,
    disabled: false,
  },
  render: (args) => ({
    components: { DropDownTree },
    data() {
      return {
        fields,
        textField,
        dataItemKey,
        subItemsField,
        expandField,
        selectField,
        expanded: [data[0][dataItemKey]],
      };
    },
    methods: {
      onChange(e: any) {
        this.value = e.value;
      },
      onExpandChange(e: any) {
        console.warn("DropDownTree expand change event: ", e);
      },
    },
    setup() {
      return { args };
    },
    template: `
      <DropDownTree
        :style="{width: '40vw'}"
        v-model="value"
        :dataItems="args.dataItems"
        :textField="textField"
        :dataItemKey="'id'"
        :subItemsField="subItemsField"
        :expandField="expandField"
        :selectField="selectField"
        @expandchange="onExpandChange"
        :label="'Select a value'"
        :placeholder="'Select a value'"
        :disabled="args.disabled"
        />
        `,
  }),
};
