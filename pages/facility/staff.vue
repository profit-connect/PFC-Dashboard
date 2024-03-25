<template>
  <section class="content-section">
    <div v-if="showFacilityForm"><FacilityAdd /></div>
    <div v-else><FacilityUpdate /></div>

    <div class="content-box">
      <div class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px">Management & Staff</h1>
        <MixButton
          style="background-color: #f2faff"
          @click="showFacilityForm = !showFacilityForm"
          size="sm"
          label="New Staff"
        />
      </div>
      <FacilityStaff />
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
    { label: "Staff", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "70px",
});

const showFacilityForm = ref(false);
const memberId = ref("");

const { currentUserType } = useAuthStore();

const {
  data: membersData,
  pending: membersPending,
  refresh: refreshMembers,
} = await useCustomFetch<any>("/members/get/members", {
  method: "POST",
  body: { facility_id: currentUserType?.id },
});

const getMembers = computed(() => {
  return membersData.value && membersData.value.members
    ? membersData.value.members
    : [];
});

const refreshData = () => {
  refreshMembers();
};
</script>

<style lang="scss" scoped>
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
