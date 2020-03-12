<template>
  <gride-view  :lineSpace="15" :v-margin="20" v-if="categoryDetail">
    <goods-list-item v-for="(item,index) in categoryDetail"
    :key="index"
    :goodsItem="item"></goods-list-item>
  </gride-view>
</template>

<script>
  import GrideView from 'components/common/gride/GrideView'
  import GoodsListItem from 'components/content/goods/GoodsListItem'

  export default {
    name: "TabContentDetail",
    components: {
      GrideView,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>