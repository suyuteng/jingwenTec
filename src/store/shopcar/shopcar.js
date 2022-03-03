import { reqCarlist, reqCheckCart, reqDeleteCart } from '../../api/index.js'
import { createUUid } from '../../utils/createuuid.js'

export default {
  namespaced: true,
  state: {
    carList: [],
    uuidToken: createUUid()
  },
  mutations: {
    addCarList (state, value) {
      state.carList = value
    }
  },
  actions: {
    // 请求购物车列表数据保存到仓库中
    async getCarlist (context) {
      const { data: res } = await reqCarlist()
      if (res.code === 200) {
        context.commit('addCarList', res.data)
      }
    },
    // 改变商品的选中状态
    async updateCheck (context, { skuId, isChecked }) {
      console.log(skuId, isChecked)
      const { data: ret } = await reqCheckCart(skuId, isChecked)
      if (ret.code === 200) {
        return 'ok'
      } else {
        Promise.reject(new Error('fail'))
      }
    },
    // 全选或反选
    updateAllCheck ({ dispatch, state }, isChecked) {
      const arr = []
      state.carList[0].cartInfoList.forEach(item => {
        const ret = dispatch('updateCheck', { skuId: item.skuId, isChecked })
        arr.push(ret)
      })
      return Promise.all(arr)
    },
    // 删除某一个产品
    async removeCart (context, skuId) {
      console.log(skuId)
      const { data: res } = await reqDeleteCart(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        Promise.reject(new Error('fail'))
      }
    },
    // 删除全部产品
    removeAllCart ({ dispatch, getters }) {
      console.log(getters.cartList.cartInfoList)
      const arr = []
      getters.cartList.cartInfoList.forEach(item => {
        // console.log(item.skuId) 派发action执行removeCart 方法但是得到的是数组promise
        // 判断选中的才删除
        if (item.isChecked === 1) {
          const ret = dispatch('removeCart', item.skuId)
          arr.push(ret)
        }
      })
      return Promise.all(arr)
    }
  },
  getters: {
    // 获取carlist数据
    cartList (state) {
      // 至少是一个空对象，看数据决定
      return state.carList[0] || {}
    }
  }
}
