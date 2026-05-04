import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import WelcomePage from '../components/WelcomePage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
