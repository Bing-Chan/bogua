import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const View = () => import('../views/View.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component:  () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
