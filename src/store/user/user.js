// 注册与登录用户相关的小仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '../../api/index.js'
export default {
  namespaced: true,
  state: {
    code: '',
    token: localStorage.getItem('USERTOKEN'),
    userInfo: {}
  },
  mutations: {
    addCode (state, value) {
      state.code = value
    },
    // 登录成功保存用户token到本地持久储存
    addUserToken (state, value) {
      state.token = value.token
      localStorage.setItem('USERTOKEN', value.token)
    },
    addUserInfo (state, value) {
      state.userInfo = value
    },
    clearToken (state) {
      state.code = ''
      state.userInfo = {}
      console.log('heheh')
      localStorage.removeItem('USERTOKEN')
    }
  },
  actions: {
    // 获取后端验证码
    async getCode (context, phone) {
      const { data: ret } = await reqGetCode(phone)
      // 实际应用不用保存code,是后端发到手机号上
      if (ret.code === 200) {
        context.commit('addCode', ret.data)
        return 'ok'
      } else {
        Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
    async userRegister (context, data) {
      const { data: ret } = await reqUserRegister(data)
      if (ret.code === 200) {
        return 'ok'
      } else {
        Promise.reject(new Error('faile'))
      }
    },
    // 用户登录
    async userLogin (context, data) {
      const { data: ret } = await reqUserLogin(data)
      if (ret.code === 200) {
        context.commit('addUserToken', ret.data)
      } else {
        Promise.reject(new Error('faile'))
      }
    },
    // 获取已登录用户信息
    async getUserInfo (context) {
      // 需要token 已登录过的
      const { data: res } = await reqUserInfo()
      if (res.code === 200) {
        console.log(res.data)
        context.commit('addUserInfo', res.data)
      } else {
        Promise.reject(new Error('fail'))
      }
    },
    // 退出登录 通知服务器并清空本地储存
    async userLogout (context) {
      const { data: res } = await reqLogout()
      if (res.code === 200) {
        // action中不能操作state
        context.commit('clearToken')
      } else {
        Promise.reject(new Error('faile'))
      }
    }
  },
  getters: {
    userName (state) {
      return state.userInfo.name
    }
  }
}
