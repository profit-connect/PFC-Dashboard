<template>
  <section class="content-section">
    <div v-if="showFacilityForm">
      <FacilityAddStaff 
      @reload="refreshData"
      @staff-added="handleAddedStaff"
      />
    </div>
    <div v-else><FacilityUpdateStaff 
      :staff-id="selectedStaff"
      @reload="refreshData"
       />
      </div>

    <div class="content-box p-5">
      <div class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px">Management & Staff</h1>
        <MixButton
          style="background-color: #f2faff"
          @click="showFacilityForm = !showFacilityForm;"
          size="sm"
          label="New Staff"
        />
      </div>
      <div class="row g-0">
        <div
          class="col-2 col-sm-4"
          v-for="staff in computedStaff"
          :key="staff.id"
        >
          <CardStaff v-bind="staff" @click="onStaffSelect(staff.id)" />
        </div>
      </div>
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
  right: "-20px",
});

const showFacilityForm = ref(false);
const selectedStaff = ref("");

const { currentUserType } = useAuthStore();
const { data, pending, refresh } = await useCustomFetch<any>(
  "/staff/get/staff",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);
const refreshData = () => {
  console.log("jay")
  refresh();
};

const computedStaff = computed(() => {
  // Assuming the staff array is directly accessible within data.value
  const staffMembers = data.value?.staff;
  if (Array.isArray(staffMembers)) {
    return staffMembers
      .filter((member) => member) // Ensure member is not null or undefined
      .map((member) => ({
        id: member.id,
        firstname: member.firstname,
        lastname: member.lastname,
        email: member.email,
        dob: member.dob,
        gender: member.gender,
        country_code: member.country_code,
        contactno: member.contactno,
        img_src: member.img_src,
        created_date: member.created_date,
        updated_date: member.updated_date,
        role_id: member.role_id,
        role: member.role,
      }));
  } else {
    return [];
  }
});
const onStaffSelect = (staff_id: number) => {
  selectedStaff.value = staff_id
  //   data.value && data.value.categories && data.value.categories.length
  //     ? data.value.categories[activeTab.value].room.find(
  //         (item: any) => item && item.id === space_id.toString()
  //       )
  //     : null;
  // showSpaceForm.value = true;
};
function handleAddedStaff(staffId: number) {
  console.log("New staff ID:", staffId);
  selectedStaff.value = staffId;  // Update selected staff ID
  showFacilityForm.value = false; // Optionally, switch views
  refreshData();                  // Optionally, refresh the data if necessary
}
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
  min-height: calc(100vh - 50px);
  border-radius: 0px 0px 0px 0px;
  // margin-bottom: 50px;
}
</style>
