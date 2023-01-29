import {createRouter, createWebHashHistory} from 'vue-router'
import Changelog from "./pages/Changelog.vue";
import Statements from "./pages/Statements.vue";

const routerHistory = createWebHashHistory()

export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Statements
    },
    {
      path: '/changelog',
      component: Changelog
    }
  ]
})

export default router
