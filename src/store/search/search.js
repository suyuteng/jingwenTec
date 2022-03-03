// search模块小仓库
import { reqSearchList } from '../../api/index.js'
export default {
  namespaced: true,
  state: {
    searchList: {}
  },
  mutations: {
    addSearchList (state, value) {
      state.searchList = value
    }
  },
  actions: {
    // 调用api接口获取search模块数据
    async getSearchList (context, params) {
      const { data: res } = await reqSearchList(params)
      if (res.code === 200) {
        context.commit('addSearchList', res.data)
      }
    }
  },
  // 计算属性 简化仓库中的数据
  getters: {
    attrsList (state) {
      // 防止网络出现问题请求不到数据返回一个空列表
      return state.searchList.attrsList
    },
    goodsList (state) {
      return state.searchList.goodsList
    },
    trademarkList (state) {
      return state.searchList.trademarkList
    }
  }
}
