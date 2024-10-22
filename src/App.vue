<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { PanelBar } from "@progress/kendo-vue-layout";
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
import "./assets/css/feather-ks.css";
// import "./assets/css/feather-ks-v18-migration-test.css"
import "./assets/css/feather-k-override.css";

let dialogIsVisible = ref(false);

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
    <NotificationGroup
      :style="{
        right: 0,
        bottom: 0,
        'align-items': 'flex-start',
        flexWrap: 'wrap-reverse',
      }"
    >
      <Fade :appear="showSuccess" :transition-enter-duration="3000" :transition-exit-duration="1000">
        <Notification
          :type="{ style: 'success', icon: true }"
          :closable="true"
          @close="close('success')"
          >This demo was successfully loaded.</Notification
        >
      </Fade>
      <Fade :appear="showError" :transition-enter-duration="3000" :transition-exit-duration="1000">
        <Notification
          :type="{ style: 'error', icon: true }"
          :closable="true"
          @close="close('error')"
          >This is just a demo error.</Notification
        >
      </Fade>
    </NotificationGroup>

    <p class="instruction">
      To run storybook enter "npm run storybook:dev" from the terminal inside VS
      Code.
    </p>

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
</style>
