<script setup lang="ts">
type Props = {
  color: string
  disabled?: boolean
}

const { color, disabled } = defineProps<Props>()
</script>

<template>
  <button
    :style="{
      borderColor: color,
      '--hover-bg-color': color,
    }"
    class="custom-button"
    :disabled="disabled"
  >
    <slot> </slot>
  </button>
</template>

<style scoped>
.custom-button {
  color: whitesmoke;
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

.custom-button:disabled {
  background-color: lightgray;
  color: gray;
  cursor: not-allowed;
}
</style>
