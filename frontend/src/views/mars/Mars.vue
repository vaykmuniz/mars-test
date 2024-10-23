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
import { GET_ALL, UPDATE_POSITION_KEYS, updatePosition } from '@/services'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const script = ref<string[]>([])
const queryClient = useQueryClient()

const { mutate } = useMutation({
  mutationKey: UPDATE_POSITION_KEYS,
  mutationFn: (script: string[]) =>
    updatePosition(script, Number(route.query.robot_id)),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: GET_ALL })
  },
  onError: () => {
    queryClient.invalidateQueries({ queryKey: GET_ALL })
    router.push({
      query: { ...route.query, robot_id: '' },
    })
    script.value = []
  },
})

function appendScript(move: string) {
  script.value = [...script.value, move]
}

function clear() {
  script.value = []
}

function submit() {
  var id = route.query.robot_id
  if (id && script.value.length > 0) {
    mutate(script.value)
    script.value = []
  }
}
</script>

<template>
  <div class="row">
    <p class="absolute_tag_top">MADE BY gabriel muniz - vaykz</p>
    <p class="absolute_tag_bottom">MADE BY - vaykz</p>
    <div class="container">
      <MarsHeaders />
      <MoveList :script="script" />
      <div class="row">
        <StrokeButton
          color="skyblue"
          @click="() => appendScript('L')"
          :disabled="!route.query.robot_id"
        >
          <FontAwesomeIcon :icon="faRotateBack" />
        </StrokeButton>
        <StrokeButton
          color="skyblue"
          @click="() => appendScript('M')"
          :disabled="!route.query.robot_id"
        >
          <FontAwesomeIcon :icon="faArrowUp" />
        </StrokeButton>
        <StrokeButton
          color="skyblue"
          @click="() => appendScript('R')"
          :disabled="!route.query.robot_id"
        >
          <FontAwesomeIcon :icon="faRotateForward" />
        </StrokeButton>
      </div>
      <div class="row">
        <StrokeButton color="red" @click="clear" :disabled="!script.length">
          <FontAwesomeIcon :icon="faTrashCan" /> CLEAR
        </StrokeButton>
        <StrokeButton
          color="greenyellow"
          @click="submit"
          :disabled="!route.query.robot_id && !script.length"
        >
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
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.absolute_tag_top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: move 11s linear infinite alternate;
}

.absolute_tag_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  animation: move 10s linear infinite alternate;
  animation-direction: alternate-reverse;
}

@keyframes move {
  from {
    left: 0;
  }
  to {
    left: 90%;
  }
}
</style>
