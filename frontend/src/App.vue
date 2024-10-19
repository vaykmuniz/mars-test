<script setup lang="ts">
import { ref } from 'vue'
import MarsBoard from './components/MarsBoard.vue'
import MoveButton from './components/MoveButton.vue'

const script = ref([])

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
