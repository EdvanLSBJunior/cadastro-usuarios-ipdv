import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import CollaboratorList from '@/views/CollaboratorList.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/colaboradores', component: CollaboratorList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
