import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-vue-notification";
import { Fade } from "@progress/kendo-vue-animation";

const meta: Meta<typeof Notification> = {
  title: "Feather K/Notification",
  component: Notification,
  // #region autodocs
  parameters: {
    docs: {
      description: {
        component:
          `<p>Notification is a visual indicator that informs the user about a specific event.</p>` +
          `<h3>Links</h3>` +
          `<ul>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/notification/api/NotificationProps/" target="_blank">Notification API</a></li>
            <li><a href="https://www.telerik.com/kendo-vue-ui/components/notification/" target="_blank">Notification Documentation</a></li>
            <li>Dark, Light and Inverse types are not supported in TypeScript.</li>
          </ul>
        `,
      },
    },
  },
  // #endregion autodocs
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error", "none"],
      mapping: {
        none: { style: "none", icon: false },
        info: { style: "info", icon: true },
        success: { style: "success", icon: true },
        warning: { style: "warning", icon: true },
        error: { style: "error", icon: true },
      },
    },
    closable: { control: "boolean" },
  },
  args: {
    // @ts-ignore
    type: "info",
    closable: true,
    message: "",
    showIcon: true,
    transitionMs: 500,
    animation: true,
    notificationGroupStyle: {
      "right": "2em",
      "top": "2em",
      "alignItems": "flex-end",
      "flexWrap": "wrap-reverse"
    },
  },
  parameters: {
    message: `text`,
    showIcon: `boolean`,
    transitionMs: `number`,
    animation: "boolean",
    NotificationGroupStyle: `object`,
  },
  render: (args) => ({
    components: { Notification, NotificationGroup, Fade },
    data() {
      return {};
    },
    setup() {
      const showNotification = ref(false);
      const autoCloseAfter = ref(5000);
      const timer = ref<ReturnType<typeof setTimeout> | null>(null);

      const clearTimer = () => {
        if (timer.value) {
          clearTimeout(timer.value);
          timer.value = null;
        }
      };

      const close = () => {
        showNotification.value = false;
        if (timer.value) {
          clearTimer();
        }
      };

      const msg = computed(() => {
        switch (args!.type!.style) {
          case "info":
            return "an Info";
          case "success":
            return "a Success";
          case "warning":
            return "a Warning";
          case "error":
            return "an Error";
          case "none":
            return "an unstyled (none)";
          default:
            return null;
        }
      });

      watchEffect(() => {
        if (args!.type!.style != undefined) {
          showNotification.value = true;
        }
      });

      watchEffect(() => {
        if (showNotification.value && !args.closable) {
          if (timer.value != null) {
            clearTimer();
          }
          timer.value = setTimeout(() => {
            if (!args.closable) showNotification.value = false;
          }, autoCloseAfter.value);
        }
      });

      onUnmounted(() => {
        if (timer.value) {
          clearTimer();
        }
      });

      onMounted(() => {});

      return { args, close, msg, showNotification, timer };
    },
    template: `
    <NotificationGroup
      :style="args.notificationGroupStyle">
      <Fade
        :appear="showNotification"
        :enter="args.animation"
        :exit="args.animation"
        :transition-enter-duration="args.transitionMs"
        :transition-exit-duration="args.transitionMs">
        <Notification
          v-if="showNotification"
          :type="{style: args.type.style, icon: args.showIcon}"
          :position="'top'"
          :closable="args.closable"
          :show="showNotification"
          @close="close"
          @click="close"
        >
          <span v-if="args.message.length > 0">{{args.message}}</span>
          <span v-else>{{msg ? 'This is ' + msg + ' message.' : 'A new message'}}</span>
        </Notification>
      </Fade>
    </NotificationGroup>
    `,
  }),
};
