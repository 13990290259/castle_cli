// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import UI from 'castle-ui'
import iconfont from './base/iconfont.vue'
import editable from './base/editable.vue'
import './assets/css/common.css'
Vue.config.productionTip = true
Vue.component('iconfont', iconfont)
Vue.component('editable', editable)
Vue.use(UI)
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
