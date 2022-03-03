import { v4 as uuidv4 } from 'uuid'
// uuid生成器函数 单例模式把 uuid永久储存到localstorge中
export const createUUid = () => {
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  if (!uuidToken) {
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
