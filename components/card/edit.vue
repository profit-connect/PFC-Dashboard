<template>
  <div
    class="card-edit position-relative px-3 py-2"
    :class="active ? 'active' : ''"
  >
    <button type="button" class="btn position-absolute end-0 top-0 border-0">
      <NuxtImg
        src="/images/svg/edit-icon.svg"
        height="18"
        width="18"
        provider="none"
        @click="$emit('edit')"
      />
    </button>
    <div class="p-1 pt-2">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["edit"]);
</script>

<style lang="scss" scoped>
.card-edit {
  background-color: $main-bg;
  border-radius: 10px;
  border: 1px solid transparent;
  &.active {
    border: 1px solid $main-blue;
  }
  img {
    &:hover {
      opacity: 0.9;
      transform: scale(1.01);
      transition: all 200ms ease-in;
    }
  }
}
</style>
