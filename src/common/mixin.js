import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop';
import { BACK_POSOTION } from 'common/const'
import { POP, NEW, SELL } from 'common/const'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListner:null,
      refresh:null
    }
  },
  mounted () {
    //这个地方img标签确实被挂载，但是其中的图片还没有占据高度
       
     // this.$refs.scroll.refresh对这个函数进行防抖操作
      this.refresh = debounce(this.$refs.scroll.refresh,200) 

     // 监听并保存
     this.itemImgListener = () => {
       this.refresh()
     }

     this.$bus.$on('itemImageLoad', this.itemImgListener ) 

     // 获取tabControl的offsetTop
     // 所有的组件都有一个属性$el：用于获取组件的元素

   }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }
}