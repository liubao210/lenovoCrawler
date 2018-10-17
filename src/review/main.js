// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './review'
import router from './router'
//elementUi
//vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.prototype.$axios = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#review',
  router,
  components: { App },
  template: '<App/>'
})
