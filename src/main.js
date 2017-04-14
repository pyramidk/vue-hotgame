import Vue from 'vue'
import App from './App'
import store from './store/store'
import ElLoading from 'element-loading'
import 'element-theme-default'

Vue.use(ElLoading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
