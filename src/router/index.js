import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由组件
import Home from '../views/index/Home.vue'
import Login from '../views/Login/index.vue'
import Regiest from '../views/Register/index.vue'
import Search from '../views/search/Search.vue'
import Detail from '../views/Detail/index.vue'
import AddCartSuccess from '../views/AddCartSuccess/index.vue'
import ShopCart from '../views/ShopCart/index.vue'
import Trade from '../views/Trade/index.vue'
import Pay from '../views/Pay/index.vue'
import PaySuccess from '../views/PaySuccess/index.vue'
import Center from '../views/Center/index.vue'
import UserCenter from '../views/Center/UserCenter/index.vue'
import TeamCenter from '../views/Center/TeamCenter/index.vue'

// 引入store获取已经登录用户信息
import store from '../store'

Vue.use(VueRouter)
// 个人中心二级路由
const centerRoutes = [
  { path: 'usercenter', name: 'usercenter', component: UserCenter, meta: { footFlag: true } },
  { path: 'teamcenter', name: 'teamcenter', component: TeamCenter, meta: { footFlag: true } }
]

const routes = [
  { path: '*', redirect: '/home' },
  { path: '/home', name: 'home', component: Home, meta: { footFlag: true } },
  { path: '/login', name: 'login', component: Login, meta: { footFlag: false } },
  { path: '/regiest', name: 'regiest', component: Regiest, meta: { footFlag: false } },
  { path: '/search/:keyword?', name: 'search', component: Search, meta: { footFlag: true } },
  { path: '/detail/:id?', name: 'detail', component: Detail, meta: { footFlag: true } },
  { path: '/AddCartSuccess', name: 'AddCartSuccess', component: AddCartSuccess, meta: { footFlag: true } },
  { path: '/shopcart', name: 'shopcart', component: ShopCart, meta: { footFlag: true } },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: { footFlag: true },
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: { footFlag: true },
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: PaySuccess,
    meta: { footFlag: true },
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  { path: '/center', redirect: '/center/usercenter', name: 'center', component: Center, meta: { footFlag: true }, children: centerRoutes }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // 先判断是否有登录token
  const token = localStorage.getItem('USERTOKEN')
  // 登录了
  if (token) {
    // 登录后不能再去login和register路由了
    if (to.path === '/login' || to.path === '/regiest') {
      next(false)
      // 正常登录后的路由 获取用户信息展示
    } else {
      const username = store.state.user.userInfo.name
      // 已经有用户信息的直接放行
      if (username) {
        next()
      } else {
        // 没有用户信息的路由组件派发action 获取用户信息
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          console.log(error)
          // token失效清空重新登录
          await store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录不能访问交易页 支付页 个人信息中心 跳转登录页
    const toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      // 跳转登录页需要知道是想去那个路由的做一下跳转
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
export default router
