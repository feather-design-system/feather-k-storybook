<template>
  <div>
    <h1>Register</h1>
    <p>{{ val("firstName") }}</p>
    <p>{{ val("lastName") }}</p>
    <p></p>
    <p v-if="registered">You are now registered</p>
  </div>
</template>

<script lang="ts" setup>
import { FieldInjectedProps } from "@progress/kendo-vue-form";
import { inject } from "vue";

const registered = inject("registered");

const kendoForm = inject("kendoForm") as FieldInjectedProps;
// console.log("kendoForm", kendoForm);

const val = (key: string) => {
  // @ts-ignore
  return kendoForm.values[key];
};
</script>

<style scoped></style>
