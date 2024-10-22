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
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  GET_CURRENT_POSITION_KEYS,
  UPDATE_POSITION_KEYS,
  updatePosition,
} from '@/services'

const script = ref<string[]>([])
const queryClient = useQueryClient()

const { mutate } = useMutation({
  mutationKey: UPDATE_POSITION_KEYS,
  mutationFn: updatePosition,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: GET_CURRENT_POSITION_KEYS })
  },
})

function appendScript(move: string) {
  script.value = [...script.value, move]
}

function clear() {
  script.value = []
}

function submit() {
  mutate(script.value)
  script.value = []
}
</script>

<template>
  <div class="row">
    <div class="container">
      <MarsHeaders />
      <MoveList :script="script" />
      <div class="row">
        <StrokeButton color="skyblue" :onclick="() => appendScript('L')">
          <FontAwesomeIcon :icon="faRotateBack" />
        </StrokeButton>
        <StrokeButton color="skyblue" :onclick="() => appendScript('M')">
          <FontAwesomeIcon :icon="faArrowUp" />
        </StrokeButton>
        <StrokeButton color="skyblue" :onclick="() => appendScript('R')">
          <FontAwesomeIcon :icon="faRotateForward" />
        </StrokeButton>
      </div>
      <div class="row">
        <StrokeButton color="red" :onclick="clear">
          <FontAwesomeIcon :icon="faTrashCan" /> CLEAR
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
