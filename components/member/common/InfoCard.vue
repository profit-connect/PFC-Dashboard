<template>
  <div class="member-common-info-card">
    <div class="d-flex justify-content-between gap-2">
      <span class="mb-2 fw-bold">{{ title }}</span>
      <span class="text-sm" v-if="titleValue">
        {{ titleValue }}
      </span>
    </div>
    <div
      class="d-flex justify-content-between text mb-1"
      :key="item.value"
      v-for="item in items"
    >
      <span>{{ item.label }}</span>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  titleValue: {
    type: String,
    default: "",
  },
  items: {
    type: Array<any>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.member-common-info-card {
  background: $main-bg;
  border-radius: 12px;
  padding: 8px 12px;
  .text {
    font-size: 12px;
  }
  .text-sm {
    font-size: 10px;
  }
}
</style>
