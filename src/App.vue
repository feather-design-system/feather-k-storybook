<script setup lang="ts">
import { reactive, ref } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { Drawer } from "@progress/kendo-vue-layout";
import { Form } from "@progress/kendo-vue-form";
import {
  GridLayout,
  PanelBar,
  StackLayout,
  Stepper,
} from "@progress/kendo-vue-layout";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-vue-notification";
import {
  Expand,
  Fade,
  Push,
  Reveal,
  Slide,
  Zoom,
} from "@progress/kendo-vue-animation";
import {
  Card,
  CardHeader,
  CardBody,
  CardSubtitle,
  CardActions,
  CardFooter,
  CardTitle,
} from "@progress/kendo-vue-layout";
import { TextBox } from "@progress/kendo-vue-inputs";
import {
  cartIcon,
  dollarIcon,
  eyeIcon,
  // homeIcon,
  mapMarkerIcon,
  trackChangesAcceptIcon,
} from "@progress/kendo-svg-icons";

import Tip from "./components/Tip.vue";
import "./assets/css/feather-ks.css";
// import "./assets/css/feather-ks-v18-migration-test.css"
import "./assets/css/feather-k-override.css";

let drawerIsVisible = ref(false);
// let drawerWidth = ref(300);

let expandVisible = ref(true);
let fadeVisible = ref(true);
let pushVisible = ref(true);
let revealVisible = ref(true);
let slideVisible = ref(true);
let zoomVisible = ref(true);

let dialogIsVisible = ref(false);

// #region Stepper
const stepperValue = ref(0);
const stepperItems = [
  { id: "1", label: "Cart", svgIcon: cartIcon },
  { id: "2", label: "Delivery Address", svgIcon: mapMarkerIcon },
  { id: "3", label: "Payment Method", svgIcon: dollarIcon },
  { id: "4", label: "Order Summary", svgIcon: eyeIcon },
  { id: "5", label: "Confirmation", svgIcon: trackChangesAcceptIcon },
];
const handleStepperChange = (e: any) => {
  stepperValue.value = e.newValue;
};

// #endregion Stepper

// #region Grid

const gridItems = [
  { row: 1, col: 1, colSpan: 3, content: "content1" },
  { row: 1, col: 4, colSpan: 3, content: "content2" },
  { row: 2, col: 2, colSpan: 2, content: "content3" },
  { row: 2, col: 4, colSpan: 2, content: "content4" },
  { row: 3, col: 1, colSpan: 3, content: "content5" },
  { row: 3, col: 4, colSpan: 3, content: "content6" },
  { row: 2, col: 1, content: "imgLeft" },
  { row: 2, col: 6, content: "imgRight" },
];
const rows = reactive([
  { height: "30%" },
  { height: "30%" },
  { height: "30%" },
]);
const cols = reactive([
  { width: "16%" },
  { width: "16%" },
  { width: "16%" },
  { width: "16%" },
  { width: "16%" },
  { width: "16%" },
]);

