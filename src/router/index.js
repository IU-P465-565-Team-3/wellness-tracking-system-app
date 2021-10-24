import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Registration from '../components/Registration'
import Dashboard from '../components/Dashboard'
import ActivityPlanner from '../feature/EventPlanner/Main.vue'
import ResourceCatalog from '../components/ResourceCatalog'

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
    path: '/register',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/plan',
    name: 'ActivityPlanner',
    component: ActivityPlanner
  },
  {
    path: '/catalog',
    name: 'Resource Catalog',
    component: ResourceCatalog
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
