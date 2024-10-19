<script setup lang="ts">
import MarsBoard from './components/MarsBoard.vue'
import MoveButton from './components/MoveButton.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <MoveButton variant="rotate" />
      <MoveButton variant="move" />
      <MoveButton variant="rotate-90" />
    </div>
    <MarsBoard />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 26px;
}
</style>
