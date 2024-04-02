<template>
  <section class="content-section">
    <div class="content-box">
      <AccessLevelsAdmin 
      :levels="data"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const { currentUserType } = useAuthStore();
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

const { data, pending, refresh } = await useCustomFetch(
  "/accesslevels/get/accesslevels",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);

const refreshData = () => {
  refresh();
};
// import { computed } from 'vue';

// // Assuming 'data' is your reactive state that holds the fetched data
// const organizedAccessLevels = computed(() => {
//   const grouped = {};
  
//   data.value?.accesslevels.forEach((group) => {
//     Object.entries(group).forEach(([moduleName, functionalities]) => {
//       if (!Array.isArray(functionalities)) return;

//       // Initialize the module key in the grouped object if it doesn't exist
//       if (!grouped[moduleName]) {
//         grouped[moduleName] = [];
//       }
      
//       functionalities.forEach((func) => {
//         if (typeof func === 'object' && !Array.isArray(func)) {
//           grouped[moduleName].push(func);
//         } else if (Array.isArray(func)) {
//           // This handles nested arrays as found under the "Profiles" key
//           func.forEach(nestedFunc => {
//             if (nestedFunc.sub_module && !grouped[nestedFunc.sub_module]) {
//               grouped[nestedFunc.sub_module] = [];
//             }
//             grouped[nestedFunc.sub_module].push(nestedFunc);
//           });
//         }
//       });
//     });
//   });
  
//   return grouped;
// });

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