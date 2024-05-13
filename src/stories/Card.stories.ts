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
  title: "Feather K/Card",
  // title: "Feather K/Layout/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          `<p>Card is a container for content, actions, and images in a specific layout.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/api/CardProps/" target="_blank">Card API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/layout/card/" target="_blank">Card Documentation</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-card:full</legend>
              <pre>
                &lt;Card 
                  type="default" 
                  orientation="vertical" 
                  &gt;
                  &lt;CardHeader&gt;
                    &lt;CardTitle&gt;Title&lt;/CardTitle&gt;
                    &lt;CardSubtitle&gt;This is the subtitle.&lt;/CardSubtitle&gt;
                  &lt;/CardHeader&gt;
                  &lt;CardBody&gt;
                    &lt;p&gt;lorem&lt;/p&gt;
                  &lt;/CardBody&gt;
                  &lt;CardFooter&gt;Footer&lt;/CardFooter&gt;
                  &lt;CardActions&gt;
                    &lt;Button 
                      themeColor="primary"
                      fillMode="solid"
                      rounded="medium"
                      &gt;Ok
                    &lt;/Button&gt;
                  &lt;/CardActions&gt;
                &lt;/Card&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-card</legend>
              <pre>
                &lt;Card 
                  type="default" 
                  orientation="vertical" 
                &gt;
                &lt;/Card&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-cardheader</legend>
              <pre>
                &lt;Card 
                  type="default" 
                  orientation="vertical"
                  &gt;
                  &lt;CardHeader&gt;
                    &lt;CardTitle&gt;Title&lt;/CardTitle&gt;
                    &lt;CardSubtitle&gt;This is a subtitle. &lt;/CardSubtitle&gt;
                  &lt;/CardHeader&gt;
                &lt;/Card&gt;              
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-cardtitle</legend>
              <pre>
                &lt;CardTitle&gt;Title&lt;/CardTitle&gt;              
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-cardsubtitle</legend>
              <pre>
                &lt;CardSubtitle&gt;Subtitle&lt;/CardSubtitle&gt;              
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-cardbody</legend>
              <pre>
                &lt;CardBody&gt;
                  lorem
                &lt;/CardBody&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-cardfooter</legend>
              <pre>
              &lt;CardFooter&gt;footer goes here&lt;/CardFooter&gt;
              </pre>
            </fieldset>
          </div>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-cardactions</legend>
              <pre>
                &lt;CardActions&gt;
                  &lt;Button themeColor="primary" fillMode="solid" rounded="medium"&gt;Ok&lt;/Button&gt;
                &lt;/CardActions&gt;
              </pre>
            </fieldset>
          </div>`,
      },
    },
  },
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
			<CardImage src="./vite.svg"  style="height: 6rem; width: 6rem; margin: 1em;"/>
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
