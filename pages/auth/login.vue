<template>
  <div class="card bg-white rounded-lg mt-5" style="width: 536px; ">
    <div class="card-body d-flex flex-column justify-content-center">
      <img
        src="~/assets/images/svg/logo-for-light.png"
        width="351"
        height="85"
        class="mx-auto"
        provider="none"
        aria-placeholder="Pro-Fit logo"
      />
      <FormLogin />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});
</script>

<style lang="scss" scoped>
.card-body {
  padding: 51px 92px 92px 76px;
  gap: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,.16);
}
</style>
