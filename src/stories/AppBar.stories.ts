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
    <div class="storybook-demo" style="position: absolute; top: 0; left: 0;">
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
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a" target="_blank">HTML Anchor Tag</a></li>
            <li @click="console.log('LI clicked')" @keydown="console.log('keyboard trigger')" tabindex="0">LI Click Event</li>
          </nav>
        </AppBarSection>
      </AppBar>
      <div class="content" style="width: 800px; padding: 4rem; margin: auto 8em; ">
        <h2>Content</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis risus non convallis finibus. Pellentesque ullamcorper dapibus elit. Morbi et lectus facilisis, suscipit libero quis, finibus libero. Aenean euismod cursus pulvinar. Praesent accumsan porta scelerisque. Sed aliquet porta feugiat. Mauris facilisis ex ac dignissim laoreet. In accumsan, tortor vitae facilisis pellentesque, tellus sapien accumsan mi, et eleifend felis ligula at est. Cras tempus ipsum sit amet arcu dictum, non elementum nulla rhoncus. Donec purus nibh, aliquam id risus ac, varius tincidunt magna. Nam justo justo, pharetra eget scelerisque a, tempor id neque. Maecenas tincidunt consectetur ornare. Nulla mollis facilisis turpis, ut aliquam nulla molestie id. Praesent feugiat, magna vitae vestibulum fringilla, magna erat hendrerit nunc, nec iaculis lorem ante eget nisl. Maecenas condimentum hendrerit ullamcorper. Vivamus gravida viverra ante non semper.
        </p>
        <p>
          Quisque consectetur libero non tortor pretium sagittis. Pellentesque convallis vel massa et sodales. Donec placerat mi ut massa iaculis, a sollicitudin lorem dictum. Integer convallis, orci in viverra fermentum, augue magna rutrum felis, ac viverra velit libero vitae enim. Morbi risus lorem, semper at lorem ac, luctus bibendum nulla. Donec vitae nisl at sapien vestibulum eleifend eget et ipsum. Nullam fermentum leo at tellus consequat volutpat. Maecenas dictum id tellus sed commodo. Pellentesque commodo maximus felis. Fusce volutpat euismod nunc, vel hendrerit tortor consequat sollicitudin. Nullam faucibus enim lobortis, ullamcorper dui ac, convallis turpis.
        </p>

        <p>
          Aliquam venenatis diam quis aliquet vestibulum. Mauris efficitur fringilla consequat. Quisque consectetur, lectus sit amet rutrum pulvinar, eros justo blandit orci, at vehicula elit lorem sit amet tortor. Integer ac tortor id felis imperdiet eleifend. Vestibulum leo nulla, tincidunt eu imperdiet ut, lacinia in nunc. Suspendisse quis lorem ut enim congue dapibus sagittis at neque. Quisque mollis ligula quis posuere molestie. In commodo odio nec nibh fringilla, lobortis placerat justo congue. Cras auctor diam dignissim, consequat nunc accumsan, interdum erat.
        </p>

        <p>
          Vivamus fringilla, nibh ut hendrerit sodales, enim nisi interdum diam, id condimentum lorem elit nec massa. Quisque a ligula nec orci hendrerit maximus. Ut finibus, elit ut sollicitudin gravida, enim nibh mollis est, sit amet auctor ante nulla vitae magna. Phasellus nec dapibus arcu. Proin hendrerit nunc quis leo viverra fringilla. Quisque eu enim nec quam aliquam mattis quis quis leo. Suspendisse tempor tristique turpis vitae faucibus. Nullam at gravida mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed nisl quis leo gravida interdum. Donec commodo lectus ex, sit amet facilisis metus vehicula non. Nam interdum finibus ante. Sed sollicitudin bibendum massa at egestas. Maecenas non arcu vitae erat hendrerit dictum.
        </p>
        <p>
          Pellentesque at fermentum nunc. Mauris viverra velit at elit varius finibus. Nullam mattis sed lacus id scelerisque. Phasellus vel turpis ex. Nullam viverra commodo tellus, a fringilla erat rhoncus nec. Nullam pharetra nisl vitae odio rhoncus, ac vestibulum turpis luctus. Sed dapibus eget elit eget mollis. Proin vitae erat nec felis laoreet sollicitudin cursus sed lorem. Proin tincidunt maximus congue.
        </p>
      </div>
    </div>
    `,
  }),
};
