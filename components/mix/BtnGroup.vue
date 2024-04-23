<template>
  <div class="mix-btn-group">
    <ul>
      <li
        v-for="(label, index) in labels"
        :key="index"
        @click="data = index + 1"
        :class="data === index + 1 ? 'is-active' : ''"
      >
        {{ label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// test 
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: number;
  labels: string[]
}>();
const emit = defineEmits(["update:modelValue"]);

const data:Ref<number> = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped>
.mix-btn-group {
  ul {
    list-style: none;
    display: flex;
    padding:0px;
    li {
      color: #cccccc;
      padding: 5px 18px;
      margin-right: 10px;
      border: 2px solid #f1f2f2;
      border-radius: 10px;
      text-decoration: none;
      transition: $transitionSpeed;
      height: fit-content;
      height: 35px;
      cursor: pointer;
      &:hover {
        border: 2px solid #c2c2c2;
      }

      &.is-active {
        color: #000000;
        border: 2px solid $main-blue;

        &:hover {
          border: 2px solid $main-blue;
        }
      }
    }
  }
}
</style>
