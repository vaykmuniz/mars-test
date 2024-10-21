<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <head class="header">
    Mars Rover
    <FontAwesomeIcon :icon="faEarthAmericas" spin />
  </head>
</template>

<style scoped>
.header {
  background-color: transparent;
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  font-size: 42px;
  font-weight: lighter;
  color: darkgoldenrod;

  font-family: 'Courier New', Courier, monospace;
}
</style>
