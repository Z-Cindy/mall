<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './chidComps/DetailNavBar'
  import DetailSwiper from './chidComps/DetailSwiper'
  import DetailBaseInfo from './chidComps/DetailBaseInfo'
  import DetailShopInfo from './chidComps/DetailShopInfo'
  import DetailGoodsInfo from './chidComps/DetailGoodsInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
  export default {
    name: "Detail",
    components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     DetailGoodsInfo,
     Scroll
   },
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created () {
      
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo) 

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        console.log(this.paramInfo)

      })
    },
    methods: {
      imageLoad() {
        this.$refs.Scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 3;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 3;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>