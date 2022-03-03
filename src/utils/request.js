import axios from 'axios'
import store from '../store/shopcar/shopcar.js'
import store1 from '../store/user/user.js'
// import { Loading } from 'element-ui'
const request = axios.create({
  baseURL: '/api'
})
// axios 拦截器实现loading效果
// let loadingInstance1 = null
request.interceptors.request.use((config) => {
  // loadingInstance1 = Loading.service({
  //   fullscreen: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading'
  // })
  if (store.state.uuidToken) {
    config.headers.userTempId = store.state.uuidToken
  }
  if (store1.state.token) {
    config.headers.token = store1.state.token
  }
  return config
})
request.interceptors.response.use((response) => {
  // loadingInstance1.close()
  return response
})
export default request
