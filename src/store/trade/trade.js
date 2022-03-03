// 订单交易付款仓库
import { reqAddressInfo, reqOrderInfo } from '../../api/index.js'
export default {
  namespaced: true,
  state: {
    addressList: [],
    orderList: {}
  },
  mutations: {
    // 添加用户地址到仓库
    addUserAddressList (state, value) {
      state.addressList = value
    },
    // 获取购物列表保存到store
    addUserOrderList (state, value) {
      state.orderList = value
    }

  },
  actions: {
    // trade 调用api获取用户地址
    async getUserAddressList (context) {
      const { data: ret } = await reqAddressInfo()
      if (ret.code === 200) {
        context.commit('addUserAddressList', ret.data)
      } else {
        Promise.reject(new Error('fail'))
      }
    },
    // 获取用户订单信息
    async getUserOrder (context) {
      const { data: res } = await reqOrderInfo()
      if (res.code === 200) {
        context.commit('addUserOrderList', res.data)
      } else {
        Promise.reject(new Error('fail'))
      }
    }
  },
  getters: {
    detailArrayList (state) {
      return state.orderList.detailArrayList || []
    }
  }
}
