import { ArgTypes, Args, Meta, StoryObj } from "@storybook/vue3-vite";
import { ref, computed } from "vue";
import { Grid, GridColumnProps } from "@progress/kendo-vue-grid";
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
  { field: "npi", title: "NPI", width: 110, sortable: true, filterable: false },
  {
    field: "name",
    title: "Name",
    width: 150,
    sortable: true,
    filterable: true,
  },
  { field: "specialty", title: "Specialty", width: 150, sortable: false, filterable: false },
  {
    field: "location",
    title: "Location",
    width: 150,
    sortable: false,
    filterable: true,
  },
  {
    field: "open",
    title: "Accepting New Patients?",
    width: 200,
    filter: "boolean",
    sortable: false,
    filterable: true,
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
  sortable: { control: "boolean" },
};

const ArgsDefault: Args = {
  resizable: true,
  sortable: true,
};

export const BasicGrid: Story = {
  argTypes: {
    ...ArgTypesDefault,
    dataItems: { control: "object" },
    columns: { control: "object" },
  },
  args: {
    ...ArgsDefault,
    dataItems: providers,
    columns: columns as GridColumnProps[],
  },
  render: (args) => ({
    components: { Grid },
    setup() {
      const providersRef = computed(() => providers);
      // const localColumns = ref((args.columns || columns).map((c: any) => ({ ...c })));
      const localColumns = ref(columns.map((c) => ({ ...c })));
      const sort = ref([{ field: "npi", dir: "asc" }]);
      const filter = ref<any>(undefined);

      const columnsRef = computed(() => localColumns.value);

      const processedItems = computed(() => {
        const state = {
          sort: sort.value,
          filter: filter.value,
        } as any;
        const result = process(providersRef.value, state) as any;
        if (result && result.data) return result.data;
        const arr = Array.isArray(result) ? result : providersRef.value.slice();
        return arr;
      });

      const sortChangeHandler = (e: any) => {
        sort.value = e.sort;
      };

      const filterChange = (e: any) => {
        filter.value = e.filter;

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
        collect(filter.value);

        localColumns.value = localColumns.value.map((col: any) => {
          const has = col.field && fields.has(col.field);
          return { ...col, headerClassName: has ? "active" : "" };
        });
      };

      return {
        args,
        columnsRef,
        processedItems,
        filter,
        filterChange,
        localColumns,
        sort,
        sortChangeHandler,
      };
    },
    template: `
      <Grid
        ref="grid"
        :dataItems="processedItems"
        :filter="filter"
        @filterchange="filterChange"
        :column-menu="true"
        :columns="columnsRef"
        :resizable="args.resizable"
        :sortable="args.sortable"
        :sort="sort"
        @sortchange="sortChangeHandler"
        >
        </Grid>
    `,
  }),
};

const members = [
  { id: 1, age: 19, name: "John Doe", sex: "male", smoker: false },
  { id: 2, age: 32, name: "Jane Doe", sex: "female", smoker: true },
  { id: 3, age: 55, name: "Steve Smith", sex: "male", smoker: false },
  { id: 4, age: 35, name: "Alice Johnson", sex: "female", smoker: true },
  { id: 5, age: 45, name: "Bob Brown", sex: "male", smoker: false },
  { id: 6, age: 30, name: "Charlie Davis", sex: "male", smoker: true },
  { id: 7, age: 12, name: "Fani Evans", sex: "female", smoker: false },
  { id: 8, age: 50, name: "William Foster", sex: "male", smoker: true },
  { id: 9, age: 32, name: "Sara Green", sex: "female", smoker: false },
  { id: 10, age: 67, name: "Harry Hill", sex: "male", smoker: true },
];

const memberColumns = [
  { field: "id", title: "ID", width: 100, filterable: false },
  { field: "age", title: "Age", width: 250, filter: "numeric" },
  { field: "name", title: "Name", width: 250 },
  { field: "sex", title: "Sex", width: 250 },
  {
    field: "smoker",
    title: "Smoker?",
    width: 250,
    filterable: true,
    filter: "boolean",
  },
];

export const ColumnFiltering: Story = {
  argTypes: {
    columnMenu: { control: "boolean" },
    filterable: { control: "boolean" },
  },
  args: {
    columnMenu: true,
    filterable: true,
  },
  render: (args) => ({
    components: { Grid },
    setup() {
      const filter = ref({ logic: "and", filters: [] } as any);
      const membersRef = computed(() => filterBy(members, filter.value));
      const filterChange = (e: any) => {
        filter.value = e.filter;
        return filterBy(members, e.filter);
      };
      return { args, filter, members: membersRef, columns: memberColumns, filterChange };
    },
    template: `
    <div>
      <Grid
        :dataItems="members"
        :filter="filter"
        :filterable="args.filterable"
        @filterchange="filterChange"
        :column-menu="args.columnMenu"
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
      const refGridNav = ref(null);
      const selectedKey = ref<string | null>(null);
      const take = ref(10);
      const skip = ref(0);
      const sort = ref([{ field: "npi", dir: "asc" }]);
      const filter = ref<any>(undefined);
      const total = ref(0);
      const localColumns = ref(columns.map((c) => ({ ...c })));

      const { handleGridKeyDown, handleSortChange } = useGridKeyboardNavigation(refGridNav);

      const providersRef = computed(() => providers);
      const columnsRef = computed(() => localColumns.value);

      const processedItems = computed(() => {
        const state = {
          take: take.value,
          skip: skip.value,
          sort: sort.value,
          filter: filter.value,
        } as any;
        const result = process(providersRef.value, state) as any;
        if (result && result.data) {
          total.value = typeof result.total === "number" ? result.total : result.data.length;
          return result.data;
        }
        const arr = Array.isArray(result) ? result : providersRef.value.slice();
        total.value = arr.length;
        return arr.slice(skip.value, skip.value + take.value);
      });

      const rowClick = (e: any) => {
        selectedKey.value = e.dataItem.npi;
      };

      const filterChange = (e: any) => {
        filter.value = e.filter;
        skip.value = 0;

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
        collect(filter.value);

        // Apply headerClassName 'active' to columns that have an active filter
        localColumns.value = localColumns.value.map((col: any) => {
          const has = col.field && fields.has(col.field);
          return { ...col, headerClassName: has ? "active" : "" };
        });
      };

      const sortChangeHandler = (e: any) => {
        sort.value = e.sort;
        skip.value = 0;
      };

      return {
        args,
        refGridNav,
        handleGridKeyDown,
        handleSortChange,
        selectedKey,
        take,
        skip,
        sort,
        filter,
        filterChange,
        total,
        localColumns,
        providersRef,
        columnsRef,
        columns: columnsRef,
        processedItems,
        rowClick,
        sortChangeHandler,
      };
    },
    template: `
      <Grid
        ref="refGridNav"
        :dataItems="processedItems"
        :filter="filter"
        @filterchange="filterChange"
        :column-menu="true"
        :columns="columns"
        :sort="sort"
        :sortable="args.sortable"
        :resizable="args.resizable"
        :navigatable="false"
        @sortchange="(e) => handleSortChange ? handleSortChange(e, sortChangeHandler) : sortChangeHandler(e)"
        @keydown="handleGridKeyDown"
        @rowclick="rowClick"
      >
      </Grid>
    `,
  }),
};
