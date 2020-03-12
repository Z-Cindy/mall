<template>
  <div class="tab-content">
    <gride-view :cols="3"
    :line-space="15"
    :v-margin="20"
    v-if="categoriesProduct">
    <div class="content-item" 
    v-for="(item,index) in categoriesProduct" :key="index">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </div>
    </gride-view>
  </div>
</template>

<script>
  import GrideView from 'components/common/gride/GrideView'
  export default {
    name: "TabContent",
    components: {
      GrideView
    },
    props: {
      categoriesProduct: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .content-item {
    text-align: center;
    font-size: 12px;
  }
  .content-item img {
    width: 80%;
  }
  .content-item div {
    margin-top: 15px;
  }
</style>