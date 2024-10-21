<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDog, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useQuery } from '@tanstack/vue-query'
import { GET_CURRENT_POSITION_KEYS, getCurrentPosition } from '@/services'
import type { Position } from '@/shared/types'
import { computed } from 'vue'

const { script } = defineProps<{ script: string[] }>()

const { data } = useQuery<Position>({
  queryKey: GET_CURRENT_POSITION_KEYS,
  queryFn: getCurrentPosition,
})

const position = computed(() => {
  if (data.value?.x && data.value.y) {
    return data.value.y * 15 + data.value.x
  }
  return 1
})
const target = computed(() => {
  if (data.value?.face) {
    let x = data.value.x
    let y = data.value.y
    let face = data.value.face

    for (const command of script) {
      if (command === 'M') {
        if (face === 'N') y -= 1
        if (face === 'S') y += 1
        if (face === 'E') x += 1
        if (face === 'W') x -= 1
      } else if (command === 'L') {
        if (face === 'N') face = 'W'
        else if (face === 'W') face = 'S'
        else if (face === 'S') face = 'E'
        else if (face === 'E') face = 'N'
      } else if (command === 'R') {
        if (face === 'N') face = 'E'
        else if (face === 'E') face = 'S'
        else if (face === 'S') face = 'W'
        else if (face === 'W') face = 'N'
      }
    }

    return y * 15 + x
  }
  return 225
})
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
  background-image: url('@/shared/images/mars.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 2px solid goldenrod;
}

.grid {
  transform: rotate(180deg);
  display: grid;
  direction: rtl;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
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
