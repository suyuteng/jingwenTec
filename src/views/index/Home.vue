<template>
  <div>
    <!-- 导航栏 -->
    <type-nav></type-nav>
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="item in floorList" :key="item.id" :list="item" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Brand from './Brand/Brand'
import Floor from './Floor/Floor'
import Like from './Like/Like'
import ListContainer from './ListContainer/ListContainer'
import Rank from './Rank/Rank'
// import TodayRecommend from './TodayRecommend/TodayRecommend'
export default {
  name: 'Home',
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank
  },
  created () {
    // 初始化floor数据
    this.$store.dispatch('user/getUserInfo')
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState('home', ['floorList'])
  }
}
</script>

<style>

</style>
