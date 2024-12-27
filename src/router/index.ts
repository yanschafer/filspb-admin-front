import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TokenUtil from '@/utils/token.util'

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
      name: 'dashboard_concrete',
      component: DashboardView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const dashboardRegex = /\/dashboard[\/a-zA-Z]+/
  if (dashboardRegex.test(to.path) && !TokenUtil.isAuthorized()) {
    next({path: '/login'})
    return
  }

  if (to.path == "/dashboard/" || to.path == '/dashboard' || (to.path == '/login' && TokenUtil.isAuthorized())) {
      next({path: '/dashboard/affiche'})
      return
  }

  next()
})

export default router
