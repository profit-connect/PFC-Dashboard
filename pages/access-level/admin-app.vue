<template>
    <section class="content-section">
      <div class="content-box">
  <p>admin-app</p>
</div>
   </section>
  </template>
  
  <script lang="ts" setup>
  // import { useAuthStore } from "~/store/auth";
  import { useBreadcrumbStore } from "~/store/breadcrumb";
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();
setBreadcrumbTab({
    items: [
      { label: "Web Dashboard", link: `/access-level` },
      { label: "Admin App", link: `/access-level/admin-app` },
  
    ],
  });

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    // { label: "Facility", link: "" },
    // { label: "Tags", link: "" }, 
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "70px",
 
});


  </script>
  
  <style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}

.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}

.content-box {
  position: relative;
  width: 75vw;
  max-width: 1396px;
  margin: unset;
  height: fit-content;
  min-height: calc(100vh - 129px);
  margin-bottom: 50px;
}
  </style>