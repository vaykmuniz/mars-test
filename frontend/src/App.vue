<script setup lang="ts">
import { ref } from 'vue'
import MarsBoard from './components/MarsBoard.vue'
import MoveButton from './components/MoveButton.vue'
import MoveList from './components/MoveList.vue'
import ClearButton from './components/ClearButton.vue'
import SubmitButton from './components/SubmitButton.vue'
import MarsHeaders from './components/MarsHeaders.vue'

const script = ref<string[]>([])

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
    <div class="container">
      <MarsHeaders />
      <MoveList :script="script" />
      <div class="row">
        <MoveButton variant="rotate" :onclick="appendScript" />
        <MoveButton variant="move" :onclick="appendScript" />
        <MoveButton variant="rotate-90" :onclick="appendScript" />
      </div>
      <div class="row">
        <ClearButton :onclick="clear" />
        <SubmitButton :onclick="submit" />
      </div>
    </div>
    <MarsBoard :script="script" />
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
</style>
