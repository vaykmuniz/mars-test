<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDog, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

import { useQuery } from '@tanstack/vue-query'
import {
  GET_CURRENT_POSITION_KEYS,
  GET_PREVIEW_KEYS,
  getCurrentPosition,
  getPreview,
} from '@/services'
import { computed, toRefs } from 'vue'

const props = defineProps<{ script: string[] }>()
const { script } = toRefs(props)
const { data: lastPosition } = useQuery({
  queryKey: GET_CURRENT_POSITION_KEYS,
  queryFn: getCurrentPosition,
})

const { data: preview } = useQuery({
  queryKey: [...GET_PREVIEW_KEYS, script],
  queryFn: () => getPreview(script.value),
})

const faceToDeg: { [key: string]: number } = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
}

const position = computed(() => {
  if (lastPosition?.value?.current_position) {
    return {
      value:
        lastPosition.value.current_position.y * 15 +
        lastPosition.value.current_position.x +
        1,
      face: faceToDeg[lastPosition.value.current_position.face] || 0,
    }
  }
  return { value: null, face: 0 }
})

const target = computed(() => {
  if (preview.value?.current_position) {
    return {
      value:
        preview.value.current_position.y * 15 +
        preview.value.current_position.x +
        1,
      face: faceToDeg[preview.value.current_position.face] || 0,
    }
  }
  return { value: null, face: 0 }
})
</script>

<template>
  <div class="board">
    <div class="grid">
      <div v-for="n in 225" :key="n" class="grid-item">
        <span
          v-if="position.value === n || target.value === n"
          style="color: black"
        >
          <FontAwesomeIcon
            :icon="n === position.value ? faDog : faFlagCheckered"
            size="2x"
            :class="`fa-rotate-${n === position.value ? position.face : target.face}`"
          />
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
