import { ArgTypes, Args, Meta, StoryObj } from "@storybook/vue3";
import { Grid } from "@progress/kendo-vue-grid";
import { filterBy, orderBy } from "@progress/kendo-data-query";

const providers = [
  {
    npi: "ID000001",
    name: "Michaela Quinn",
    specialty: "Family Medicine",
    location: "Colorado Springs",
    open: false,
  },
  {
    npi: "ID000002",
    name: "Maester Qyburn",
    specialty: "Pathology",
    location: "King's Landing",
    open: false,
  },
  {
    npi: "ID000003",
    name: "Beverly Crusher",
    specialty: "Oncology",
    location: "USS Enterprise-D",
    open: false,
  },
  {
    npi: "ID000004",
    name: "Peter Benton",
    specialty: "Cardiology",
    location: "Chicago",
    open: true,
  },
  {
    npi: "ID000005",
    name: "Miranda Bailey",
    specialty: "General Surgery",
    location: "Seattle",
    open: true,
  },
  {
    npi: "ID000006",
    name: "Doctor Dre",
    specialty: "Mixology",
    location: "Compton",
    open: false,
  },
];

const columns = [
  { field: "npi", title: "NPI", width: 100 },
  { field: "name", title: "Name", width: 150 },
  { field: "specialty", title: "Specialty", width: 100 },
  { field: "location", title: "Location", width: 150 },
  { field: "open", title: "New Patients?", width: 135 },
];

const meta: Meta<typeof Grid> = {
  title: "Feather K/Grid/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>Grid is a component that displays tabular data.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/grid/api/GridProps/" target="_blank">Grid API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/grid/grid/" target="_blank">Grid Documentation</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/grid/columns/column-menu/" target="_blank">Column Menu</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/grid/filtering/" target="_blank">Filter Data Types</a></li>
          </ul>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ArgTypesDefault: ArgTypes = {
  resizable: { control: "boolean" },
  reorderable: { control: "boolean" },
  sortable: { control: "boolean" },
};

const ArgsDefault: Args = {
  resizable: true,
  reorderable: true,
  sortable: true,
};

export const Default: Story = {
  argTypes: {
    ...ArgTypesDefault,
    dataItems: { control: "object" },
  },
  args: {
    ...ArgsDefault,
    dataItems: providers,
    columns: columns,
  },
  render: (args) => ({
    components: {
      Grid,
    },
    data() {
      return {
        providers,
        columns: args.columns,
        sort: [{ field: "npi", dir: "asc" }],
      };
    },
    computed: {
      sortedResult() {
        return orderBy(providers, this.sort);
      },
    },
    methods: {
      columnReorder(options: any) {
        this.columns = options.columns;
      },
      sortChangeHandler(e: any) {
        this.sort = e.sort;
      },
    },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Grid 
          ref="grid"
          :dataItems="sortedResult"
          :resizable="args.resizable"
          :reorderable="args.reorderable"
          @columnreorder="columnReorder"
          :sortable="args.sortable"
          :sort="sort"
          @sortchange="sortChangeHandler"
          :columns="columns">
        </Grid>
      </div>
    `,
  }),
};

const members = [
  { id: 1, age: "19", name: "John Doe", sex: "male", smoker: false },
  { id: 2, age: "32", name: "Jane Doe", sex: "female", smoker: true },
  { id: 3, age: "55", name: "Steve Smith", sex: "male", smoker: false },
  { id: 4, age: "35", name: "Alice Johnson", sex: "female", smoker: true },
  { id: 5, age: "45", name: "Bob Brown", sex: "male", smoker: false },
  { id: 6, age: "30", name: "Charlie Davis", sex: "male", smoker: true },
  { id: 7, age: "12", name: "Fani Evans", sex: "female", smoker: false },
  { id: 8, age: "50", name: "William Foster", sex: "male", smoker: true },
  { id: 9, age: "32", name: "Sara Green", sex: "female", smoker: false },
  { id: 10, age: "67", name: "Harry Hill", sex: "male", smoker: true },
];

const memberColumns = [
  { field: "id", title: "ID", width: 100, filterable: false },
  { field: "age", title: "Age", width: 150, filter: "numeric" },
  { field: "name", title: "Name", width: 200 },
  { field: "sex", title: "Sex", width: 100, filterable: false },
  {
    field: "smoker",
    title: "Smoker?",
    width: 135,
    filterable: true,
    filter: "boolean",
  },
];

export const ColumnFiltering: Story = {
  argTypes: {
    filterable: { control: "boolean" },
  },
  args: {
    filterable: true,
  
  },
  render: (args) => ({
    components: { Grid },
    data() {
      return {
        filter: {
          logic: "and",
          filters: [],
        },
      };
    },
    computed: {
      members() {
        return filterBy(members, this.filter);
      },
      columns() { 
        return memberColumns
      },
    },
    methods: {
      filterChange(e: any) {
        
        this.filter = e.filter;
        return filterBy(members, e.filter);
      },
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <Grid
        :dataItems="members"
        :filterable="args.filterable"
        :filter="filter"
        @filterchange="filterChange"
        :columns="columns"
      >
      </Grid>
    </div>
    `,
  }),
};
