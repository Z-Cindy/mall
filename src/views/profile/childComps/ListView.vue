<template>
  <div class="list">
    <div class="item" v-for="(item,index) in listData" :key="index">
      <span class="icon">
        <svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
      </span>
      <div class="info">
        {{item.info}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    margin-top: 10px;
    background-color: #fff;
  }
  .item {
    position: relative;
    height: 44px;
    line-height: 44px;
    margin-left: 40px;
  }
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -30px;
    z-index: 2;
  }
  .icon svg {
   height: 20px;
   width: 20px;
  }
  .item  {
    border-bottom: 1px solid #F2F2F2;
  }
  .list .item:last-child {
    border-bottom: none;
  }
</style>