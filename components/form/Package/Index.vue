<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedPackage"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="d-flex items-align-center gap-2 mb-2" style="height: 90px;">
        <div class="d-flex flex-column items-align-center justify-content-center">
        <span class="promotion-dates">Start Date</span>
        <FormKit
          style="height: 40px;"
          type="date"
          label="Start date"
          name="start_date"
          validation="required"
          :validation-messages="{
                  required: 'Start date is required',
                }"
          :min="effectiveStartDate"
          v-model="startDate"
        />
        </div>
        <span class="To">To</span>
        <div class="d-flex flex-column items-align-center justify-content-center">
          <span class="promotion-dates">End Date</span>
        <FormKit
          style="height: 40px;"
          type="date"
          label="End date"
          name="end_date"
          :min="startDate || minDate"
          :validation="`required|date_after:${startDate}`"
          :validation-messages="{
                  required: 'End date is required',
                }"
        />
        </div>
      </div>
      <div class="mb-4" style="height: 54px;">
      <FormKit
        type="text"
        label="Name"
        name="name"
        placeholder="Please enter package name"
        validation="required"
        :validation-messages="{
                  required: 'Package name is required',
                }"
      />
    </div>
    <div class="mb-4" style="height: 94px;">
      <FormKit
        type="textarea"
        name="description"
        label="Description"
        placeholder="Please enter package description "
        validation="required"
        :validation-messages="{
                  required: 'Package description is required',
                }"
      />
    </div>
    <div 
        class="mt-4 d-flex justify-content-center flex-column button-save"
      
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn-cancel"
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
import { useAuthStore } from "@/store/auth";
import { useVModel } from "@vueuse/core";
const { $toast } = useNuxtApp();

const emit = defineEmits(["reload", "update:packageData", "close-canvas"]);

const props = defineProps({
  packageData: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPackage = useVModel(props, "packageData", emit);
const startDate = ref(selectedPackage.value?.start_date);
// const minDate = computed(() => {
//   return new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
// });
const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Today's date in YYYY-MM-DD format
});

// const effectiveStartDate = computed(() => {
//   return startDate.value || minDate.value; // Use startDate if it exists, otherwise use minDate
// });
const effectiveStartDate = computed(() => {
  const startDateObj = new Date(startDate.value);
  const minDateObj = new Date(minDate.value);

  // Check if startDate exists and is not greater than minDate
  if (startDate.value && startDateObj <= minDateObj) {
    return startDate.value;
  }
  return minDate.value;
});

const createCategory  = async (packageData) => {
  const { data, error, execute } = useCustomFetch<any>("/packages/add/package", {
    method: "POST",
    body: JSON.stringify({
      ...packageData,
      facility_id: currentUserType?.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      emit("reload");
      $toast("Package added successfully");
      // emit("close-canvas");
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      // $toast.error(errorMessage);
      $toast.error("Package already exists");
    }
  } catch (err) {
    console.error("Error:/api/package/add", err);
    $toast.error("An error occurred while adding the package. Please check the console for more details.");
  }
};


const editCategory  = async (packageData) => {
  const { data, error, execute } = useCustomFetch<any>("/packages/update/package", {
    method: "POST",
    body: JSON.stringify({
      ...packageData,
      facility_id: currentUserType?.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      emit("reload");
      $toast("Package updated successfully");
      // emit("close-canvas");
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/package/update", err);
    $toast.error("An error occurred while editing the package. Please check the console for more details.");
  }
};


const submitHandler = async (packageData) => {
  packageData.package_id
    ? editCategory(packageData)
    : createCategory(packageData);
};
</script>
<style lang="scss">
.formkit-message {
  margin-bottom: -50px;
  min-height: 50px; /* Reserve enough space for one line of text */
  transition: visibility 0.3s, opacity 0.3s ease-in-out;
  // visibility: hidden;
  // opacity: 0;
}
.formkit-invalid .formkit-message {
  visibility: visible;
  min-height: 50px;
  opacity: 1;
}

</style>