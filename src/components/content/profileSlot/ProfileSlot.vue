<template>
  <div class="profile-slot">
   <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ProfileSlot"
  }
</script>

<style scoped>
  .profile-slot {
    display: flex;
    justify-content: center;
  }
</style>