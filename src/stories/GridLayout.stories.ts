import { Meta, StoryObj } from "@storybook/vue3-vite";
import { GridLayout } from "@progress/kendo-vue-layout";
import Tip from "../components/Tip.vue";

const meta: Meta<typeof GridLayout> = {
  title: "Feather K/GridLayout",
  component: GridLayout,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>GridLayout is a component that allows you to create a grid layout.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/GridLayoutProps/" target="_blank">GridLayout API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/gridlayout/" target="_blank">GridLayout Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-gridlayout</legend>
              <pre>
              &lt;GridLayout
                class=&quot;my-grid-layout&quot;
                :gap=&quot;{ rows: 8, cols: 8}&quot;
                :rows=&quot;[{ height: &apos;1fr&apos;},{ height: &apos;1fr&apos;}]&quot;
                :cols=&quot;[{ width: &apos;1fr&apos;},{ width: &apos;1fr&apos;}]&quot;
                :items=&quot;[
                { row: 1, col: 1, colSpan: 2, content: &apos;content1&apos;},
                { row: 2, col: 1, colSpan: 1, content: &apos;content2&apos;},
                { row: 2, col: 2, colSpan: 1, content: &apos;content3&apos;}]&quot;
              &gt;
                &lt;template #content1&gt;Content for &apos;content1&apos; goes here.&lt;/template&gt;
                &lt;template #content2&gt;Content for &apos;content2&apos; goes here.&lt;/template&gt;
                &lt;template #content3&gt;Content for &apos;content3&apos; goes here.&lt;/template&gt;
              &lt;/GridLayout&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof GridLayout>;

export const Default: Story = {
  argTypes: {
    gap: {
      control: { type: "object" },
    },
    rows: {
      control: { type: "object" },
    },
    cols: {
      control: { type: "object" },
    },
    items: {
      control: { type: "object" },
    },
  },
  args: {
    gap: { cols: 8, rows: 8 },
    rows: [{ height: "1fr" }, { height: "1fr" }, { height: "1fr" }],
    cols: [
      { width: "1fr" },
      { width: "1fr" },
      { width: "1fr" },
      { width: "1fr" },
      { width: "1fr" },
      { width: "1fr" },
    ],
    items: [
      { row: 1, col: 1, colSpan: 3, content: "content1" },
      { row: 1, col: 4, colSpan: 3, content: "content2" },
      { row: 2, col: 2, colSpan: 2, content: "content3" },
      { row: 2, col: 4, colSpan: 2, content: "content4" },
      { row: 3, col: 1, colSpan: 3, content: "content5" },
      { row: 3, col: 4, colSpan: 3, content: "content6" },
      { row: 2, col: 1, content: "imgLeft" },
      { row: 2, col: 6, content: "imgRight" },
    ],
  },
  render: (args) => ({
    components: { GridLayout, Tip },
    setup() {
      const gridTips = [
        {
          tip: 1,
          title: "What is the 'gap' attribute?",
          content:
            "The gap attribute is used to set the gap (in pixels) between the rows and columns of the grid.",
        },
        {
          tip: 2,
          title: "The 'rows' Attribute",
          content:
            "You set the height of the cell by setting the height of the row. The height of the row can be set in pixels or as a percentage of the grid height.",
        },
        {
          tip: 3,
          title: "The 'cols' Means Columns",
          content:
            "You set the width of the cell by setting the width in the cols attribute. The width of the column can be set in pixels or as a percentage of the grid width.",
        },
        {
          tip: 4,
          title: "The 'items' Attribute",
          content:
            "The items attribute is used to define the grid cells. Each cell is defined by the row and column it occupies, the number of columns it spans, and the content id.",
        },
        {
          tip: 5,
          title: "The 'template' Tag",
          content:
            "The template tag is used to define the content of the grid cell. You can define the content of the cell using the template tag.",
        },
        {
          tip: 6,
          title: "The 'content' Attribute",
          content:
            "The content attribute is used to define the content of the grid cell. You can define the content of the cell using the content attribute.",
        },
      ];

      return { args, gridTips };
    },
    template: `
    <div>
      <h1 style="width: 80%; margin: auto;">GridLayout</h1>
      <div style="margin: auto; width: 80%;">
        <GridLayout v-bind="args">
          <template #content1><Tip :item="gridTips[0]" /></template>
          <template #content2><Tip :item="gridTips[1]" /></template>
          <template #content3><Tip :item="gridTips[2]" /></template>
          <template #content4><Tip :item="gridTips[3]" /></template>
          <template #content5><Tip :item="gridTips[4]" /></template>
          <template #content6><Tip :item="gridTips[5]" /></template>
          <template #imgRight>
            <div style="height: 100%; width: 100%; display: flex; justify-content: center;">
              <img src="/sb.svg" alt="Storybook image" style="width: 100%; height: auto; object-fit: contain;"/>
            </div>
          </template>
          <template #imgLeft>
            <div style="height: 100%; width: 100%; display: flex; justify-content: center;">
              <img src="/kendo.png" alt="Kendo image"  style="width: 100%; height: auto; object-fit: contain;"/>
            </div>
          </template>
        </GridLayout>
      </div>
    </div>
    `,
  }),
};
