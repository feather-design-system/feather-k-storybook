<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@progress/kendo-vue-buttons";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
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
</script>

<template>
  <header class="fk-container-page-title">
    <h3>Page Title</h3>
    <span>Some Text</span>
  </header>

  <div class="fk-container-standard">content</div>

  <div class="fk-container-standard">
    <Button
      @click="toggleDialog"
      type="button"
      fillMode="outline"
      themeColor="primary"
      rounded="medium"
      >Dialog
    </Button>
    <Dialog v-if="dialogIsVisible" @close="toggleDialog" title="Dialog Title">
      Dialog Content
      <DialogActionsBar>
        <Button 
          type="button" 
          fillMode="solid" 
          themeColor="primary" 
          rounded="medium"
          @click="toggleDialog">
          Ok
        </Button>
        <Button 
          @click="toggleDialog" 
          type="button" 
          fillMode="outline" 
          themeColor="primary" 
          rounded="medium"
          >Cancel
        </Button>
      </DialogActionsBar>
    </Dialog>
  </div>

  <div class="fk-container-standard">
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
  <div class="fk-container-standard">
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
    <p class="instruction">
      To run storybook enter "npm run storybook" from the terminal inside VS
      Code.
    </p>

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
          voluptate commodi qui error perferendis quidem reprehenderit aperiam
          consequatur minima porro voluptatum blanditiis?
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
</template>

<style>
html {
  margin: 0px;
  padding: 0px;
}
body {
  background-color: azure;
  margin: 0px;
  padding: 0px;
}

/* .fk-container-page-title {
  margin: 48px 24px 24px;
  max-width: fit-content;
  border: 1px dashed green;
} */
/* .fk-container-standard {
  margin: 24px;
  padding: 8px 0 8px;
} */
</style>
<style scoped>
/* button {
  margin: 0.5em;
} */
.buttons {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: flex-start;
}
.instruction {
  font-size: 1.5em;
}
.patient-search {
  width: 30em;
}
</style>
