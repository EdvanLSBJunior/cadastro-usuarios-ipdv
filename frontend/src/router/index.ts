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

router.beforeEach((to, from, next) => {
  const publicPages = ['Login']
  const authRequired = !publicPages.includes(to.name as string)
  const token = localStorage.getItem('token')

  if (authRequired && !token) {
    return next({ name: 'Login' })
  }

  next()
})

export default router
