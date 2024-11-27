import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', name:'Home', component: () => import('../Views/HomePage.vue') },
  { path: '/login', name:'Login', component: () => import('../Views/LoginUsers.vue')  },
  { path: '/profile', name:'Profile', component: () => import('../Views/UserHomePage.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router