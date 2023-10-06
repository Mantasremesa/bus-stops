import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export enum ERoute {
  index = '/',
  stops = '/stops',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: ERoute.index,
    component: () => import('@/pages/bus-lines-page.vue'),
  },
  {
    path: ERoute.stops,
    component: () => import('@/pages/stops-page.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
