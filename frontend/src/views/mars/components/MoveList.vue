<script setup lang="ts">
import {
  faRotateBack,
  faRotateForward,
  faArrowUp,
  faBug,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

type Props = {
  script: string[]
}
const { script } = defineProps<Props>()

function getIcon(move: string) {
  if (!['L', 'R', 'M'].includes(move)) return faBug
  const dic = {
    R: faRotateBack,
    L: faRotateForward,
    M: faArrowUp,
  }

  return dic[move as 'R' | 'L' | 'M']
}
</script>

<template>
  <ul class="action_list">
    <div class="action" v-for="move in script" :key="move">
      <FontAwesomeIcon :icon="getIcon(move)" />
      {{ move }}
    </div>
  </ul>
</template>

<style scoped>
.action {
  color: black;
  gap: 4px;
  display: inline-flex;
  align-items: center;
}

.action_list {
  width: 200px;
  height: 50%;
  overflow-y: auto;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column-reverse;
  gap: 18px;

  border-radius: 4px;
  background-color: rgba(248, 248, 255, 0.42);
  padding: 8px;

  font-size: 18px;
}
</style>
