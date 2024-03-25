<template>
  <section class="content-section">
    <FacilityUpdate />
    <div class="content-box">
      <FacilityTags
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useBreadcrumbStore } from "~/store/breadcrumb";
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();
setBreadcrumbTab({
    items: [
      {
        label: "General",
        link: `/facility`,
      },
      { label: "Timing", link: `/facility/timing` },
      { label: "Staff", link: `/facility/staff` },
      { label: "Forms", link: `/facility/forms` },
      { label: "Tags", link: `/facility/tags` },
      // { label: "Payments", link: `/facility/payments` },
      // { label: "Discount Codes", link: `/facility/discount` },
      // { label: "Tax", link: `/facility/tax` },
      // { label: "Activity", link: `/facility/activity` },
    ],
  });

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Facility", link: "" },
    { label: "Tags", link: "" }, 
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
  width: 70vw;
  max-width: 950px;
  margin: unset;
  height: fit-content;
  min-height: calc(100vh - 129px);
  margin-bottom: 50px;
}
</style>