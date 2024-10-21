<script setup lang="ts">
type Props = {
  color: string
}

const props = defineProps<Props>()
</script>

<template>
  <button
    :style="{
      color: props.color,
      borderColor: props.color,
      '--hover-bg-color': props.color,
    }"
    class="custom-button"
  >
    <slot> </slot>
  </button>
</template>

<style scoped>
.custom-button {
  background-color: transparent;
  border: 2px solid;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.custom-button:hover {
  background-color: var(--hover-bg-color);
  color: black !important;
}
</style>
