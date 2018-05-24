// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import iconfont from './base/iconfont.vue'
import editable from './base/editable.vue'
import './assets/css/common.css'
Vue.config.productionTip = true
Vue.use(iView)
Vue.component('iconfont', iconfont)
Vue.component('editable', editable)
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
