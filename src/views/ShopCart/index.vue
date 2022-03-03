<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked==1" @change="changeState(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateHandler('mins',item,-1)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="item.skuNum" @change="updateHandler('input',item,$event.target.value*1)">
            <a href="javascript:void(0)" class="plus" @click="updateHandler('plus',item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteHandler(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" id="choose" type="checkbox" :checked="isChecked&&cartInfoList.length>0" @change="changeAllState" :disabled="cartInfoList.length===0">
        <label for="choose"><span>全选</span></label>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{count}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{total}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  created () {
    this.inintCarlist()
  },
  methods: {
    inintCarlist () {
      this.$store.dispatch('shopcar/getCarlist')
    },
    // 更新购物车数量商品数量 正数代表增加 负数代表减少,需要传递的是改变量
    // 注意需要知道商品id skuNum 和点击的是哪个商品按钮还是输入框
    updateHandler: throttle(async function (type, car, disNum) {
      switch (type) {
        case 'mins':
          // 减一考虑，skuNum不能小于1，小于则为1
          disNum = car.skuNum > 1 ? -1 : 0
          break
        case 'plus':
          disNum = 1
          break
        case 'input':
          // 变化量如果是非法的带字符isNaN 或者输入负数 或者小数点取整
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - car.skuNum
          }
          break
      }
      // 派发action向服务端发请求得到promise
      try {
        await this.$store.dispatch('detail/addOrUpdateCar', { skuId: car.skuId, skuNum: disNum })
        // 成功后再次发请求得到最新的数据
        this.inintCarlist()
      } catch (error) {
        console.log(error)
      }
    }, 500),
    // 改变选中状态
    async changeState (item, e) {
      const isChecked = e.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('shopcar/updateCheck', { skuId: item.skuId, isChecked })
        this.inintCarlist()
      } catch (error) {
        this.$message.success('error')
      }
    },
    // 改变所有产品的选中状态
    async changeAllState (e) {
      const isChecked = e.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('shopcar/updateAllCheck', isChecked)
        this.inintCarlist()
      } catch (error) {
        this.$message.success('error')
      }
    },
    // 删除某一个产品
    async deleteHandler (id) {
      try {
        await this.$store.dispatch('shopcar/removeCart', id)
        this.inintCarlist()
      } catch (error) {
        this.$message.success('error')
      }
    },
    // 删除全部产品,由于没有设置接口需要派发action来调用删除某一个产品api通过数组遍历来删
    async deleteAllCart () {
      try {
        await this.$store.dispatch('shopcar/removeAllCart')
        this.inintCarlist()
      } catch (error) {
        this.$message.success('error')
      }
    }
  },
  computed: {
    ...mapGetters('shopcar', ['cartList']),
    // 计算属性获取购物车数组数据
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    // 计算属性是否全选
    isChecked () {
      return this.cartInfoList.every(item => item.isChecked === 1)
    },
    // 计算总价格
    total () {
      return this.cartInfoList.filter(item => item.isChecked === 1).reduce(
        (sum, item) => { return (sum += item.skuNum * item.skuPrice) }, 0)
    },
    // 计算总商品
    count () {
      return this.cartInfoList.filter(item => item.isChecked === 1).reduce(
        (amt, item) => { return (amt += item.skuNum) }, 0
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
