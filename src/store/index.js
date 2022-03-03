import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/home.js'
import search from './search/search.js'
import detail from './detail/detail.js'
import shopcar from './shopcar/shopcar.js'
import user from './user/user.js'
import trade from './trade/trade.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcar,
    user,
    trade
  }
})
