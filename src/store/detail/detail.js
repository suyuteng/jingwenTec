// 产品详情小仓库
import { reqDetailList, reqAddCar } from '../../api/index.js'
export default {
  namespaced: true,
  state: {
    detailList: {}
  },
  mutations: {
    addDetailList (state, v) {
      state.detailList = v
    }
  },
  actions: {
    async getDetailList (context, skuId) {
      const { data: ret } = await reqDetailList(skuId)
      if (ret.code === 200) {
        context.commit('addDetailList', ret.data)
      }
    },
    // 添加购物车告知服务器记录并拿回结果
    async addOrUpdateCar (context, v) {
      const { data: ret } = await reqAddCar(v.skuId, v.skuNum)
      if (ret.code === 200) {
        return 'ok'
      } else {
        Promise.reject(new Error('请求失败'))
      }
    }
  },
  getters: {
    categoryView (state) {
      return state.detailList.categoryView || {}
    },
    skuInfo (state) {
      return state.detailList.skuInfo || {}
    },
    // 简化获取商品售卖属性列表
    spuSaleAttrList (state) {
      return state.detailList.spuSaleAttrList || []
    }
  }
}
