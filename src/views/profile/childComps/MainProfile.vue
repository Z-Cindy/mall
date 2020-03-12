<template>
  <profile-slot>
    <profile-item>     
      <span slot="number">0.00</span>
      <span slot="monad">元</span>
      <span slot="typeItem">我的余额</span>     
    </profile-item>
    <profile-item>     
      <span slot="number">0</span>
      <span slot="monad">个</span>
      <span slot="typeItem">我的优惠</span>     
    </profile-item>
    <profile-item>     
      <span slot="number">0</span>
      <span slot="monad">分</span>
      <span slot="typeItem">我的积分</span>     
    </profile-item>
  </profile-slot>
</template>

<script>
  import ProfileSlot from 'components/content/profileSlot/ProfileSlot'
  import ProfileItem from 'components/content/profileSlot/ProfileItem'
  export default {
    name: "MainProfile",
    components: {
      ProfileSlot,
      ProfileItem
    }
  }
</script>

<style scoped>
  .profile-number span:first-child {
    color: #fc7b53;
    font-size: 24px;
    font-weight: bold;
  }
  .profile-slot .profile-item:nth-child(2) {
    border-left: 2px solid #F2F2F2;
    border-right: 2px solid #F2F2F2;
  }
  .profile-item span:last-child {
    font-size: 12px;
  }
</style>