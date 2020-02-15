<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
import TabBarItem from './TabBarItem.vue'
export default {
  name:'TabBar',
  components: {
    TabBarItem
  }
}
</script>

<style lang="less" scoped>
   #tab-bar {
    display: flex;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 2px rgba(238, 236, 236, 0.2);
  }
</style>