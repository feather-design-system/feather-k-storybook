import { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@progress/kendo-vue-buttons";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-vue-layout";
import { menuIcon } from "@progress/kendo-svg-icons";

import "./content/appbar/appbar.css";

const meta: Meta<typeof AppBar> = {
  title: "Feather K/AppBar",
  // title: "Feather K/Layout/AppBar",
  component: AppBar,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>AppBar provides information and actions related to the current application screen.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/AppBarProps/" target="_blank">AppBar API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/appbar/" target="_blank">AppBar Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">` +
            `<fieldset>` +
              `<legend>fk-appbar</legend>` +
              `<pre>
                &lt;AppBar
                  position="top"
                  positionMode="fixed"
                  &gt;
                &lt;/AppBar&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">` +
            `<fieldset>` +
              `<legend>fk-appbar:title</legend>` +
              `<pre>
                &lt;AppBar
                  position="top"
                  positionMode="fixed"
                  &gt;
                  &lt;AppBarSection&gt;&lt;h1&gt;App Name&lt;/h1&gt;&lt;/AppBarSection&gt;
                &lt;/AppBar&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">` +
          `<fieldset>` +
            `<legend>fk-appbarsection:title</legend>` +
            `<pre>
              &lt;AppBarSection&gt;&lt;h1&gt;Title&lt;/h1&gt;&lt;/AppBarSection&gt;
            </pre>
          </fieldset>
        </div>` +
        `<div className="fk-emmet">` +
          `<fieldset>` +
            `<legend>fk-appbarsection:nav</legend>` +
            `<pre>
              &lt;AppBarSection&gt;
                &lt;nav&gt;
                &lt;RouterLink to="/"&gt;Home&lt;/RouterLink&gt;
                &lt;/nav&gt;
              &lt;/AppBarSection&gt;
            </pre>
          </fieldset>
        </div>`,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    position: { control: "select", options: ["top", "bottom"] },
    positionMode: { control: "select", options: ["fixed", "static", "sticky"] },
  },
  args: {
    position: "top",
    positionMode: "fixed",
  },
  parameters: {
    style: {
      width: "100%",
    },
  },
  render: (args) => ({
    components: { AppBar, AppBarSection, AppBarSpacer, Button },
    data() {
      return { menuIcon: menuIcon };
    },
    setup() {
      return { args };
    },
    template: `
    <div class="storybook-demo">
      <AppBar
        :position="args.position"
        :positionMode="args.positionMode"
        >
        <AppBarSection>
          <Button :svgIcon="menuIcon" :fillMode="'flat'" />
        </AppBarSection>
        <AppBarSection>
        <h1 class="title">Feather K App</h1>
        </AppBarSection>
        <AppBarSection>
          <nav class="flex-list">
            <div class="flex-list-item"><span>Home</span></div>
            <div class="flex-list-item"><span>Products</span></div>
            <div class="flex-list-item"><span>About</span></div>
          </nav>
        </AppBarSection>
      </AppBar>
    </div>
    `,
  }),
};
