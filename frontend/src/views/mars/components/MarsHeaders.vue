<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <head class="header">
    Mars Rover
    <FontAwesomeIcon :icon="faEarthAmericas" spin />
  </head>
  <section>
    <p>🪐🤖🌌 Click Empty Space to Place a Land Robot!</p>
    <p>🖱️💚🤖 Click on your robot to take control!</p>
    <p>🚫🏔️⚠️ If your robot ends up on the plateau, it's over!</p>
    <p>🤖➡️🤖💥 If you position your robot over another, both will break!</p>
  </section>
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
  text-align: center;

  font-family: 'Courier New', Courier, monospace;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 12px;
  border-radius: 4px;
  color: darkgoldenrod;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  font-weight: bolder;
  text-align: flex-start;
}
</style>
