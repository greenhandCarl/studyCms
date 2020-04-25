import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TeacherList from '../views/TeacherList.vue'
import AddTeacher from '../views/AddTeacher.vue'
import UpdateTeacher from '../views/UpdateTeacher.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'TeacherList',
    component: TeacherList
  },
  {
    path: '/addTeacher',
    name: 'AddTeacher',
    component: AddTeacher
  },
  {
    path: '/updateTeacher',
    name: 'UpdateTeacher',
    component: UpdateTeacher
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
