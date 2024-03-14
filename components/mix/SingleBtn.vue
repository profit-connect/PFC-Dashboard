<template>
  <div class="mix-btn-group">
    <button
      @click="toggleData"
      :class="{'is-active': isActive}"
    >
      {{ activeLabel }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: number;
  labels: string[];
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, 'modelValue', emit);

// Assuming you want to toggle between two states for simplicity,
// if you have more states, this logic will need to be expanded.
const toggleData = () => {
  data.value = data.value === 1 ? 0 : 1; // Toggle between 0 and 1 (adjust based on your needs)
};

const isActive = computed(() => data.value === 1);
const activeLabel = computed(() => props.labels[data.value] || '');
</script>

<style lang="scss" scoped>
.mix-btn-group {
  button {
    color: #cccccc;
    padding: 8px 12px;
    margin-right: 10px;
    border: 2px solid #f1f2f2;
    border-radius: 10px;
    transition: $transitionSpeed;
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
</style>
