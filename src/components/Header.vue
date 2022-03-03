<template>
  <div class="header-container">
    <!-- 导航栏登录注册信息相关 -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#F8F8FF"
      text-color="black"
      active-text-color="#ffd04b"
      router
      >
      <!-- 左侧官网介绍 -->
      <span>欢迎,来到景文科技！</span>
      <!-- 右侧功能区域 -->
      <el-menu-item index="1">收藏本站</el-menu-item>
      <el-submenu index="2">
        <template slot="title">客务服务</template>
        <el-menu-item index="2-1">大包装询价</el-menu-item>
        <el-menu-item index="2-2">COA|Datesheet</el-menu-item>
        <el-menu-item index="2-3">快速订购</el-menu-item>
      </el-submenu>
      <el-menu-item index="/center"><a>我的订单</a></el-menu-item>
      <el-menu-item index="/shopcart"><i class="el-icon-shopping-cart-1" style="color:red"></i>购物车</el-menu-item>
      <el-menu-item index="/regiest" v-if="!userName">注册</el-menu-item>
      <el-menu-item index="/login" style="border-right:1px solid #e6e6e6" v-if="!userName">登录</el-menu-item>
      <el-menu-item v-if="userName" @click="logout">退出</el-menu-item>
      <el-menu-item v-if="userName" style="border-right:1px solid #e6e6e6">{{userName}}</el-menu-item>
      <el-menu-item index="4" style="border-right:1px solid #e6e6e6"><i class="el-icon-postcard" style="color:#87CEFA"></i>会员中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    // 退出登录，调用api 并清空本地储存
    async logout () {
      console.log('退出')
      try {
        await this.$store.dispatch('user/userLogout')
        this.$router.push('/home')
      } catch (error) {
        this.$message.info(error)
      }
    }
  },
  computed: {
    ...mapGetters('user', ['userName'])
  }

}
</script>

<style lang="less" scoped>
.el-menu{
  height: 30px;
  line-height: 30px;
  position: fixed;
  margin: 0;
  width: 100%;
  z-index: 9999;
  span{
    font-size: 14px;
    margin-left: 80px;
  }
}
.el-menu--horizontal>.el-menu-item {
    float: right;
    height: 30px;
    line-height: 30px;
}
.el-menu--horizontal>.el-submenu {
    float: right;
    height: 30px;
    line-height: 30px;
}
/deep/.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 30px;
    line-height: 30px;
}
</style>>
