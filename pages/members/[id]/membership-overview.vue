<template>
  <section class="content-section">
    <!-- <SidebarUpdateMember v-model:member-id="memberId" /> -->

    <SidebarMembershipOverview v-model:member-id="memberId" />
  </section>
</template>

<script lang="ts" setup>
const memberId = useRoute().params.id;
import { useBreadcrumbStore } from "~/store/breadcrumb";
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Profiles", link: "/" },
    { label: "Attendance", link: "/profiles" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "-20px",
});
setBreadcrumbTab({
  items: [
    {
      label: "Membership",
      link: {
        path: "/members/details/membership-overview",
        query: { id: memberId.value },
      },
    },
    {
      label: "Payment",
      link: {
        path: "/members/details/payment",
        query: { id: memberId.value },
      },
    },
    {
      label: "Attendance",
      link: {
        path: "/members/details/attendance",
        query: { id: memberId.value },
      },
    },
    {
      label: "Transformation",
      link: {
        path: "/members/details/transformations",
        query: { id: memberId.value },
      },
    },
    {
      label: "Notes",
      link: {
        path: "/members/details/notes",
        query: { id: memberId.value },
      },
    },
  ],
});

</script>
<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}
</style>
