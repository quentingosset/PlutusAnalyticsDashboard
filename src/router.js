import {createRouter, createWebHashHistory} from 'vue-router'

const routerHistory = createWebHashHistory()
const Changelog = () => import('./pages/Changelog.vue')
const Statements = () => import('./pages/Statements.vue')
const Perks = () => import('./pages/Perks.vue')
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Statements
    },
    {
      path: '/perks',
      component: Perks
    },
    {
      path: '/changelog',
      component: Changelog
    }
  ]
})

export default router
