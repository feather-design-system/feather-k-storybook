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
    animation: false,
		position: "start",
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
					<DrawerContent>
						<h2>Drawer Content</h2>
						<p>Drawer content does not appear within drawer???</p>
					</DrawerContent>
					<DrawerItem :text="'DrawerItem not within drawer???'">
					</DrawerItem>
					</div>
					<div style="background-color: #ccc; padding: 2em;">
					<hr />
					<h2>Notes on Content of Drawer</h2>
					<ul>
						<li>Drawer content does NOT employ slots</li>
						<li>You cannot just pass any child node (ex. TabList) within a slot and expect it to be displayed within the drawer</li>
						<li>You must use lists of DrawerContent type or DrawerItem type and pass as prop to Drawer</li>
						<li>Do not see a way to mimic Feather Drawer behavior with Tabs in its current state.</li>
						<li>Do not see a way to mimic Feather Drawer behavior with Tabs in its current state.</li>
					</ul>
					</div>
				</Drawer>
			</div>
		`,
  }),
};
