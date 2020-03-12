<template>
  <div class="toast" v-show="isShow">
    <div>{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",

    data () {
      return {
        msg: '',
        isShow: false
      }
    },
    methods: {
      show(msg='默认文字',duration=2000) {
        this.msg = msg;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.msg = ''
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 8px;
    z-index: 99;
    color: #fff;

    background-color: rgba(0,0,0,0.7);
  }
</style>