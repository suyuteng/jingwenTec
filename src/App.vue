<template>
  <div id="app">
    <!-- 导航栏 -->
    <Header></Header>
    <!-- 内容区域路由站位 -->
    <Search></Search>
    <div class="content-container">
      <router-view></router-view>
    </div>
    <!-- 底部栏 -->
    <Footer v-if="$route.meta.footFlag"></Footer>

  </div>
</template>
<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Search from './components/Search.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    Header,
    Footer,
    Search
  },
  mounted () {
    this.$store.dispatch('home/categroyList')
  }
}
</script>

<style lang="less" scoped>
.content-container{
  padding-top: 140px;
}
</style>
