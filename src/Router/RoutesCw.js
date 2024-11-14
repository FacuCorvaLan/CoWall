import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', name:'Home', component: () => import('../views/HomePage.vue') },
  { path: '/login', name:'Login', component: () => import('../views/LoginUsers.vue')  },
  { path: '/profile', name:'Profile', component: () => import('../views/UserHomePage.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router