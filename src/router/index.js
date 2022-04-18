import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import PageCategory from '../views/PageCategory.vue';
Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/categories/:category', component: PageCategory}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
