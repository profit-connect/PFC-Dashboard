<template>
  <div>
    <Teleport to="body" v-if="loading">
      <div
        style="
          position: fixed;
          top: 0;
          left: 0;
          background-color: #002e4b;
          height: 100vh;
          width: 100%;
          z-index: 9999;
          opacity: 0.9;
        "
      >
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          "
        >
          <img class="logo" src="~/assets/images/logo-home-small.png" />
          <div class="spinner mx-4"></div>
        </div>
      </div>
    </Teleport>

    <NuxtLayout :class="computedClasses">
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
  useMobileDisabler();
});
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<style>
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ffffff 94%, #0000) top/9px 9px
      no-repeat,
    conic-gradient(#0000 30%, #ffffff);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
