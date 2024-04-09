import { Meta, StoryObj } from "@storybook/vue3";
import {
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  CardSubtitle,
  CardTitle,
} from "@progress/kendo-vue-layout";
import { Button } from "@progress/kendo-vue-buttons";

const meta: Meta<typeof Card> = {
  title: "Feather K/Layout/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    type: {
      control: "select",
      options: ["default", "primary", "info", "success", "warning", "error"],
    },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    // @ts-ignore
    cardTitle: { control: "text" },
    cardSubtitle: { control: "text" },
  },
  args: {
    type: "primary",
    orientation: "horizontal",
    // @ts-ignore
    cardTitle: "Storybook Card Title",
    cardSubtitle: "A study of the impact of Storybook",
  },
  parameters: {
    title: {
      default: "Card",
    },
  },
  render: (args) => ({
    components: {
      Card,
      CardActions,
      CardBody,
      CardHeader,
      CardFooter,
      CardImage,
      CardSubtitle,
      CardTitle,
      Button,
    },
    data() {
      return {};
    },
    setup() {
      return { args };
    },
    template: `
		<Card v-bind="args">
			<CardHeader>
				<CardTitle>{{args.cardTitle}}</CardTitle>
				<CardSubtitle>{{args.cardSubtitle}}</CardSubtitle>
			</CardHeader>
			<CardImage src="../public/vite.svg"  style="height: 6rem; width: 6rem; margin: 1em;"/>
			<CardBody>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
			</CardBody>
			<CardFooter>
			<CardActions>
			<Button :themeColor="'primary'" :fillMode="'outline'">More Info</Button>
			<Button :themeColor="'primary'">Ok</Button>
			</CardActions>
			</CardFooter>
		</Card>
		`,
  }),
};

// export const ViaRender: Story = {
//   argTypes: {
//     themeColor: { control: "select", options: ["primary", "secondary"] },
//     shadow: { control: "select", options: ["small", "medium", "large"] },
//   },
//   args: {
//     themeColor: "primary",
//     shadow: "small",
//   },
//   render: (args) => ({
//     setup() {
//       return { args };
//     },
//     template: `
//     <Card v-bind="args">
//       <CardBody>
//         <p>Card Body</p>
//       </CardBody>
//     </Card>
//     `,
//   }),
// };
