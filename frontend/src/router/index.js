import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { user, initialised } from '@/commons/auth/firebase-auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { public: true }
  },
  {
    path: '/protected',
    name: 'Protected',
    component: Home
    // meta: { public: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes
})

if (user.value !== false) {
  router.beforeEach((to, _, next) => {
    if (initialised.value) {
      if (!to.matched.some(record => record.meta.public) && !user.value) {
        return next('/login')
      }

      next()
    } else {
      watch(
        () => initialised.value,
        newVal => {
          if (newVal) {
            if (!to.matched.some(record => record.meta.public) && !user.value) {
              return next('/login')
            }

            next()
          }
        }
      )
    }
  })
}

export default router
