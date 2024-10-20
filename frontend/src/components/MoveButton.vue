<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faRotateBack,
  faRotateForward,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  variant: 'rotate' | 'rotate-90' | 'move'
  onclick?: (value: string) => void
}

const props = defineProps<Props>()

const dic = {
  rotate: 'R',
  'rotate-90': 'L',
  move: 'M',
}

function clicked() {
  props.onclick?.(dic[props.variant])
}

const icon = {
  rotate: faRotateBack,
  'rotate-90': faRotateForward,
  move: faArrowUp,
}[props.variant]
</script>

<template>
  <button class="move-button" @click="clicked">
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>

<style scoped>
.move-button {
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  border: 1px solid #007bff;
  background-color: transparent;
  color: white;
  cursor: pointer;
  border-radius: 8px;
}

.move-button:hover {
  background-color: #0056b3;
}

.move-button span {
  margin-left: 5px;
}
</style>
