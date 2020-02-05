import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import DashboardAll from './views/DashboardAll.vue'
import { fireAuth } from './main'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/mytasks',
      name: 'mytasks',
      component: Dashboard,
      meta: {
        requiersAuth: true
      }
    },
    {
      path: '/general',
      name: 'general',
      component: DashboardAll,
      meta: {
        requiersAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = fireAuth.currentUser;
  const requiersAuth = to.matched.some(record => record.meta.requiersAuth)
  
  if(requiersAuth && !currentUser) next('home')
  else if (!requiersAuth && currentUser) next('mytasks')
  else next()
})

export default router;
