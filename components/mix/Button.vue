<template>
  <button
    class="d-flex gap-2 justify-content-center align-items-center"
    :class="computedClasses"
  >
    <NuxtImg
      v-if="!disableIcon"
      :src="computedIcon"
      :height="iconSize.height"
      :width="iconSize.width"
      provider="none"
    /> 
    <img v-if="svg" src="~assets/images/svg/magic-wand.svg" alt="Icon" /> {{ label }} <span v-if="time" class="small-title-bold">{{ time }}</span> 
  </button>
</template>

<script lang="ts" setup>
// test 
import type {
  IButtonSize,
  IButtonVariant,
  IButtonType,
} from "@/types/mix/button";

const props = defineProps({
  type: {
    type: String as PropType<IButtonType>,
    default: "add",
  },
  variant: {
    type: String as PropType<IButtonVariant>,
    default: "primary",
  },
  label: {
    type: String,
    default: "Add",
  },
  disableIcon: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<IButtonSize>,
    default: "sm",
  },
  time: {
    type: String as PropType<IButtonSize>,
    default: "",
  },
  svg: {
    type: String as PropType<IButtonSize>,
    default: "",
  },
});

// extend this computed props if need other icon
const computedIcon = computed(() => {
  switch (props.type) {
    case "add":
      return "/images/svg/plus-icon.svg";
  }
});

const iconSize = computed(() => {
  return props.size === "sm"
    ? { height: 16, width: 16 }
    : { height: 50, width: 50 };
});

const computedClasses = computed(() => {
  return [props.variant, props.size];
});
</script>

<style lang="scss" scoped>
button {
  padding: 8px 8px;
  border: none;
  outline: none;
  background: none;
  border-radius: 10px;
  &.primary {
    &:hover {
      opacity: 0.7;
    }
  }

  &.secondary {
    background-color: $main-bg;
    &:hover {
      background-color: $hover-blue;
    }
  }

  &.lg {
    font-size: 22px;
  }
}
</style>