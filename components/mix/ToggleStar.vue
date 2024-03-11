<template>
  <div>
    <NuxtImg
      class="star-image"
      v-if="data"
      src="/images/svg/star-yellow.svg"
      @click="data = false"
      :height="size ?? 16"
      :width="size ?? 16"
      provider="none"
    />
    <NuxtImg
      class="star-image"
      :height="size ?? 16"
      :width="size ?? 16"
      v-else
      src="/images/svg/star-grey.svg"
      @click="data = true"
      provider="none"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
  size?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped>
.star-image {
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, .1215686275));
}
</style>
