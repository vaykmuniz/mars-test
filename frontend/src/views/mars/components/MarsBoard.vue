<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faDog,
  faFlagCheckered,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  GET_ALL,
  GET_PREVIEW_BY_ID_KEYS,
  getAll,
  getPreviewById,
  LAND_KEYS,
  postLand,
} from '@/services'
import { computed, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Position } from '@/shared/types'
import { getPositionCount, faceToDeg } from '@/shared/utils'

const route = useRoute()
const router = useRouter()

const props = defineProps<{ script: string[] }>()
const queryClient = useQueryClient()
const { script } = toRefs(props)

const { data: robots, isPending } = useQuery<Position[]>({
  queryKey: GET_ALL,
  queryFn: getAll,
})

const { mutate: mutationLand } = useMutation({
  mutationKey: [...LAND_KEYS],
  mutationFn: postLand,
  onSuccess: position => {
    if (position.current_position?.id) {
      router.push({
        query: { ...route.query, robot_id: position.current_position.id },
      })
    }
    queryClient.invalidateQueries({ queryKey: GET_ALL })
  },
})

const { data: preview } = useQuery({
  queryKey: [...GET_PREVIEW_BY_ID_KEYS, script],
  queryFn: () => getPreviewById(script.value, Number(route.query.robot_id)),
  enabled: Boolean(script.value && route.query.robot_id),
})

const gridRobots = computed(() => {
  if (!robots.value) return null
  return robots.value.map(robot => ({
    ...robot,
    value: getPositionCount(robot),
    isSelected: robot.id === Number(route.query.robot_id),
  }))
})

const target = computed(() => {
  if (preview.value?.current_position) {
    return {
      value: getPositionCount(preview.value.current_position),
      ...preview.value.current_position,
    }
  }
  return null
})

function landOnPosition(n: number) {
  const where = {
    x: (n - 1) % 15,
    y: Math.floor((n - 1) / 15),
    face: 'N',
  }
  mutationLand(where)
}

function switchRobotControl(count: number) {
  const found = robots.value?.find(robot => getPositionCount(robot) === count)
  router.push({
    query: { ...route.query, robot_id: found?.id },
  })
}
</script>

<template>
  <div v-if="!isPending" class="board">
    <div class="grid">
      <div v-for="position in 225" :key="position" class="grid-item">
        <button v-if="
          gridRobots && gridRobots.map(val => val.value).includes(position)
        " @click="switchRobotControl(position)">
          <FontAwesomeIcon size='lg' :icon="faDog" :style="{
            color: `${gridRobots.find(el => el.value === position)?.isSelected ? 'green' : 'black'}`,
            transform: `rotate(${faceToDeg[gridRobots.find(el => el.value === position)?.face || 'N']}deg)`,
          }" />
        </button>
        <FontAwesomeIcon size="lg" v-else-if="position === target?.value" style="color: green" :icon="faFlagCheckered"
          :style="{ transform: `rotate(${faceToDeg[target.face]}deg)` }" />
        <button v-else @click="landOnPosition(position)"></button>
      </div>
    </div>
  </div>
  <div v-else class="center">
    <FontAwesomeIcon :icon="faSpinner" spin size="4x" />
  </div>
</template>

<style scoped>
.board {
  display: flex;
  position: relative;
  min-width: 500px;
  min-height: 500px;
  background-image: url('@/shared/images/mars.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 2px solid goldenrod;
}


.grid {
  transform: rotate(180deg);
  display: grid;
  direction: rtl;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(30px, 1fr));
  gap: 2px;

  padding: 4px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(180deg);

  width: 100%;
  height: 100%;

  >button {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-width: 300px;
  }
}
</style>
