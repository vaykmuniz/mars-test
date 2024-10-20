<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDog, faXmark } from '@fortawesome/free-solid-svg-icons'

const position = 25
const target = 200
</script>

<template>
  <div class="board">
    <div class="grid">
      <div v-for="n in 225" :key="n" class="grid-item">
        <span v-if="position === n || target === n" style="color: black">
          <FontAwesomeIcon :icon="n === position ? faDog : faXmark" size="2x" />
        </span>
      </div>
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
  border-radius: 4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  transform: rotate(180deg);

  gap: 2px;
  padding: 4px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(180deg);
}
</style>
