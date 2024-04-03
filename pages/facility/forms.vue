<template>
       <section class="content-section">
      
        <FacilityUpdate   />
       
      <div class="content-box">
        <div class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px">Forms</h1>
        <MixButton
          style="background-color: #f2faff"
          @click="showFacilityForm = true"
          size="sm"
          label="New Form"
        />
      </div>
      <Modal v-model="showFacilityForm" id="class-modal">
        <template #title>
            Create Waiver
        </template>
        <FormFacilityForm
          v-if="showFacilityForm"
        />
      </Modal>
      <h4 class="mt-4">Waivers</h4>
         <CardForms/>
      </div>
  
    </section>
   
  </template>
  <script lang="ts" setup> 
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
    { label: "Forms", link: "" }, 
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "70px",
 
});
  const showFacilityForm = ref(false);
 
  

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
  