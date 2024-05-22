<script setup lang="ts">
import { Button } from "@progress/kendo-vue-buttons";
import "./assets/css/feather-ks.css";
import "./assets/css/feather-k-override.css";
</script>

<template>
  <div>
    <Button :theme-color="'primary'" :fill-mode="'solid'" :rounded="'medium'">Primary</Button>
    <Button :theme-color="'primary'" :fill-mode="'outline'" :rounded="'medium'">Secondary</Button>
    <Button :theme-color="'primary'" :fill-mode="'flat'" :rounded="'medium'">Text</Button>
    <p class="instruction">To run storybook enter "npm run storybook" from the terminal inside VS Code.</p>

  </div>
</template>

<style scoped>
button {
  margin: 0.5em;
}

.instruction {
  font-size: 1.5em;
  margin: 20px;
}
</style>
