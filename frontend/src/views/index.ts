import { createRouter, createWebHistory } from 'vue-router'
import Mars from './mars/Mars.vue'
import Error from './error/Error.vue'

const routes = [
  {
    path: '/',
    component: Mars,
  },
  {
    path: '/:catchAll(.*)',
    component: Error,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
