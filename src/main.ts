// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import UI from 'castle-ui'
import './assets/css/common.css'
Vue.config.productionTip = true
Vue.use(UI, {
  server: 'http://cdn3.tansuyun.cn/'
})
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
