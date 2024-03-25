<template>
    <div class="px-5 store-form">
      <FormKit
        type="form"
        @submit="submitHandler"
        :actions="false"
        :modelValue="computedSelectedRole"
      >
     
            <div class="row">
              <div class="col-6">
                <FormKit
                  type="text"
                  label="Title"
                  name="title"
                  placeholder="Title"
                  validation="required"
                />
              </div>
              <div class="col-6">
                <FormKit
                  type="multiselect"
                  label="access_level"
                  name="access_level"
                  placeholder="Access Level"
                  openDirection="bottom"
                  validation="required"
                  :options="levels"
                />
              </div>
            </div>
            <FormKit
              type="textarea"
              name="description"
              label="Description"
              placeholder="Description"
              validation="required"
              :classes="{
                input: 'description-height',
              }"
            />
          
        <div class="row mb-4">
          <div class=""></div>
          <div class="d-flex align-items-center justify-content-between gap-2">
              <FormKit
                type="checkbox"
                name="dashboard_access"
                outer-class="m-0"
                label="Dashboard Access"
                :value="false"
              />
              <FormKit
                type="checkbox"
                outer-class="m-0"
                name="admin_app_access"
                label="Admin App Access"
                :value="false"
              />
              <FormKit
                type="checkbox"
                name="on_payroll"
                outer-class="m-0"
                label="On Payroll"
                :value="false"
              />
              <FormKit
                type="checkbox"
                outer-class="m-0"
                name="performance_monitored"
                label="Performance Monitored"
                :value="false"
              />
           
          </div>
        </div>
     
      
        <div
          class="mt-4 d-flex justify-content-center flex-column"
          style="position: fixed; bottom: 0; right: 17%; margin-bottom: 20px"
        >
          <div><FormKit type="submit">Save</FormKit></div>
          <div>
            <button
              class="btn"
              style="margin-left: 145px"
              @click="$emit('close-canvas')"
            >
              Cancel
            </button>
          </div>
        </div>
      </FormKit>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useTagStore } from "@/store/tag";
  import { useAuthStore } from "@/store/auth";
  import { storeToRefs } from "pinia";
  import { removeObjectKeys } from "@/utils/dataCleaner";
  const { $toast } = useNuxtApp();
  const props = defineProps({
    roleData: {
    type: Object,
    default: () => {},
  },
  });
  

  const emit = defineEmits(["reload", "close-canvas"]);
  // const isPromotionPriceActive = ref(false);
  
  const { currentUserType } = useAuthStore();
  const levels = ref([
 
    "Level 1", "Level 2","Level 3","Level 4"
  
]);
const computedSelectedRole = computed(() => {
  return props.roleData
    ? {
      ...props.roleData,
      dashboard_access:
          props.roleData.dashboard_access === "Yes" ? true : false,
          admin_app_access:
          props.roleData.admin_app_access === "Yes" ? true : false,
          on_payroll: props.roleData.on_payroll === "Yes" ? true : false,
          performance_monitored: props.roleData.performance_monitored === "Yes" ? true : false,
      }
    : {};
});

  const addRoles = async (storeData: any) => {
    const { data, error, execute } = useCustomFetch<any>("/roles/add/role", {
      method: "POST",
      body: JSON.stringify({
        ...storeData,
        facility_id: currentUserType?.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    try {
      await execute();
  
      if (data.value && data.value.return) {
        $toast("Roles added successfully!");
        emit("reload");
        // emit("close-canvas");
      } else {
        const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
        $toast(errorMessage);
      }
    } catch (err) {
      console.error("Error:/api/store/add", err);
      $toast("Failed to add role item  to an exception.");
    }
  };
  
  
  const updateRoles = async (storeData: any) => {
    console.log(storeData)
    const { data, error, execute } = useCustomFetch<any>("/roles/update/role", {
      method: "POST",
      body: JSON.stringify({
        ...storeData,
        facility_id: currentUserType?.id,
        role_id: computedSelectedRole.value?.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    try {
      await execute();
  
      if (data.value && data.value.return) {
        $toast("Roles edited successfully!");
        emit("reload");
        // emit("close-canvas");
      } else {
        const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
        $toast(errorMessage);
      }
    } catch (err) {
      console.error("Error:/api/store/edit", err);
      $toast("Failed to edit role  due to an exception.");
    }
  };
  
  
  const submitHandler = async (roleData) => {
      console.log("data");
    const data = {
      ...roleData,
      dashboard_access: roleData.dashboard_access ? "Yes" : "No",
      admin_app_access: roleData.admin_app_access ? "Yes" : "No",
      on_payroll: roleData.on_payroll ? "Yes" : "No",
      performance_monitored: roleData.performance_monitored ? "Yes" : "No",
     
    };
    computedSelectedRole.value?.id ? updateRoles(data) : addRoles(data);
  };
  </script>
  <style lang="scss">
  .store-form {
    .description-height {
      height: 10em !important;
    }
  }
  </style>