import { Meta, StoryObj } from "@storybook/vue3";
import { Drawer, DrawerContent, DrawerItem } from "@progress/kendo-vue-layout";

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
  title: "Feather K/Layout/Drawer",
  component: Drawer,
  tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					`<p>Drawer is a container for content that can be hidden or shown by the user.</p>` +
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
						<li>Do not see a way to mimic Feather Drawer behavior with Tabs in its current state.</li>
					</ul>
				`,
			},
		},
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
    expanded: false,
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
					<div>
						<h2>App Content</h2>
						<p>This is some content for some app.  The drawer will display when "expanded" is set to true.</p>
						<p>There is an "overlay" mode which darkens the App Content behind the Drawer and a "push" mode which moves the content to make room for the Drawer.</p>
					</div>
				</Drawer>
			</div>
		`,
  }),
};