const tips = [
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

// #endregion Grid

const toggleDialog = () => {
  dialogIsVisible.value = !dialogIsVisible.value;
};

let showSuccess = ref(true);
let showError = ref(true);
const close = (style: string) => {
  switch (style) {
    case "success":
      showSuccess.value = false;
      break;
    case "error":
      showError.value = false;
      break;
  }
};

// const bodyWidth = computed(() => {
//   return document.body.clientWidth;
// });
// const drawerLeftValue = computed(() => {
//   return bodyWidth.value - drawerWidth.value;
// });
</script>

<template>
  <main>
    <p class="instruction">
      To run storybook enter "npm run storybook:dev" from the terminal inside VS
      Code.
    </p>

    <div class="drawer-focus-trap-demo">
      <Button
        @click="drawerIsVisible = !drawerIsVisible"
        type="button"
        fillMode="outline"
        themeColor="primary"
        rounded="medium"
        >Open Drawer
      </Button>
      <!-- <Window
        v-if="drawerIsVisible"
        :title="'Drawer Window'"
        :minimize-button="false"
        :maximize-button="false"
        :close-button="true"
        :modal="drawerIsVisible"
        :width="drawerWidth"
        :left="drawerLeftValue"
        :top="0"
        @close="drawerIsVisible = false"
      > -->
        <!-- :title="'Drawer Title'" -->
        <Drawer
          :position="'end'"
          :mode="'push'"
          :expanded="drawerIsVisible"
          :items="[
            { text: 'Item 1', icon: 'homeIcon' },
            { text: 'Item 2', icon: 'settings' },
            { text: 'Item 3', icon: 'user' },
          ]"
        />
      <!-- </Window> -->
    </div>

    <div class="wizard-demo">
      <Stepper
        :value="0"
        :items="[
          { id: 1, label: 'Step 1' },
          { id: 2, label: 'Step 2' },
        ]"
        orientation="horizontal"
        :animationDuration="500"
        @change="console.log('change')"
      />
      <Form @submit="console.log('submitted')">
        <div class="wizard-content">Components for steps here...</div>
      </Form>
    </div>

    <div class="feather-ks-padding-max"></div>

    <div class="stepper-demo">
      <Stepper
        :value="0"
        :items="[
          { id: 1, label: 'Start' },
          { id: 2, label: 'Processing' },
          { id: 3, label: 'Complete' },
        ]"
        orientation="horizontal"
        :animationDuration="500"
        @change="console.log('change')"
      />
    </div>

    <div class="feather-ks-padding-max" />

    <div class="stacklayout-demo">
      <StackLayout class="my-stack-layout" orientation="vertical" :gap="8">
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
      </StackLayout>
    </div>
    <div class="feather-ks-padding-max"></div>
    <div class="gridlayout-demo">
      <GridLayout
        class="my-grid-layout"
        :gap="{ rows: 8, cols: 8 }"
        :rows="[{ height: '1fr' }, { height: '1fr' }]"
        :cols="[{ width: '1fr' }, { width: '1fr' }]"
        :items="[
          { row: 1, col: 1, colSpan: 2, content: 'content1' },
          { row: 2, col: 1, colSpan: 1, content: 'content2' },
          { row: 2, col: 2, colSpan: 1, content: 'content3' },
        ]"
      >
        <template #content1>Content for 'content1' goes here.</template>
        <template #content2>Content for 'content2' goes here.</template>
        <template #content3>Content for 'content3' goes here.</template>
      </GridLayout>
    </div>

    <div class="feather-ks-padding-max"></div>
    <div class="animation-demo">
      <Expand
        :appear="expandVisible"
        :transition-enter-duration="1000"
        :transition-exit-duration="1000"
        :enter="true"
        :exit="true"
      >
        <Notification
          :type="{ style: 'success', icon: true }"
          :closable="true"
          @close="expandVisible = !expandVisible"
          >This is an EXPAND demo notification.</Notification
        >
      </Expand>

      <Fade
        :appear="fadeVisible"
        :transition-enter-duration="3000"
        :transition-exit-duration="1000"
        :enter="true"
        :exit="true"
      >
        <Notification
          :type="{ style: 'warning', icon: true }"
          :closable="true"
          @close="fadeVisible = !fadeVisible"
          >This is a FADE demo notification.</Notification
        >
      </Fade>
      <Push
        :appear="pushVisible"
        :transition-enter-duration="1000"
        :transition-exit-duration="1000"
        :enter="true"
        :exit="true"
      >
        <Notification
          :type="{ style: 'error', icon: true }"
          :closable="true"
          @close="pushVisible = !pushVisible"
          >This is a PUSH demo notification.</Notification
        >
      </Push>

      <Reveal
        :appear="revealVisible"
        :transition-enter-duration="1000"
        :transition-exit-duration="1000"
        :enter="true"
        :exit="true"
      >
        <Notification
          :type="{ style: 'none', icon: true }"
          :closable="true"
          @close="revealVisible = !revealVisible"
          >This is a REVEAL demo notification.</Notification
        >
      </Reveal>

      <Slide
        :appear="slideVisible"
        :transition-enter-duration="2000"
        :transition-exit-duration="1000"
        :enter="true"
        :exit="true"
      >
        <Notification
          :type="{ style: 'none', icon: true }"
          :closable="true"
          @close="slideVisible = !slideVisible"
          >This is a SLIDE demo notification.</Notification
        >
      </Slide>

      <Zoom
        :appear="zoomVisible"
        :transition-enter-duration="2000"
        :transition-exit-duration="2000"
        :enter="true"
        :exit="true"
      >
        <Notification
          :type="{ style: 'info', icon: true }"
          :closable="true"
          @close="zoomVisible = !zoomVisible"
          >This is a ZOOM demo notification.</Notification
        >
      </Zoom>
    </div>

    <div class="feather-ks-padding-max"></div>

    <Zoom
      :appear="true"
      :transition-enter-duration="500"
      :transition-exit-duration="500"
      :enter="true"
      :exit="true"
    >
      <GridLayout
        class="grid-layout-demo"
        :gap="{ rows: 8, cols: 8 }"
        :rows="[{ height: '1fr' }, { height: '1fr' }, { height: '1fr' }]"
        :cols="[{ width: '1fr' }, { width: '1fr' }, { width: '1fr' }]"
        :items="[
          { row: 1, col: 1, colSpan: 3, content: 'content1' },
          { row: 2, col: 1, colSpan: 2, content: 'content2' },
          { row: 2, col: 3, rowSpan: 1, content: 'content3' },
          { row: 3, col: 1, colSpan: 1, content: 'imgLeft' },
          { row: 3, col: 2, colSpan: 1, content: 'content4' },
          { row: 3, col: 3, colSpan: 1, content: 'content5' },
        ]"
      >
        <template #content1
          >Etiam consectetur felis sed mauris porta, quis convallis neque
          consectetur. Duis ornare sed sapien non elementum. Phasellus elementum
          ut quam in maximus. Curabitur porttitor elementum tellus vel pharetra.
          Sed pulvinar mi augue, vel auctor neque rutrum non. Proin iaculis,
          quam eget facilisis consectetur, felis lectus tincidunt metus, ut
          aliquam libero tellus sit amet justo. Etiam mollis erat quis consequat
          imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Suspendisse at auctor nulla. Sed ut
          sollicitudin dolor. Sed tempor nunc a arcu volutpat, ut maximus arcu
          molestie. Nunc tellus magna, venenatis sed dapibus nec, egestas quis
          lectus.
        </template>
        <template #content2
          >In hac habitasse platea dictumst. Proin condimentum eget massa non
          hendrerit. Sed eget lectus blandit, venenatis ex quis, lacinia leo.
          Morbi pharetra in felis non tincidunt. Duis sit amet eleifend nunc.
          Cras libero massa, tincidunt a mauris vel, cursus facilisis velit.
          Morbi accumsan non quam ut ultrices.</template
        >
        <template #content3
          >Pellentesque condimentum, mi nec scelerisque rutrum, diam nunc
          volutpat ipsum, nec auctor metus magna vitae nisi. Vivamus mattis, sem
          quis aliquet ultricies, odio risus hendrerit odio, nec condimentum ex
          massa ornare magna.</template
        >
        <template #content4
          >Sed eget lectus blandit, venenatis ex quis, lacinia leo. Morbi
          pharetra in felis non tincidunt. Duis sit amet eleifend
          nunc.</template
        >
        <template #imgLeft>
          <div class="image-container">
            <img
              src="/vite.svg"
              alt="Vite"
              :style="{ height: '8em', width: 'auto' }"
            />
          </div>
        </template>
        <template #content5
          >Nunc quis lectus nunc. Nunc sodales tortor ac nisl dictum, in blandit
          lorem faucibus. Sed posuere ipsum et ipsum consectetur vestibulum.
          Aliquam ornare tincidunt leo, eget vehicula turpis vulputate quis.
          Integer porta hendrerit odio sed euismod.</template
        >
      </GridLayout>
    </Zoom>

    <div class="feather-ks-padding-max"></div>

    <NotificationGroup
      :style="{
        right: 0,
        bottom: 0,
        'align-items': 'flex-start',
        flexWrap: 'wrap-reverse',
      }"
    >
      <Fade
        :appear="showSuccess"
        :transition-enter-duration="3000"
        :transition-exit-duration="1000"
      >
        <Notification
          :type="{ style: 'success', icon: true }"
          :closable="true"
          @close="close('success')"
          >This demo was successfully loaded.</Notification
        >
      </Fade>
      <Fade
        :appear="showError"
        :transition-enter-duration="3000"
        :transition-exit-duration="1000"
      >
        <Notification
          :type="{ style: 'error', icon: true }"
          :closable="true"
          @close="close('error')"
          >This is just a demo error.</Notification
        >
      </Fade>
    </NotificationGroup>

    <div class="stepper-demo-wrapper">
      <Button
        type="button"
        fillMode="solid"
        themeColor="primary"
        rounded="medium"
        @click="
          stepperValue < stepperItems.length - 1
            ? stepperValue++
            : (stepperValue = 0)
        "
      >
        {{
          stepperValue === stepperItems.length - 1
            ? "Continue Shopping"
            : "Next Step"
        }}
      </Button>
      <Stepper
        :value="stepperValue"
        :items="stepperItems"
        @change="handleStepperChange"
      />
    </div>

    <StackLayout :gap="16" :orientation="'horizontal'">
      <div>Content 1</div>
      <div>Content 2</div>
      <div>Content 3</div>
    </StackLayout>

    <GridLayout
      :gap="{ rows: 16, cols: 16 }"
      :rows="rows"
      :cols="cols"
      :items="gridItems"
    >
      <template #content1><Tip :item="tips[0]"></Tip></template>
      <template #content2><Tip :item="tips[1]" /></template>
      <template #content3><Tip :item="tips[2]" /></template>
      <template #content4><Tip :item="tips[3]" /></template>
      <template #content5><Tip :item="tips[4]" /></template>
      <template #content6><Tip :item="tips[5]" /></template>
      <template #imgLeft>
        <div class="image-container">
          <img src="/vite.svg" alt="Vite" />
        </div>
      </template>
      <template #imgRight>
        <div class="image-container">
          <img src="/sb.svg" alt="Storybook" />
        </div>
      </template>
    </GridLayout>

    <div class="feather-k-page-title"></div>

    <div class="feather-ks-page-title">
      <h2>Page Title</h2>
      <span>Some Text</span>
    </div>

    <Dialog
      v-if="dialogIsVisible"
      title="One more dialog"
      class="my-dialog"
      :modal="true"
      @close="toggleDialog"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nisi
      officiis esse illum animi quo sunt repudiandae asperiores perferendis
      accusamus distinctio, nemo aliquam cupiditate aliquid. Suscipit sint
      sapiente optio voluptas?
      <DialogActionsBar>
        <Button
          type="button"
          fillMode="solid"
          themeColor="primary"
          rounded="medium"
          @click="toggleDialog"
          >Ok
        </Button>
      </DialogActionsBar>
    </Dialog>

    <div class="feather-ks-padding-l">content</div>

    <div class="feather-ks-padding-l">
      <Button
        @click="toggleDialog"
        type="button"
        fillMode="outline"
        themeColor="primary"
        rounded="medium"
        >Dialog
      </Button>
    </div>

    <div class="feather-ks-padding-l">
      <ComboBox
        :dataItems="['Baseball', 'Basketball', 'Football', 'Golf', 'Tennis']"
        label="Favorite sport"
        fillMode="outline"
        rounded="medium"
        size="medium"
      />
      <TextBox
        class="patient-search"
        label="Patient Search"
        placeholder="Enter patient name"
        fillMode="outline"
        rounded="medium"
        size="medium"
      />
    </div>
    <div class="feather-ks-padding-l">
      <div class="buttons">
        <TextBox
          label="Patient Search"
          placeholder="Search for patient"
          fillMode="outline"
          rounded="medium"
          size="medium"
        />

        <ComboBox
          :dataItems="['Baseball', 'Basketball', 'Football', 'Golf', 'Tennis']"
          label="Favorite Sport"
          fillMode="outline"
          rounded="medium"
          size="medium"
        />
      </div>
      <div class="feather-ks-padding-l">
        <Button
          type="submit"
          fillMode="solid"
          themeColor="primary"
          rounded="medium"
        >
          Primary
        </Button>
        <Button
          @click="console.log('clicked')"
          type="button"
          fillMode="outline"
          themeColor="primary"
          rounded="medium"
          >Secondary
        </Button>
        <Button
          @click="console.log('clicked')"
          type="button"
          fillMode="flat"
          themeColor="primary"
          rounded="medium"
          >Text
        </Button>
      </div>

      <div class="feather-ks-padding-l">
        <Card
          type="default"
          orientation="vertical"
          :style="{ 'max-width': '50em' }"
        >
          <CardHeader>
            <CardTitle>A new Card</CardTitle>
            <CardSubtitle>This is the subtitle.</CardSubtitle>
          </CardHeader>
          <CardBody>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
              dolorem rerum nesciunt quos dolores tempore doloribus placeat,
              voluptate commodi qui error perferendis quidem reprehenderit
              aperiam consequatur minima porro voluptatum blanditiis?
            </p>
          </CardBody>
          <CardFooter>Footer</CardFooter>
          <CardActions>
            <Button themeColor="primary" fillMode="solid" rounded="medium"
              >Ok
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
    <div>
      <div class="feather-ks-padding-l">
        <PanelBar
          :expandMode="'single'"
          :items="[
            { title: 'Item 1', expanded: true, content: 'content-1' },
            { title: 'Item 2', content: 'content-2' },
            { title: 'Item 3', content: 'content-3' },
          ]"
        >
          <template #content-1><h2>Content 1</h2></template>
          <template #content-2><h2>Content 2</h2></template>
          <template #content-3
            ><h2>Content 3</h2>
            This is content for Item 3</template
          >
        </PanelBar>
      </div>
    </div>
  </main>
</template>

<style>
/* html {
  margin: 0px;
  padding: 0px;
} */
body {
  background-color: azure;
  margin: 0px;
  padding: 0px;
  main {
    width: 1128px;
    margin: 0 auto;
    button {
      margin: 0 0.5em;
    }
    .my-dialog {
      .k-dialog {
        max-width: 20rem;
      }
    }
  }
}
</style>
<style scoped>
div.grid-layout-demo {
  color: purple;
}
.animation-demo {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  width: fit-content;
  justify-content: flex-start;
}
.fade-demo {
  position: absolute;
  top: 5em;
  left: 5em;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: flex-start;
}
.instruction {
  font-size: 2em;
  color: #444ffe;
}
.patient-search {
  width: 30em;
}
.grid-content {
  padding: 0.5em;
  background-color: #444ffe;
}
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
.stepper-demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: flex-start;
}
</style>
