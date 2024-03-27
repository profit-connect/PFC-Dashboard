<template>
  <div class="pack-input-box">
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
.pack-input-box {
  min-height: 700px;
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
