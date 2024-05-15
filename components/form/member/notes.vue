<template>
  <div class="px-5">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <div style="height: 75px;">
      <FormKit
        type="text"
        name="heading"
        placeholder="Please enter note title"
        validation="required"
        :validation-messages="{
                  required: 'Note title is required',
                }"
      />
    </div>
        <FormKit type="textarea" 
         name="description"
         validation="required"
         placeholder="Please enter note" />
    
   

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
  getCurrentMemberInfo: {
    type: Object,
    default: () => {},
  },
  loggedUser: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPackage = useVModel(props, "packageData", emit);

const createNote = async (packageData) => {
  const { data, error, execute } = useCustomFetch<any>("/members/add/notes", {
    method: "POST",
    body: JSON.stringify({
      ...packageData,
      facility_id: currentUserType?.id,
      member_id: props.getCurrentMemberInfo.id,
      user_id: props.loggedUser.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      emit("reload");
      // emit("close-canvas");
      $toast(data.value.message); // Assuming success message is in data.value.message
      emit("update:modelValue", false); // Assuming this is to close a modal or similar component
    } else {
      $toast.error(data.value.message); // Show error message from the API response
    }
  } catch (err) {
    console.error("Error:/api/package/add", err); // Use console.error for better error visibility
    $toast.error("Failed to create note due to an exception.");
  }
};


const submitHandler = async (packageData) => {
  packageData.package_id ? editNote(packageData) : createNote(packageData);
};
</script>
