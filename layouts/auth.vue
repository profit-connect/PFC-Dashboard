<template>
  <div class="auth-layout disable-scorllbar">
    <div class="top-bar position-fixed top-0 w-100"></div>
    <main class="d-flex justify-content-center align-items-center vh-100">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  .top-bar {
    height: 104px;
    background: $main-dark-blue;
  }
}
</style>
