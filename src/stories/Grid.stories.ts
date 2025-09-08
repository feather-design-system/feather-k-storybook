import { ArgTypes, Args, Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import { Grid } from "@progress/kendo-vue-grid";
import { filterBy } from "@progress/kendo-data-query";

import { process } from "@progress/kendo-data-query";
import { useGridKeyboardNavigation } from "../composables/grid-keyboard-navigation";

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
  { field: "npi", title: "NPI", width: 100, sortable: true, filterable: false },
  {
    field: "name",
    title: "Name",
    width: 150,
    sortable: true,
    filterable: true,
  },
  { field: "specialty", title: "Specialty", width: 100, sortable: false, filterable: true },
  {
    field: "location",
    title: "Location",
    width: 150,
    sortable: false,
    filterable: true,
  },
  {
    field: "open",
    title: "New Patients?",
    width: 135,
    sortable: true,
    filterable: false,
  },
];

const meta: Meta<typeof Grid> = {
  title: "Feather K/Grid",
  component: Grid,
  // #region autodocs
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
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-grid</legend>
              <pre>
                &lt;Grid
                  :dataItems="[
                    { id: 1, name: 'Jane Doe', age: 30, smoker: true, city: 'New York' },
                    { id: 2, name: 'Tom Brown', age: 45, smoker: false, city: 'Paris' },
                    { id: 3, name: 'Linda Brown', age: 35, smoker: true, city: 'Belfast' },
                  ]"
                  :columns="[
                    { field: 'name', title: 'Name', width: '200px' },
                    { field: 'age', title: 'Age', width: '100px' },
                    { field: 'smoker', title: 'Smoker', width: '100px' },
                    { field: 'city', title: 'City', width: '200px' },
                  ]"
                  :resizable="true"
                  :reorderable="true"
                  :sortable="true"
                  :sort="[{ field: 'name', dir: 'asc' }]"
                  @columnreorder="() => console.log('invoke local columnReorder fn')"
                  @sortchange="() => console.log('invoke local sortChange fn')"
                /&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  //#endregion autodocs
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

export const BasicGrid: Story = {
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
    components: { Grid },
    data() {
      return {
        providers,
        // local copy so headerClassName can be mutated per-story
        localColumns: (args.columns || columns).map((c: any) => ({ ...c })),
        sort: [{ field: "npi", dir: "asc" }],
        filter: undefined,
      };
    },
    computed: {
      processedItems() {
        const state = {
          sort: this.sort,
          filter: this.filter,
        };
        const result = process(this.providers, state as any) as any;
        if (result && result.data) return result.data;
        const arr = Array.isArray(result) ? result : this.providers.slice();
        return arr;
      },
      columns() {
        return this.localColumns;
      },
    },
    methods: {
      columnReorder(options: any) {
        this.localColumns = options.columns;
      },
      sortChangeHandler(e: any) {
        this.sort = e.sort;
      },
      filterChange(e: any) {
        this.filter = e.filter;

        // collect filtered fields and set headerClassName 'active'
        const fields = new Set<string>();
        const collect = (f: any) => {
          if (!f) return;
          if (Array.isArray(f.filters)) {
            f.filters.forEach((ff: any) => collect(ff));
          } else if (f.field) {
            fields.add(String(f.field));
          }
        };
        collect(this.filter);

        this.localColumns = this.localColumns.map((col: any) => {
          const has = col.field && fields.has(col.field);
          return { ...col, headerClassName: has ? "active" : "" };
        });
      },
    },
    setup() {
      return { args };
    },
    template: `
      <Grid
        ref="grid"
        :dataItems="processedItems"
        :filter="filter"
        @filterchange="filterChange"
        :column-menu="true"
        :columns="columns"
        :resizable="args.resizable"
        :reorderable="args.reorderable"
        @columnreorder="columnReorder"
        :sortable="args.sortable"
        :sort="sort"
        @sortchange="sortChangeHandler"
        >
        </Grid>
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
        return memberColumns;
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

export const RowNavigation: Story = {
  argTypes: {
    ...BasicGrid.argTypes,
  },
  args: {
    ...BasicGrid.args,
  },
  render: (args) => ({
    components: { Grid },
    setup() {
      // create a ref for the Grid component instance and wire the keyboard navigation composable
      const refGridNav = ref(null);
      const { handleGridKeyDown, handleSortChange } = useGridKeyboardNavigation(refGridNav);
      return { args, refGridNav, handleGridKeyDown, handleSortChange };
    },
    data() {
      return {
        selectedKey: null,
        take: 10,
        skip: 0,
        sort: [{ field: "npi", dir: "asc" }],
        filter: undefined,
        total: 0,
        // make a local copy of columns so we can mutate headerClassName per-instance
        localColumns: columns.map((c) => ({ ...c })),
      };
    },
    computed: {
      providers() {
        return providers;
      },
      columns() {
        return this.localColumns;
      },
      processedItems() {
        // Use Kendo process to apply filter, sort and paging
        const state = {
          take: this.take,
          skip: this.skip,
          sort: this.sort,
          filter: this.filter,
        };
        const result = process(this.providers, state as any) as any;
        // process returns { data, total }
        if (result && result.data) {
          this.total = typeof result.total === "number" ? result.total : result.data.length;
          return result.data;
        }
        // fallback
        const arr = Array.isArray(result) ? result : this.providers.slice();
        this.total = arr.length;
        return arr.slice(this.skip, this.skip + this.take);
      },
    },
    methods: {
      rowClick(e: any) {
        this.selectedKey = e.dataItem.npi;
      },
      filterChange(e: any) {
        // update local filter state so processedItems applies the filter
        this.filter = e.filter;
        // reset paging when filter changes
        this.skip = 0;

        // Determine which fields are filtered (CompositeFilterDescriptor can be nested)
        const fields = new Set<string>();
        const collect = (f: any) => {
          if (!f) return;
          if (Array.isArray(f.filters)) {
            f.filters.forEach((ff: any) => collect(ff));
          } else if (f.field) {
            fields.add(String(f.field));
          }
        };
        collect(this.filter);

        // Apply headerClassName 'active' to columns that have an active filter
        this.localColumns = this.localColumns.map((col: any) => {
          const has = col.field && fields.has(col.field);
          return { ...col, headerClassName: has ? "active" : "" };
        });
      },
      sortChangeHandler(e: any) {
        // update local sort state when composable forwards legitimate sort changes
        this.sort = e.sort;
        // reset paging when sort changes
        this.skip = 0;
      },
    },
    mounted() {},
    unmounted() {},
    template: `
    <div @keydown="handleGridKeyDown" tabindex="0">
      <Grid
        ref="refGridNav"
  :dataItems="processedItems"
  :filter="filter"
  @filterchange="filterChange"
        :column-menu="true"
        :columns="columns"
        :sort="sort"
        :sortable="args.sortable"
        :navigatable="false"
        @sortchange="(e) => handleSortChange ? handleSortChange(e, sortChangeHandler) : sortChangeHandler(e)"
        @keydown="handleGridKeyDown"
        @rowclick="rowClick"
      >
      </Grid>
    </div>
    `,
  }),
};
