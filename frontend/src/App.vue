<script setup lang="ts">
import { ref } from 'vue'
import MarsBoard from './components/MarsBoard.vue'
import MoveButton from './components/MoveButton.vue'
import { useQuery } from '@tanstack/vue-query'
import { GET_CURRENT_POSITION_KEYS, getCurrentPosition } from './services'
import type { Position } from './shared/types'

const script = ref<string[]>([])

const { data } = useQuery<Position>({
  queryKey: GET_CURRENT_POSITION_KEYS,
  queryFn: getCurrentPosition,
})

function appendScript(value: string) {
  script.value = [...script.value, value]
}
</script>

<template>
  <div class="container">
    <div class="row">
      <MoveButton variant="rotate" :onclick="appendScript" />
      <MoveButton variant="move" :onclick="appendScript" />
      <MoveButton variant="rotate-90" :onclick="appendScript" />
    </div>
    <div class="row">
      {{ data }}
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
