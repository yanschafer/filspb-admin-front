import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard/:tab',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/dashboard/:tab/:item',
      name: 'dashboard',
      component: DashboardView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log("TO", to)
  if (to.path == "/dashboard/") {
      next({path: '/dashboard/affiche'})
      return
  }

  next()
})

export default router
