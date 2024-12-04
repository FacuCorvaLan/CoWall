import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../Views/HomePage.vue';
import navbar from '../Components/NavbarCw.vue';
import loginUsers from '../Views/LoginUsers.vue';
import userHome from '../Views/UserHomePage.vue';
import userHistory from '../Views/UserHistory.vue';
import transactions from '../Views/buySell.vue';

const routes = [
  { path: '/', name:'Home', component: homePage, 
    children: [{path:'', component: navbar}]},

  { path: '/login', name:'Login', component: loginUsers,
    children: [{path:'', component: navbar}]},

  { path: '/profile/:userName', name:'Profile', component: userHome},

  { path: '/history', name:'History', component: userHistory,
    children: [{path:'', component: navbar}]},
  
    { path: '/transactions', name:'Transactions', component: transactions}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router