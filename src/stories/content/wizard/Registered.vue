<template>
  <div>
    <p v-if="registered">You are now registered</p>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

const registered = inject("registered");
</script>

<style scoped></style>
