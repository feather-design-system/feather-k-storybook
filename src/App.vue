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
  <main>
    <div class="feather-ks-page-title">
      <h2>Page Title</h2>
      <span>Some Text</span>
    </div>

    <Dialog v-if="dialogIsVisible"
      title="Dialog Title"
      class="my-dialog"
      @close="toggleDialog" 
      >lorem
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
      <!-- <Dialog v-if="dialogIsVisible" @close="toggleDialog" title="Dialog Title">
      Dialog Content
      <DialogActionsBar>
        <Button
          type="button"
          fillMode="solid"
          themeColor="primary"
          rounded="medium"
          @click="toggleDialog"
        >
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
    </Dialog> -->
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
    .my-dialog {
      .k-dialog {
        max-width: 20rem;
      }
    }
  }
  /* .k-actions.k-dialog-actions {
    .k-button.k-button-solid-primary {
      background-color: green;
    }
  } */
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
  font-size: 1.5em;
}
.patient-search {
  width: 30em;
}
</style>
