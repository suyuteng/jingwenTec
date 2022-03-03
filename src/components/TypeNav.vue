<template>
  <!-- 商品分类导航 -->
  <div class="type-nav"  @mouseleave="changeIndex">
    <div class="container">
      <h2 class="all" @mouseenter="showTab">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show" >
        <div class="all-sort-list2"  @click="goSearch">
          <div class="item" v-for="(c1, index) in categroyList" :key="c1.categoryId" >
            <h3 @mouseenter="changeBcolorIndex(index)" :class="typeNavIndex===index?'cur':''">
              <!-- 通过自定义属于区分点击的是哪个标签 -->
              <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix" :style="{display:typeNavIndex===index?'block':'none'}">
              <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  // 发请求数据初始化
  data () {
    return {
      // 用于控制三级菜单中一级菜单显示背景颜色
      typeNavIndex: -1,
      show: false
    }
  },
  mounted () {
    // 判断路由是否不是home 如果不是直接隐藏
    if (this.$route.path === '/home') {
      this.show = true
    }
  },
  computed: {
    // ...mapState('home', ['categroyList'])
    ...mapState({
      categroyList: (state) => {
        return state.home.categroyList
      }
    })
  },
  methods: {
    // 使用节流函数
    changeBcolorIndex: throttle(function (index) {
      this.typeNavIndex = index
    }, 50),
    changeIndex () {
      this.typeNavIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 编程式路由跳转
    goSearch (e) {
      const { categoryname, category1id, category2id, category3id } = e.target.dataset
      // 如果点击了a标签 进行路由跳转
      if (categoryname) {
        // 构造路由跳转对象和参数
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // this.$router.push(location)
        // 先判断路由是否有params 有的话合并
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    showTab () {
      this.show = true
    }
  }
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 550px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          .cur{
            background-color: skyblue;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                // &.fore {
                //   border-top: 0;
                // }

                dt {
                  float: left;
                  width: 60px;
                  line-height: 22px;
                  text-align: left;
                  padding: 3px 6px 0 0;
                  font-weight: 600;
                  font-size: 15px;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    .sort-enter{
      height: 0px;
    }
    .sort-enter-to{
      height: 550px;
    }
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>
