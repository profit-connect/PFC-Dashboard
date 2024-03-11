<template>
  <div class="min-input-box">
    <div class="title">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
// test 
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.min-input-box {
  border: 2px solid $main-blue;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  .title {
    font-family: $font-family-title;
    margin-bottom: 8px;
  }
}
</style>
