<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <button class="clear-button">
    <FontAwesomeIcon :icon="faCheck" /> Submit
  </button>
</template>

<style scoped>
.clear-button {
  background-color: transparent;
  color: greenyellow;
  border: 2px solid greenyellow;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.clear-button:hover {
  background-color: greenyellow;
  color: black;
}
</style>
