<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faRotateBack,
  faRotateForward,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  variant: 'rotate' | 'rotate-90' | 'move'
}

const props = defineProps<Props>()

const icon = {
  rotate: faRotateBack,
  'rotate-90': faRotateForward,
  move: faArrowUp,
}[props.variant]
</script>

<template>
  <button class="move-button">
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>

<style scoped>
.move-button {
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.move-button:hover {
  background-color: #0056b3;
}

.move-button span {
  margin-left: 5px;
}
</style>
