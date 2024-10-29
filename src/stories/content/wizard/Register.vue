<template>
  <div>
    <h1>Register</h1>
    <p></p>
    <p></p>
    <p v-if="registered">You are now registered</p>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

// const data = inject("data");
// const data = inject("data") as WizardData;

// const { firstName, lastName, registered } = data;

const registered = inject("registered");
</script>

<style scoped></style>
