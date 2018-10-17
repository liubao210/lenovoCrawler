import Vue from 'vue'
import Router from 'vue-router'
// import app from '@/App'
import review from '../../components/review/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      name : 'review',
      component : review,
    },
    {
      path : '/review',
      name : 'review',
      component : review,
    },
  ]
})
