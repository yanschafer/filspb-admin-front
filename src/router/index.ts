import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DashboardCreateView from '@/views/DashboardCreateView.vue'
import DashboardEditView from '@/views/DashboardEditView.vue'
import DashboardSettingsView from '@/views/DashboardSettingsView.vue'
import TokenUtil from '@/utils/token.util'

const router = createRouter({
  history: createWebHistory('/filspb-admin/'),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dash_settings',
      component: DashboardSettingsView
    },
    {
      path: '/dashboard/:tab',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/dashboard/:tab/create',
      name: 'dashboard create',
      component: DashboardCreateView,
    },
    {
      path: '/dashboard/:tab/edit/:item',
      name: 'dashboard edit',
      component: DashboardEditView,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const dashboardRegex = /\/dashboard[\/a-zA-Z]+/
  if ((dashboardRegex.test(to.path) || to.path == '' || to.path == '/') && !TokenUtil.isAuthorized()) {
    next({path: '/login'})
    return
  }

  if ((to.path == '/login' || to.path == '/' || to.path == '') && TokenUtil.isAuthorized()) {
      next({path: '/dashboard'})
      return
  }

  next()
})

export default router
