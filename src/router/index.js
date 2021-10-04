import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import TaskPlanner from '../components/TaskPlanner'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: Dashboard,
    component: Dashboard
  },
  {
    path: '/plan',
    name: 'TaskPlanner',
    component: TaskPlanner
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
