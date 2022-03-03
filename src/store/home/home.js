// home小仓库
import { reqCategoryList, reqBannerList, reqFloorList } from '../../api/index.js'

export default {
  namespaced: true,
  state: {
    categroyList: [],
    bannerList: [],
    floorList: []
  },
  mutations: {
    addCategoryList (state, value) {
      state.categroyList = value
    },
    // 操作state,储存store
    addBannerList (state, value) {
      state.bannerList = value
    },
    addFloorList (state, v) {
      state.floorList = v
    }
  },
  actions: {
    async categroyList (context) {
      const { data: res } = await reqCategoryList()
      context.commit('addCategoryList', res.data)
    },
    //  初始化banner数据 通过调用api接口
    async getBannerList (context) {
      const { data: ret } = await reqBannerList()
      context.commit('addBannerList', ret.data)
    },
    // 初始化floor数据 通过api
    async getFloorList (context) {
      const { data: ret } = await reqFloorList()
      context.commit('addFloorList', ret.data)
    }
  }
}
