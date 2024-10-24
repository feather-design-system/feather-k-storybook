<script setup lang="ts">
import { reactive, ref } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { GridLayout, PanelBar, StackLayout } from "@progress/kendo-vue-layout";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-vue-notification";
import { Fade } from "@progress/kendo-vue-animation";
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

import Tip from "./components/Tip.vue";
import "./assets/css/feather-ks.css";
// import "./assets/css/feather-ks-v18-migration-test.css"
import "./assets/css/feather-k-override.css";

let dialogIsVisible = ref(false);

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

// #region StackLayout


// #endregion StackLayout
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
</script>

<template>
  <main>
    <p class="instruction">
      To run storybook enter "npm run storybook:dev" from the terminal inside VS
      Code.
    </p>

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

    <StackLayout
      :gap="16"
      :orientation="'vertical'"
      >
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
</style>
