<template>
  <div id="profile">
    <nav-bar class = "nav-bar">
      <div slot='center'>
        我的
      </div>
    </nav-bar>
    <user-info/>
    <div>
      <main-profile/>
    </div>

    <list-view :list-data="orderList"/>
    <list-view :list-data="serviceList"/>
    <list-view :list-data="moreList"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import UserInfo from './childComps/UserInfo'
  import MainProfile from './childComps/MainProfile'
  import ListView from './childComps/ListView'

  export default {
    name:'Profile',
    components: {
      NavBar,
      UserInfo,
      MainProfile,
      ListView
    },
    data() {
      return {
         orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ],
        moreList:[
          {icon: '#expired', iconColor: '#ff8198', info: '设置'},
          {icon: '#vip', iconColor: '#ff8198', info: '更多'},
        ]
      }
    },
  }
</script>

<style scoped>
  #profile {
    background-color: #F2F2F2;
    height: 100vh;
  }
  .nav-bar {
     background-color: var(--color-tint);
     color: #fff;
  }
</style>