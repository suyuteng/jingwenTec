<template>
  <div class="">
    <div class="header-container ">
      <div >
        <div class="serch-container">
          <!-- 左侧品牌栏 -->
          <div class="box-conent">
            <div class="content-img">
              <el-image style="width: 100px; height: 60px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill"></el-image>
              <p>景文科技</p>
            </div>
            <div class="content-text">
              <p>工作时间：周一至周五8:00-18:00</p>
              <p>电话：400-38743-90</p>
            </div>
          </div>
          <!-- 右侧搜索栏 -->
          <div class="box-serch">
            <div style="margin-top: 30px">
              <el-input placeholder="请输入内容" v-model.trim="keywords" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="抗体" value="1"></el-option>
                  <el-option label="耗材" value="2"></el-option>
                  <el-option label="化学品" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="goSearch">搜索</el-button>
              </el-input>
              <!-- 搜索关键词 -->
              <div class="serch-content">
                <span><a href="">热门关键词</a></span>&nbsp;&nbsp;
                <span><a href="">家电</a></span>&nbsp;&nbsp;
                <span><a href="">手机</a></span>&nbsp;&nbsp;
                <span><a href="">超市</a></span>&nbsp;&nbsp;
                <span><a href="">服装</a></span>&nbsp;&nbsp;
              </div>
            </div>
          </div>
          <!-- 购物车结算 -->
          <div class="box-count" style="margin-top: 30px;">
            <el-button type="Danger" icon="el-icon-shopping-cart-full">结算</el-button>
            <el-button type="Success" icon="el-icon-truck">物流</el-button>
          </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      keywords: '',
      select: ''
    }
  },
  created () {
    // 自定义事件触发
    this.$bus.$on('clear', (v) => {
      this.keywords = ''
    })
  },
  methods: {
    goSearch () {
      const location = { name: 'search', params: { keyword: this.keywords || undefined } }
      if (this.$route.query) {
        location.query = this.$route.query
        this.$router.push(location)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.header-container{
  width: 100%;
  height: 110px;
  position: fixed;
  margin-top:30px;
  z-index: 1999;
  background-color: #F8F8FF;
  .serch-container{
      // background-color:gainsboro;
      width: 100%;
      height: 110px;
      // line-height: 110px;
      display: flex;
      justify-content: space-evenly;
      .box-conent{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .content-img{
          text-align: center;
          margin-right: 5px;
          font-weight: bold;
        }
        .content-text{
          font-size: 14px;
          font-style: italic;
          font-weight: bold;
        }
      }
    }
    .el-input-group{
      width: 400px;
    }
    .serch-content{
      margin-top: 5px;
      font-size: 12px;
      a{
        color:gainsboro;
      }
      a:hover{
        color: red;
      }
    }
}

</style>
