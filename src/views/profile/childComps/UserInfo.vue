<template>
  <div id="user-info">
    <row>
      <i-col span="5">
        <div class="avator">
          <a href="javascript:;">
            <img src="~assets/img/profile/avatar.svg" alt="头像" />
          </a>
        </div>
      </i-col>
      <i-col span="14" class="sign">
        <div class="sign-in-up">
          <a href="javascript:;">登录/</a>
          <a href="javascript:;">注册</a>
        </div>
        <div class="sign-phone">
          <img src="~assets/img/profile/phone.svg" alt="">
          <a href="javascript:;">暂无绑定手机号码</a>
        </div>
      </i-col>
      <i-col span="5" class="more">
        <a href="javascript:;">&gt;</a>
      </i-col>
    </row>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  components: {}
};
</script>

<style scoped>
  #user-info {
    width: 100%;
    height: 90px;
    background-color: var(--color-tint);
    padding: 15px;
  }
  .avator {
    height: 60px;
    width: 60px;
  }
  .avator img {
    height: 100%;
  }
  .sign {
    padding:3px;
  }
  .sign-in-up a {
    color: #fff;
    font-size: 14px;
  }
  .sign-phone img {
    height: 25px;
    vertical-align: middle;
    margin-left: -5px;
  }
  .sign-phone a {
    color: #fff;
    font-weight: lighter;
  }
  .more {
    padding-right: 10px;
    text-align: right;
    line-height: 60px;
  }
  .more a {
    color: #fff;
    font-size: 16px;   
  }
</style>