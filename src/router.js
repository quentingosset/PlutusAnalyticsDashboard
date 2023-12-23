import {createRouter, createWebHashHistory} from 'vue-router'

const routerHistory = createWebHashHistory()
const Changelog = () => import('./pages/Changelog.vue')
const Statements = () => import('./pages/Statements.vue')
const Analytics = () => import('./pages/Analytics.vue')
const Perks = () => import('./pages/Perks.vue')
const Limits = () => import('./pages/Limits.vue')
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Analytics
    },
    {
      path: '/statements',
      component: Statements
    },
    {
      path: '/perks',
      component: Perks
    },
    {
      path: '/limits',
      component: Limits
    },
    {
      path: '/changelog',
      component: Changelog
    }
  ]
})

export default router
