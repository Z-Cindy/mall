<template>
  <div class="profile-item">
    <p class="profile-number">
      <slot name="number"></slot>
      <slot name="monad"></slot>
    </p>
    <p>
      <slot name="typeItem"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfileItem"
};
</script>

<style scoped>
.profile-item {
  height: 84px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>