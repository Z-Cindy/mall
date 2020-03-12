<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']" ref="tabControl1" 
      @tabClick="tabClick"
      class="tab-controll"
      v-show="isTabFixed"
      ></tab-control>

    <scroll class="content" :probe-type="3"
    :pull-up-load="true"
     ref="scroll"
    @scroll="contentScroll"
    @pullingUp="loadMore"> 

      <home-swiper :banners="banners"
      @swiperImageLoad="swiperImageLoad"></home-swiper>

      <recommed-view :recommends="recommends"></recommed-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" ref="tabControl2" 
      @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick"
    v-show="isShowBackTop"></back-top>
  
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommedView from './childComps/RecommedView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import { debounce } from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {POP, NEW, SELL} from 'common/const'


  export default {
    name:'Home',
    components: {
      HomeSwiper,
      RecommedView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
    data () {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop' : {page: 0, list: []},
          'new' : {page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    destroyed () {
      console.log('home destroyed')
    },
    activated () {
      console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated () {
      console.log('deactivated');
      // 保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener )
    },
    created () {
      // 请求多个数据
      this.getHomeMultidata();

      // 请求商品数据
      this.getHomeGoods(POP);
      this.getHomeGoods(NEW);
      this.getHomeGoods(SELL);
      
    },
    mounted () {

    },
    methods: {
      /**
       * 事件监听相关的方法
       */
     
      tabClick(index) {
        console.log(index);
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
     
      contentScroll(position) {
        // 判断BackTop是否显示
        this.listenShowBackTop(position)
        // 2、决定tabControll是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh();
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res.data);
          this.banners = res.data.banner.list;
          console.log('轮播图：',this.banners)
          this.recommends = res.data.recommend.list;
        }) 
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          console.log(res.data);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top:44px;
    height: 100vh;
    position: relative;
  }
 .home-nav {
    /* 在导航原生滚动时，为了不让一起滚动 */
     position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    background-color: var(--color-tint);
    color: #fff;
  }
  

  .content {
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
   overflow: hidden;
  }
  .tab-controll {
    position: relative;
    z-index: 2
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top:44px;
  } */
</style>