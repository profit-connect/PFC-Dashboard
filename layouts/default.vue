<template>
  <div class="disable-scorllbar">
    <NavigationHeader ref="navigationEl" />
    <NavigationBreadcrumb ref=" breadcrumbEl" />
    <main :style="`height:${height}`">
      <NuxtPage />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";
const navigationEl = ref(null);
const breadcrumbEl = ref(null);
const { height: navigationElHeight } = useElementSize(navigationEl);
const { height: breadcrumbElHeight } = useElementSize(breadcrumbEl);
const height = ref("100vh");
onMounted(() => {
  height.value = `calc(100vh - ${
    navigationElHeight.value + breadcrumbElHeight.value
  }px)`;
});
</script>
