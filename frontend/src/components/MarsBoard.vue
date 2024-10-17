<script setup lang="ts"></script>

<template>
  <div class="board">
    <div class="grid">
      <div v-for="n in 225" :key="n" class="grid-item"></div>
    </div>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  width: 800px;
  height: 800px;
  background-image: url('../shared/images/mars.jpg');
  background-size: cover;
  background-position: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  gap: 1px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
