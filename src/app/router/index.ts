import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

import Home from '../../presentation/pages/Home.vue'
import Login from '../../presentation/pages/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router