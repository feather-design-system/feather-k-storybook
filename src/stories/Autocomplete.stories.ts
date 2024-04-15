import type { Meta, StoryObj } from "@storybook/vue3";
import { AutoComplete } from "@progress/kendo-vue-dropdowns";
import { FilterOperator, filterBy } from "@progress/kendo-data-query";

const meta: Meta<typeof AutoComplete> = {
  title: "Feather K/DropDowns/Autocomplete",
  component: AutoComplete,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Select country...",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const source = ["United States", "United Kingdom", "Germany", "France", "Japan", "Italy"];

export const Default: Story = {
  args: {
    dataItems: source,
    fillMode: "outline",
  }
}

export const Filtered: Story = {
  argTypes: {
    dataItems: { control: "object" },
    placeholder: { control: "text" },
  },
  args: {
    dataItems: source,
    placeholder: "Select country...",
  },
  parameters: {
    filterOperator: {
      default: FilterOperator.Contains,
    }
  },
  render: (args) => ({
    data: () => {
      return {
        countries: source,
        value: "",
        loading: false,
      };
    },
    setup() {
      return { args };
    },
    methods: {
      onchange(event: any) {
        this.value = event.target.value;
        this.countries = filterBy(source, {
          operator: FilterOperator.Contains,
          field: "",
          value: this.value,
          ignoreCase: true,
        });
      },
    },
    template: `
    <AutoComplete 
      :dataItems="countries" 
      @change="onchange"
      :fillMode="'outline'"
      :placeholder="args.placeholder"
      :filterOperator="args.filterOperators">
    </AutoComplete>
    `,
  }),
};
