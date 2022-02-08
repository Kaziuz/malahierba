import { createWebHistory, createRouter } from 'vue-router'
import Main from './pages/Main'
import Info from './pages/Info'
import NotFound from './pages/Error'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/info',
    name: 'info',
    component: Info
  },
  {
    path: '/p/:id',
    name: 'playlist',
    component: Main
  },
  {
    path: '/:catchAll(.*)',
    name: 'Notfound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory('/r/'), // in vue2 mode: history
  routes
})

export default router
