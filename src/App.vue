<script setup lang="ts">
import { Button } from "@progress/kendo-vue-buttons";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import { Dialog } from "@progress/kendo-vue-dialogs";
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
</script>

<template>

  
  <header class="feather-k-container-page-title">
    <h3>Page Title</h3>
    <span>Some Text</span>
  </header>

  
  <div class="feather-k-container-standard">
    <Dialog
      >

    </Dialog>
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
  <div class="feather-k-container-standard">
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

.feather-k-container-page-title {
  margin: 48px 24px 24px;
  max-width: fit-content;
  border: 1px dashed green;
}
.feather-k-container-standard {
  margin: 24px ;
  padding: 8px 0 8px;
  /* border: 1px dashed navy; */
}
</style>
<style scoped>
/* button {
  margin: 0.5em;
} */
.buttons {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: flex-start
}
.instruction {
  font-size: 1.5em;
}
.patient-search {
  width: 30em;
}
</style>
