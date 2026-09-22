import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

import Home from '../../presentation/pages/Home.vue'
import LoginPage from '../../presentation/pages/LoginPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router