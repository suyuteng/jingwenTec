import request from '../utils/request.js'
import requestMock from '../utils/requestMock.js'

// 三级联动菜单封装api请求

export const reqCategoryList = () => {
  return request.get('/product/getBaseCategoryList')
}

// 获取banner api接口
export const reqBannerList = () => {
  return requestMock.get('/banner')
}
//
// 获取floor数据 api接口
export const reqFloorList = () => {
  return requestMock.get('/floor')
}
// 获取search数据 api接口 post方法 需要参数至少是个空对象
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
export const reqSearchList = (params) => {
  return request.post('/list', params)
}

// 获取detail数据 api接口 /api/item/{ skuId }
export const reqDetailList = (skuId) => {
  return request.get(`/item/${skuId}`)
}

// 发送POST 购物车(添加或更新)到服务器/api/cart/addToCart/{ skuId }/{ skuNum } (在请求头中需要加入UUID的标识;请求头的名称叫userTempId)
export const reqAddCar = (skuId, skuNum) => {
  return request.post(`/cart/addToCart/${skuId}/${skuNum}`)
}
// 获取游客购物车列表 /api/cart/cartList
export const reqCarlist = () => {
  return request.get('/cart/cartList')
}
// 删除购物车产品api /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCart = (skuId) => {
  return request.delete(`/cart/deleteCart/${skuId}`)
}
// 切换商品选中状态 api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCart = (skuId, isChecked) => {
  return request.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
// 获取验证码api /api/user/passport/sendCode/phone GET
export const reqGetCode = (phone) => {
  return request.get(`/user/passport/sendCode/${phone}`)
}
// 用户注册api /api/user/passport/register 参数：phone password code nickName
export const reqUserRegister = (data) => {
  return request.post('/user/passport/register', data)
}
// 用户登录api /api/user/passport/login POST phone password
export const reqUserLogin = (data) => {
  return request.post('/user/passport/login', data)
}
// 获取登录用户信息api /api/user/passport/auth/getUserInfo GET
export const reqUserInfo = () => {
  return request.get('/user/passport/auth/getUserInfo')
}
// 退出登录 /api/user/passport/logout GET
export const reqLogout = () => {
  return request.get('/user/passport/logout')
}
//  获取用户地址信息/api/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => {
  return request('/user/userAddress/auth/findUserAddressList')
}
// 获取订单交易页信息 /api/order/auth/trade GET
export const reqOrderInfo = () => {
  return request.get('/order/auth/trade')
}
// 提交订单结算 /api/order/auth/submitOrder?tradeNo={tradeNo} post
// {
//   "consignee": "admin",
//   "consigneeTel": "15011111111",
//   "deliveryAddress": "北京市昌平区2",
//   "paymentWay": "ONLINE",
//   "orderComment": "xxx",
//   "orderDetailList": []
// }
export const reqSubmintOrder = (tradeNo, data) => {
  return request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => {
  return request.get(`/payment/weixin/createNative/${orderId}`)
}
// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqOrderPayState = (orderId) => {
  return request.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

// 获取我的订单列表 /api/order/auth/{page}/{limit} GET
export const reqOrderList = (page, limit) => {
  return request.get(`/order/auth/${page}/${limit}`)
}
