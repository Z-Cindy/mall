<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"  
    ref="scroll" 
    @scroll="contentScroll" 
    :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :param-info="itemParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart"/>

    <back-top @click.native="backClick"
    v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './chidComps/DetailNavBar'
  import DetailSwiper from './chidComps/DetailSwiper'
  import DetailBaseInfo from './chidComps/DetailBaseInfo'
  import DetailShopInfo from './chidComps/DetailShopInfo'
  import DetailGoodsInfo from './chidComps/DetailGoodsInfo'
  import DetailParamsInfo from './chidComps/DetailParamsInfo'
  import DetailCommentInfo from './chidComps/DetailCommentInfo'
  import DetailBottomBar from './chidComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail'
  import {itemListenerMixin ,backTopMixin} from 'common/mixin'
  import { debounce } from 'common/utils'

  import { mapActions } from 'vuex';


  export default {
    name: "Detail",
    components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     DetailGoodsInfo,
     DetailParamsInfo,
     DetailCommentInfo,
     DetailBottomBar,
     Scroll,
     GoodsList
   },
   mixins: [itemListenerMixin ,backTopMixin],
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [0,200,900,2000],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created () {
      
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo) 

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.itemParams = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        console.log(this.itemParams)

        // 6.获取评论信息
        console.log(data);
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      /*
        第一次获取值不对
        原因：this.$refs.params.$el没有渲染
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
     

       
        this.$nextTick( () => {
          // 第二次获取值不对原因图片没有计算在内
          // 根据最新数据，对应的DOM是已经被渲染出来了，但是图片依然没有加载完（目前获取到的offsetTop不包括图片）
        // offsetTop值不对的时候，一般都是因为图片的问题
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        })
         */

      })

      // 3.请求详情推荐数据
      getRecommend().then(res => {
        console.log(res.data)
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值（对这个操作进行防抖）
      this.getThemeTopY = debounce( ()=> {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },200)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

         this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) {
        // 获取y值
        const positionY = -position.y

        // 2.positionY和主题中值进行对比
        // [0,7928,9233,9456]
        // positionY 在 0 和 7928之间 ，index = 0 
        // positionY 在 7928 和 9233之间 ，index = 1 
        // positionY 在 9233 和 9456之间 ，index = 2 
        // positionY 在 大于9456 ，index = 3 

        let length = this.themeTopYs.length
        for(let i = 0;i < length - 1; i++) {
          if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
          // if(this.currentIndex !==i && ((i <length - 1 && positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1]) || (i ==length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex;
          // }
        }

        this.listenShowBackTop(position)
      },
      addToCart() {
        // 获取购物车需要展示的信息
        const product = {} 
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里
        //  this.$store.commit('addCart',product)
        //  this.$store.dispatch('addCart', product).then(res => {
        //    console.log(res)
        //  })
        this.addCart(product).then(res => {
          this.$toast.show(res,2000)
        })
      }
    },
    mounted () {
     
    },
    updated () {
     
    },
    deactivated () {
       this.$bus.$off('itemImgLoad',this.itemImgListner)
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