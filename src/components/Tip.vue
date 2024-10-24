<template>
  <div>
    <h2>Tip #{{ item.tip }}</h2>
    <strong>{{ item.title }}</strong>
    <p>{{ item.content }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style scoped></style>
