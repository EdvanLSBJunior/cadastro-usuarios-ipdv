import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import CollaboratorList from '@/views/CollaboratorList.vue'
import RolesPage from '@/views/RolesPage.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/colaboradores', component: CollaboratorList },
  { path: '/cargos', name: 'Cargos', component: RolesPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
