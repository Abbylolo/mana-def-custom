import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import index from '../views/index'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
    
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
