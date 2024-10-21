<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <button class="clear-button">
    <FontAwesomeIcon :icon="faTrashCan" />CLEAR
  </button>
</template>

<style scoped>
.clear-button {
  background-color: transparent;
  color: red;
  border: 2px solid red;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.clear-button:hover {
  background-color: red;
  color: black;
}
</style>
