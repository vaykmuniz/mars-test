<script setup lang="ts">
import { ref } from 'vue'
import MarsBoard from './components/MarsBoard.vue'
import MarsHeaders from './components/MarsHeaders.vue'
import MoveList from './components/MoveList.vue'
import StrokeButton from '@/shared/components/StrokeButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCheck,
  faTrashCan,
  faRotateBack,
  faRotateForward,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'

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
        <StrokeButton color="blue" :onclick="() => appendScript('L')">
          <FontAwesomeIcon :icon="faRotateBack" />
        </StrokeButton>
        <StrokeButton color="blue" :onclick="() => appendScript('M')">
          <FontAwesomeIcon :icon="faArrowUp" />
        </StrokeButton>
        <StrokeButton color="blue" :onclick="() => appendScript('R')">
          <FontAwesomeIcon :icon="faRotateForward" />
        </StrokeButton>
      </div>
      <div class="row">
        <StrokeButton color="red" :onclick="clear">
          <FontAwesomeIcon :icon="faTrashCan" />CLEAR
        </StrokeButton>
        <StrokeButton color="greenyellow" :onclick="submit">
          <FontAwesomeIcon :icon="faCheck" /> SUBMIT
        </StrokeButton>
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
