import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as API from './api/index.js'
import gif from './assets/images/1.gif'
import './plugins/validate.js'

// 引入mockjs 执行一次
import './mock/mockServer.js'
//  引入swiper样式
import 'swiper/css/swiper.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

// 引入全局组件
import TypeNav from './components/TypeNav.vue'
import VueRouter from 'vue-router'
Vue.config.productionTip = false

Vue.component(TypeNav.name, TypeNav)

// 使用el-ui
Vue.use(ElementUI)
// 重写vuerouter push replace方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
// 使用图片懒加载
Vue.use(VueLazyload, {
  loading: gif
})
new Vue({
  router,
  store,
  // 定义全局总线$bus
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
