<template>
  <div class="footer-container">
    <!-- 底部footer组件 -->
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <div class="foot">
        <!-- footer图片区域 -->
        <ul class="foot_ul">
            <li><img src="https://www.yifanglab.com/Site/Default/theme/images/foot_ul1.png">100%正品保障 </li>
            <li><img src="https://www.yifanglab.com/Site/Default/theme/images/foot_ul2.png">积分商城兑换 </li>
            <li><img src="https://www.yifanglab.com/Site/Default/theme/images/foot_ul3.png">满1000元包邮 </li>
        </ul>
        <!-- 连接内容 -->
        <div class="footer">
        <div class="footer_li">
            <p class="tit">网站地图</p>
            <div class="footer_info">
                <ul class="foot_li">
                    <li id="li1"><a href="https://www.jingwentec.com/class/view?id=52">关于景文</a></li>
                    <li id="li2"><a href="https://www.jingwentec.com/class/view?id=11">品牌中心</a></li>
                    <li id="li3"><a href="https://www.jingwentec.com/class/view?id=53">产品资讯</a></li>
                    <li id="li4"><a href="https://www.jingwentec.com/class/view?id=54">新闻中心</a></li>
                    <li id="li5"><a href="https://www.jingwentec.com/class/view?id=55">技术资料</a></li>
                    <li id="li6"><a href="https://www.jingwentec.com/class/view?id=15">视频中心</a></li>
                    <li id="li7"><a href="https://www.jingwentec.com/class/view?id=14">购物帮助</a></li>
                    <li id="li8"><a href="https://www.jingwentec.com/class/view?id=13">积分商城</a></li>
                    <li id="li9"><a href="https://www.jingwentec.com/class/view?id=16">联系我们</a></li>
                </ul>
            </div>
            </div>
            <div class="footer_li">
                <p class="tit">购物帮助</p>
                <div class="footer_info">
                    <ul class="foot_li">
                        <li><a href="https://www.jingwentec.com/class/view?id=24">注册与登录</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=25">商品与订单</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=26">配送与送货</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=27">支付与发票</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer_li">
                <p class="tit">售后服务</p>
                <div class="footer_info">
                    <ul class="foot_li">
                        <li><a href="https://www.jingwentec.com/class/view?id=31">售后政策</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=32">价格保护</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=33">退款说明</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=34">返修/退换货</a></li>
                        <li><a href="https://www.jingwentec.com/class/view?id=35">取消订单</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer_li">
                <p class="tit">联系我们:</p>
                <div class="footer_info">
                    <ul class="foot_content">
                        <li ><span class="s1"><img src="">电话：</span><div>010-34793264</div></li>
                        <li><span class="s1"><img src="">地址：</span><div>北京市昌平区东小口镇创业八街18号</div></li>
                        <li ><span class="s1"><img src="">邮箱：</span><div>support@jingwen.com</div></li>
                    </ul>
                </div>
            </div>
            <div class="foot_er">
                <img src="../assets/logo.png" alt="" width="100px" height="100px">
                <p class="er">扫描手机网站二维码</p>
            </div>
        <div class="foot_er">
                <img src="../assets/logo.png" alt="" width="100px" height="100px">
                <p class="er">扫描公众号二维码</p>
            </div>
        </div>
        <div class="foot_bottom">
            <div class="copyright">Copyright © 景文科技有限公司 <a href="" target="_blank" style="color:#fff;">京ICP备324325号-1</a></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
a{
  display: block;
  font-size: 14px;
  padding: 5px;
}
.footer-container{
  // position: absolute;
  // bottom: 0px;
  width:100%
}
.foot_ul{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0px 10px;
}
.footer{
  display: flex;
  justify-content: space-around;
  .footer_info{
  display: flex;
  flex-direction: inherit;
  align-items: center;
  .foot_content{
    font-size: 14px;
  }
}
}
.tit{
    font-weight: bold;
    margin-bottom: 10px;
  }
.foot_bottom{
  background-color:#595656 ;
  text-align: center;
  height: 50px;
  width: 100%;
}
</style>
