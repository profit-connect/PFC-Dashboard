<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedPackage"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="d-flex gap-2">
        <FormKit
          type="date"
          label="Start date"
          name="start_date"
          validation="required"
          :min="effectiveStartDate"
          help="Start date"
          v-model="startDate"
        />
        <FormKit
          type="date"
          label="End date"
          name="end_date"
          :min="startDate || minDate"
          help="End date"
          :validation="`required|date_after:${startDate}`"
        />
      </div>
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
      <FormKit
        type="textarea"
        name="description"
        label="Description"
        placeholder="Package Description"
        validation="required"
        :validation-messages="{
                  required: 'Package description name is required',
                }"
      />
      <div
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: fixed; bottom: 0; right: 17%; margin-bottom: 20px"
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn"
            style="margin-left: 140px"
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

const effectiveStartDate = computed(() => {
  return startDate.value || minDate.value; // Use startDate if it exists, otherwise use minDate
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
      $toast.success("Package added successfully!");
      // emit("close-canvas");
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
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
      $toast.success("Package edited successfully!");
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
