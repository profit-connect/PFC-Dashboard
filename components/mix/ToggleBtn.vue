<template>
  <div class="mix-toggle-btn">
    <ul>
      <li
        @click="data = left"
        :class="data === left ? 'is-active left' : ''"
        :style="data === left ? computedStyle : ''"
      >
        {{ left }}
      </li>
      <li
        @click="data = right"
        :class="data === right ? 'is-active' : ''"
        :style="data === right ? computedStyle : ''"
      >
        {{ right }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
  left: string;
  right: string;
  rightColor?: string;
  leftColor?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
// test 

const data = useVModel(props, "modelValue", emit);

const computedStyle = computed(() => {
  return {
    backgroundColor:
      data.value === props.right ? props.rightColor : props.leftColor,
  };
});
</script>
<style lang="scss" scoped>
.mix-toggle-btn {
  ul {
    height: 35px;
    list-style: none;
    width: 72px;
    display: flex;
    align-items: center;
    background: #f2faff;
    border-radius: 10px;
    // padding: 4px;
    padding: 0px 0px; 
    height: fit-content;
    width: fit-content;
    li {
      color: #cccccc;
      padding: 4px 12px;
      text-decoration: none;
      cursor: pointer;
      width: 72px;
      text-align: center;
      justify-content: center;

      &.is-active {
        display: flex;
        align-items: center;
        height: 35px;
        color: #ffffff;
        text-decoration: none;
        border-radius: 10px;
        background: $main-blue;
        box-shadow: 0px 3px 6px #00000029;
      }
    }
  }
}
</style>
