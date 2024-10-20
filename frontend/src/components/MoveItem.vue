<script setup lang="ts">
import {
  faRotateBack,
  faRotateForward,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'

type Props = {
  move: string
}
const { move } = defineProps<Props>()

const icon = computed(() => {
  if (!['L', 'R', 'M'].includes(move)) return null
  const dic = {
    R: faRotateBack,
    L: faRotateForward,
    M: faArrowUp,
  }

  return dic[move as 'R' | 'L' | 'M']
})
</script>

<template>
  <div v-if="icon" class="action">
    <FontAwesomeIcon :icon="icon" />
    <span>{{ move }}</span>
  </div>
</template>

<style scoped>
.action {
  color: black;
  gap: 4px;
  display: inline-flex;
  align-items: center;
}
</style>
