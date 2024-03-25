
<template>
    <div class="container bg-white h-full p-4">
      <div class="content__title-box">
        <div class="content-left">
          <div>
            <h1>Roles</h1>
          </div>
          <div class="addNewBtn addNewPackage createRow" @click="onAddNewRole">
            <div class="plus">+</div>
            <div class="text-add">&nbsp;New Role</div>
          </div>
        </div>
        <div>
         <div class="d-flex align-items-center gap-4">
          <div class="access">
            <img src="~assets/images/svg/icon-material-computer.svg"  />
              &nbsp; Dashboard Access
          </div>
          <div class="access">
            <img src="~assets/images/svg/ionic-ios-phone-portrait.svg"  />
              &nbsp; Admin App Access
          </div>
          <div class="access">
            <img src="~assets/images/svg/icon-material-payment.svg"  />
              &nbsp; On Payroll
          </div>
          <div class="access">
            <img src="~assets/images/svg/icon-ionic-ios-stats.svg"  />
              &nbsp; Performance Monitored
          </div>

         </div>
        </div>
      </div>
      
      <div 
  class="d-flex align-items-center row levels" 
  v-for="(roles, accessLevel) in groupedRoles" 
  :key="accessLevel"
>
  <div class="access-title col-3">
    {{ accessLevel }}
  </div>
  <div class="cards col-9">
    <CardRoles 
      v-for="role in roles" 
      :key="role.id" 
      v-bind="role" 
      @click="onRoleSelect(role.id)"  
    />
  </div>
</div>

    <Modal v-model="showRolesForm" id="roles-modal">
      <template #title>
        {{ selectedRole ? "Update" : "Create" }} a Role
      </template>
      <FormRoles
        v-if="showRolesForm"
        @reload="refreshData"
        @close-canvas="showRolesForm = false"
        :role-data="selectedRole"
      />
    </Modal>
     
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  import { useBreadcrumbStore } from "~/store/breadcrumb";
  import { computedAsync } from "@vueuse/core";

  const { currentUserType } = useAuthStore();
  const breadcrumbStore = useBreadcrumbStore();
  const selectedRole = ref(null); 
  const showRolesForm = ref(false);

  breadcrumbStore.setBreadcrumb({
    items: [
      { label: "Control", link: "" },
      { label: "Roles ", link: "" },
    ],
  });
  
  breadcrumbStore.setStyles({
    position: "relative",
    right: "0px",
  });



  const onAddNewRole = () => {
  selectedRole.value = null; 
  showRolesForm.value = true;
};

const { data, pending, refresh } = await useCustomFetch<any>(
    "/roles/get/roles", 
    {
    method: "POST",
    body: {
      facility_id: currentUserType?.id,
    },
    });

    const refreshData = () => {
  refresh();
};
    const roles = ref({
  level1: [],
  level2: [],
  level3: [],
  level4: []
});
const groupedRoles = computed(() => {
  const groups = {};
  if (data.value && data.value.roles) {
    for (const level in data.value.roles[0]) {
      const roles = data.value.roles[0][level];
      if (Array.isArray(roles)) {
        for (const role of roles) {
          if (role) { // make sure the role is not null
            const accessLevel = role.access_level;
            if (!groups[accessLevel]) {
              groups[accessLevel] = [];
            }
            groups[accessLevel].push(role);
          }
        }
      }
    }
  }
  return groups;
});
//     const filteredRoles = computed(() => {
//   // Verify that `data.value.roles` is an array
//   if (!Array.isArray(data.value.roles) || data.value.roles.length === 0) {
//     return []; // Return an empty array if `data.roles` is not an array or is empty
//   }

//   return data.value.roles.flatMap(role => {
//     // Create an array to hold the filtered roles from all levels
//     let allLevels = [];

//     // Iterate through each level (1 to 4)
//     for (let level = 1; level <= 4; level++) {
//       const levelKey = `level${level}`; // Create the key for the current level (e.g., "level1")
      
//       // Check if the current level exists and is an array before proceeding
//       if (Array.isArray(role[levelKey])) {
//         // For each role in the current level, filter out null entries and add level information
//         const rolesWithLevel = role[levelKey]
//           .filter(item => item !== null)
//           .map(item => ({ ...item, level: levelKey })); // Add level information to each role
//         allLevels = allLevels.concat(rolesWithLevel);
//       }
//     }

//     return allLevels; // Return the aggregated roles for this entry, including their levels
//   }).filter(item => item !== null); // Ensure the final output does not contain null values
// });

// const computedRoles = computed(() => {
//   // Assuming data.value.roles is an array of objects, each representing a level with an array of roles
//   if (data.value?.roles?.length > activeLevel.value) {
//     const activeRoles = data.value.roles[activeLevel.value]; // Access roles by the active level

//     // Ensure activeRoles is defined and is an array
//     if (Array.isArray(activeRoles)) {
//       let roles = activeRoles
//         .filter(role => role) // Ensure each role is truthy
//         .map(role => ({
//           // Map and return each property of the role
//           id: role.id,
//           title: role.title,
//           description: role.description,
//           access_level: role.access_level,
//           dashboard_access: role.dashboard_access,
//           admin_app_access: role.admin_app_access,
//           on_payroll: role.on_payroll,
//           performance_monitored: role.performance_monitored,
//           updated_date: role.updated_date,
//           // Include any additional properties here
//         }));

//       return roles;
//     }
//   }
//   return [];
// });
const onRoleSelect = (roleId: number) => {
  console.log(`Selected role ID: ${roleId}`);
  
  // Assuming 'data.value.roles' contains all your roles across all levels
  for (const level in data.value.roles[0]) {
    const roles = data.value.roles[0][level];
    if (Array.isArray(roles)) {
      const foundRole = roles.find(role => role && role.id === roleId.toString()); // Convert to string if necessary
      if (foundRole) {
        selectedRole.value = foundRole;
        break; // Stop searching once the role is found
      }
    }
  }

  showRolesForm.value = true; 
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
    max-width: 1396px;
    margin: unset;
    height: fit-content;
  }
  
  .content__title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .content-left {
    display: flex;
    align-items: center;
  }
  
  .content__title-box .addNewBtn {
    width: 150px;
    height: 40px;
    margin-top: 0;
    margin-left: 15px;
  }
  
  .addNewBtn .plus {
    border: 1px solid #84ceff;
    width: 14px;
    height: 14px;
    color: #84ceff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .addNewBtn {
    display: flex;
    background: #f2faff;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    cursor: pointer;
    margin-right: 12px;
    transition: 0.35s;
  }
  .addNewBtn .text-add {
    margin-left: 5px;
  }
  .access{
    font-size: 12px;
  }
  .access-title {
    font-size: 22px;
    font-weight: bold;
  }
  .levels {
  min-height: 200px;
  border-bottom: 3px solid #E6E7E8;
  padding: 20px;

  &:last-child {
    border-bottom: none; /* Removes the border for the last .levels element */
  }
}

 .cards {
  display: flex;
  flex-wrap: wrap; /* This allows the cards to wrap to the next line */
  gap: 20px;
}

  </style>
  