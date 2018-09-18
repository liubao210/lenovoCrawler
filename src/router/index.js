import Vue from 'vue'
import Router from 'vue-router'
import mySelect from '@/components/mySelect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      name : mySelect,
      component : mySelect,
    },
  ]
})
