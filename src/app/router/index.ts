import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

import Home from '../../presentation/pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router