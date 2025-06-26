import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import CollaboratorList from '@/views/CollaboratorList.vue'
import RolesPage from '@/views/RolesPage.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  {
    path: '/',
    component: AuthenticatedLayout,
    children: [
      {
        path: '/colaboradores',
        name: 'Colaboradores',
        component: CollaboratorList,
      },
      {
        path: '/roles',
        name: 'Roles',
        component: RolesPage,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
