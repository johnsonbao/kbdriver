import '../theme/index.css'
import '~/assets/js/response.js'
import '~/assets/js/init.js'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import i18n from './i18n/i18n'
import global_ from '~/components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

Vue.use(ElementUI, { size: 'mini' })

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})

// new Vue({
//   el: '#app',
//   //router,
//   template: '<App/>',
//   components: { App }
// })