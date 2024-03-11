<template>
  <div>
    <NuxtLayout :class="computedClasses">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    <MixAlertBox />
  </div>
</template>

<script lang="ts" setup>
import { useFranchiseStore } from "@/store/franchise";

const preventUserInteraction = ref(false);

const { getAllFranchises } = useFranchiseStore();

const computedClasses = computed(() => {
  return preventUserInteraction.value ? "disable-user-interaction" : "";
});

// here declare all function/ codes which are need to called at client side initally
const loadInitialClientOnlyData = async () => {
  preventUserInteraction.value = true;
  await getAllFranchises();
  preventUserInteraction.value = false;
};

onMounted(() => {
  loadInitialClientOnlyData();
  // this composable handling the mobile disable
  useMobileDisabler()
});
</script>
