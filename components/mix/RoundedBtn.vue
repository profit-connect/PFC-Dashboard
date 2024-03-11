<template>
  <button class="mix-rounded-btn">
    <span class="content">{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>
// test 
defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.mix-rounded-btn {
  position: relative;
  display: inline-block;
  height: 44px;
  background: none;
  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100%;
    background: #000;
    border-top: 1px solid red;
    &::before {
      content: "";
      display: block;
      background: #000;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 0;
      left: -10px;
      transform: skew(-10deg);
      border-radius: 8px 0 0 0;
      z-index: -1;
      border: 1px solid red;
    }
    &::after {
      content: "";
      display: block;
      background: #000;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 0;
      right: -10px;
      transform: skew(10deg);
      border-radius: 0px 8px 0 0;
      z-index: -1;
      border: 1px solid red;
    }
  }
}
</style>
