import { Meta, StoryObj } from "@storybook/vue3";
import { SvgIcon } from "@progress/kendo-vue-common";
import { calendarIcon, globeIcon, mapMarkerIcon, pinIcon } from "@progress/kendo-svg-icons";

const meta: Meta<typeof SvgIcon> = {
  title: "Feather K/SvgIcon",
  // title: "Feather K/Icons/SvgIcon",
  component: SvgIcon,
  parameters: {
    docs: {
      description: {
        component:
          `<p>SvgIcon is a component that displays an SVG icon.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/icons/api/SvgIconProps/" target="_blank">SvgIcon API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/icons/svgicon/" target="_blank">SvgIcon Documentation</a></li>
            <li><a href="https://www.telerik.com/design-system/docs/foundation/iconography/svg-icons/" target="_blank">Iconography: SVG Icons</a></li>
            <li><a href="https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/" target="_blank">Icon List</a></li>
          </ul>` +
          `<div className="fk-emmet">
            <fieldset>
              <legend>fk-svgicon</legend>
              <pre>
                &lt;SvgIcon size="medium" :icon="menuIcon" /&gt;
                &lt;!-- import { SvgIcon } from "@progress/kendo-vue-common" --&gt;
                &lt;!-- import { menuIcon } from "@progress/kendo-vue-icons" --&gt;
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
    size: { control: "select", options: ["small", "medium", "large"] },
    icon: {
      control: "select",
      options: ["calendar", "globe", "map", "pin"],
      mapping: {
        calendar: calendarIcon,
        globe: globeIcon,
        pin: pinIcon,
        map: mapMarkerIcon,
      },
    },
  },
  args: {
    size: "medium",
    icon: globeIcon,
  },
};
