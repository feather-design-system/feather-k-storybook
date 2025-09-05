import { Meta, StoryObj } from "@storybook/vue3-vite";
import { Drawer, DrawerContent, DrawerItem } from "@progress/kendo-vue-layout";
import { Button } from "@progress/kendo-vue-buttons";
import { Window } from "@progress/kendo-vue-dialogs";

const drawerItems = [
  {
    text: "Inbox",
    icon: "k-i-inbox",
  },
  {
    text: "Starred",
    icon: "k-i-star",
  },
  {
    text: "Sent Mail",
    icon: "k-i-sent",
  },
  {
    text: "Drafts",
    icon: "k-i-drafts",
  },
  {
    text: "DrawerItem",
    icon: "k-i-drafts",
  },
];

const meta: Meta<typeof Drawer> = {
  title: "Feather K/Drawer",
  component: Drawer,
  parameters: {
    // #region autodocs
    docs: {
      description: {
        component:
          `<p>Drawer is a container for content that can be hidden or shown by the user.</p>` +
          `<h3>Installation</h3><pre><small>npm install @progress/kendo-vue-layout</small></pre>` +
          `<h3>Links</h3>` +
          `<ul>
						<li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/DrawerProps/" target="_blank">Drawer API</a></li>
						<li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/drawer/" target="_blank">Drawer Documentation</a></li>
						<li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/DrawerItemProps/" target="_blank">Drawer Items API</a></li>
					</ul>` +
          `<h3>Notes on Content of Drawer</h3>` +
          `<ul>
						<li>Drawer content does NOT employ slots</li>
						<li>You cannot just pass any child node (ex. TabList) within a slot and expect it to be displayed within the drawer</li>
						<li>You must use lists of DrawerContent type or DrawerItem type and pass as prop to Drawer</li>
						<li>Do not see a way to mimic Feather Drawer behavior with Tabs in its current state.</li>
					</ul>` +
          `<div className="fk-emmet">
					  <fieldset>
						<legend>fk-drawer</legend>
						<pre>
							&lt;Drawer
								position="end"
								mode="overlay"
								:animation="true"
								:expanded="true"
								:width="300"
								:items="[{ text: 'My Profile' },{ text: 'Settings' },{ text: 'Help' }].map((item, index) => ({ text: item.text })) "
							/&gt;
						</pre>
					  </fieldset>
					</div>` +
          `<div className="fk-emmet">
					  <fieldset>
						<legend>fk-drawer:routerview</legend>
						<pre>
							&lt;Drawer
								position="end"
								mode="overlay"
								:animation="true"
								:expanded="true"
								:width="300"&gt;
								&lt;RouterView /&gt;
							&lt;/Drawer&gt;
						</pre>
					  </fieldset>
					</div>`,
      },
    },
    // #endregion autodocs
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    expanded: { control: "boolean" },
    animation: { control: "boolean" },
    position: { control: "select", options: ["start", "end"] },
    mode: { control: "select", options: ["overlay", "push"] },
    items: { control: "object" },
  },
  args: {
    expanded: true,
    animation: true,
    position: "end",
    mode: "overlay",
    items: drawerItems,
  },
  render: (args) => ({
    components: { Drawer, DrawerContent, DrawerItem },
    setup() {
      return { args };
    },
    template: `
		<div>
			<Drawer
				:expanded="args.expanded"
				:animation="args.animation"
				:position="args.position"
				:mode="args.mode"
				:items="args.items"
				>
				</Drawer>
				<div>
					<h2>App Content</h2>
					<p>This is some content for some app.  The drawer will display when "expanded" is set to true.</p>
					<p>There is an "overlay" mode which darkens the App Content behind the Drawer and a "push" mode which moves the content to make room for the Drawer.</p>
				</div>
		</div>
		`,
  }),
};

export const DrawerInteraction: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, expanded: false },
  render: (args) => ({
    components: { Drawer, DrawerContent, DrawerItem, Button, Window },
    setup() {
      return { args };
    },
    template: `
			<div>
				<div>
					<Button @click="args.expanded = !args.expanded">Toggle Drawer</Button>
				</div>

						<Drawer
							:expanded="args.expanded"
							:animation="args.animation"
							:position="args.position"
							mode="overlay"
							:items="args.items"
							@overlayclick="args.expanded = false"

							>

							</Drawer>
						<div>
							<h2>App Content</h2>
							<p>This is some content for some app.  The drawer will display when "expanded" is set to true.</p>
							<p>There is an "overlay" mode which darkens the App Content behind the Drawer and a "push" mode which moves the content to make room for the Drawer.</p>
						</div>
				</div>
			`,
  }),

  // play: ({ canvasElement }) => {
  //   const canvas = within(canvasElement.parentElement!);
  // },
};
