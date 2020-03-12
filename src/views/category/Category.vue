<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center" >分类</div>
    </nav-bar>
    
    <div class="content">
      <tab-menu :categories="categories" 
      @selectItem="selectItem"/>
      
      <scroll class="tab-content">
        <tab-content :categoriesProduct="categoriesProduct" />

        <tab-control :titles="['综合','新品','销量']"
        @tabClick="tabClick"/>

        <tab-content-detail :categoryDetail="showCategoryDetail"/>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'

  import TabMenu from './childComps/TabMenu'
  import TabContent from './childComps/TabContent'
  import TabContentDetail from './childComps/TabContentDetail'

  import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
  import { POP, NEW, SELL } from 'common/const'
  import { tabControlMixin } from 'common/mixin'
  
  export default {
    name:'Category',
    components: {
      NavBar,
      Scroll,
      TabControl,
      TabMenu,
      TabContent,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
      return {
        scroll: null,
        msg:'',
        intervalId: null,
        categories: [],
        categoriesProduct: [],
        categoryData: {},
        currentIndex: -1
      }
    },
    computed: {
      showSubcategory() {
        if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].categories
      },
      showCategoryDetail() {
        if(this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this._getCategory();
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list;
          // 初始化每个类别的子数据
          for(let i = 0;i < this.categories.length; i++) {
            this.categoryData[i] = {
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类数据
          this._getSubcategory(0)
        })
      },
      _getSubcategory(index) {
        this.currentIndex = index;
        const maitKey = this.categories[index].maitKey;
        getSubcategory(maitKey).then(res => {
          this.categoriesProduct = res.data.list;
          this.categoryData[index].subcategories = res.data;
          this.categoryData = {...this.categoryData};
          this._getCategroyDetail(POP)
          this._getCategroyDetail(NEW)
          this._getCategroyDetail(SELL)
        })
      },
      _getCategroyDetail(type) {
        // 获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求，传入miniWallkey和type
        getCategoryDetail(miniWallkey,type).then(res => {
          // 将获取数据保存起来
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData}
        })
      },
      dialog() {
        this.intervalId = setInterval(() => {
          let start = this.msg.substring(0,1);
          var end = this.msg.substring(1);
          this.msg = end + start;
        }, 400)
      },
      selectItem(index) {
        this._getSubcategory(index)
      }
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .category {
    height: 100vh;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex
  }
  .tab-content {
    flex: 1;
    height: 100%;
  }
</style>