<script setup lang="ts">
import { ref } from 'vue'
import MarsBoard from './components/MarsBoard.vue'
import MoveButton from './components/MoveButton.vue'
import MoveItem from './components/MoveItem.vue'
import ClearButton from './components/ClearButton.vue'
import { useQuery } from '@tanstack/vue-query'
import { GET_CURRENT_POSITION_KEYS, getCurrentPosition } from './services'
import type { Position } from './shared/types'
import SubmitButton from './components/SubmitButton.vue'

const script = ref<string[]>([])

const { data } = useQuery<Position>({
  queryKey: GET_CURRENT_POSITION_KEYS,
  queryFn: getCurrentPosition,
})

function appendScript(value: string) {
  script.value = [...script.value, value]
  console.log(script.value)
}

function clear() {
  script.value = []
}

function submit() {
  console.log('submit')
}
</script>

<template>
  <div class="row">
    <MarsBoard />

    <div class="container">
      <ul class="action_list">
        <MoveItem v-for="item in script" :key="item" :move="item" />
      </ul>
      <div class="row">
        <MoveButton variant="rotate" :onclick="appendScript" />
        <MoveButton variant="move" :onclick="appendScript" />
        <MoveButton variant="rotate-90" :onclick="appendScript" />
      </div>
      <div class="row">
        <ClearButton :onclick="clear" />
        <SubmitButton :onclick="submit" />
        {{ data }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 100vh;
  padding: 42px;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.action_list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column-reverse;
  gap: 10px;

  width: 150px;
  height: 80%;
  border-radius: 4px;
  background-color: rgb(184, 184, 184);
  padding: 8px;

  overflow-y: auto;

  margin-bottom: 16px;
}
</style>
