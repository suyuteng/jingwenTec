import axios from 'axios'
const request = axios.create({
  baseURL: '/mock'
})
export default request
