<template>
  <div>
    <h2>Tip #{{ item.tip }}</h2>
    <strong>{{ item.title }}</strong>
    <p>{{ item.content }}</p>
  </div>
</template>

<script setup lang="ts">
type TipItem = {
  tip?: number;
  title?: string;
  content?: string;
};

const props = defineProps<{ item?: TipItem }>();
const { item = { tip: 0, title: "", content: "" } } = props;
</script>

<style scoped></style>
