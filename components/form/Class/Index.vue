<template>
  <div class="px-5">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedClass"
    >
    <div style="height: 60px;">
      <FormKit
        type="text"
        label="Name"
        name="name"
        placeholder="Enter class or event name"
        validation="required"
      />
      </div>
      <div class="row my-4">
        <div class="col-6 custom-multiselect-container">
          <MixInputBox
            title="Category"
            style="height: 140px; padding-top: 20px"
          >
            <FormKit
              type="multiselect"
              label="Category id"
              name="category_id"
              openDirection="bottom"
              validation="required"
              :value="category?.id"
              :options="categories"
              :key="category?.id"
            />
          </MixInputBox>
        </div>
        <!-- <div class="col-2"></div> -->
        <div class="col-6 custom-multiselect-container">
          <MixInputBox
            title="Duration"
            style="height: 140px; padding-top: 20px"
          >
            <div class="row">
              <div
                class="col-3"
                style="
                  width: 80px;
                  margin-left: 15px;
                  position: relative;
                  left: 10px;
                "
              >
                <FormKit
                  style="height: 40px"
                  type="number"
                  name="duration"
                  placeholder="No."
                  validation="required"
                  :validation-messages="{
                  required: 'Time required',
                }"
                />
              </div>
              <div class="col-9">
                <FormKit
                  type="multiselect"
                  label="Class"
                  class="w-75"
                  name="period"
                  placeholder="Select minutes or hours"
                  openDirection="bottom"
                  validation="required"
                  :options="timeTypeSelect"
                  :validation-messages="{
                  required: 'Unit of time is required',
                }"
                />
              </div>
            </div>
          </MixInputBox>
        </div>
      </div>

      <div class="col-" style="height: 120px;">
        <FormKit
          style="height: 110px"
          type="textarea"
          name="description"
          label="Description"
          placeholder="Please enter class/event description"
          validation="required"
          :validation-messages="{
                  required: 'Class/event description is required',
                }"
        />
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <FormKit
            type="uppy"
            label="Upload Image"
            name="img_video"
            :targetHeight="540"
            :targetWidth="960"
            :hideUploadButton="true"
            help="Max image size: 960x540px, 1MB. Format: .jpg or .png"
          />
        </div>
        <div class="col-6">
          <FormKit
            type="uppy"
            label="Upload Image"
            name="image"
            :targetHeight="262"
            :targetWidth="890"
            :hideUploadButton="true"
            help="Max image size: 890x262px, 1MB. in .jpg and .png."
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <FormKit
            name="type"
            type="radio"
            v-model="classType"
            :options="classOptions"
          />
        </div>
      </div>
      <div class="row"  style="height: 80px;">
        <div class="col-6">
          <FormKit
            :key="`location-${formKey}`"
            type="text"
            label="Location"
            name="location"
            placeholder="Please enter Location"
            v-model="location"
            :disabled="['On-site', 'Online'].includes(classType)"
            :validation="locationValidation"
          />
        </div>
        <div class="col-6" >
          <FormKit
            :key="`googlemaps-${formKey}`"
            type="text"
            label="Google Map Url"
            name="googlemaps"
            placeholder="Please enter Google Map Url"
            v-model="googlemaps"
            :disabled="['On-site', 'Online'].includes(classType)"
            :validation="googleMapsValidation"
          />
        </div>
      </div>
      <div class="row" style="height: 80px;">
        <div class="col-12">
          <FormKit
            :key="`url-${formKey}`"
            type="text"
            label="Url"
            name="url"
            v-model="url"
            placeholder="URL"
            :disabled="['On-site', 'Off-site'].includes(classType)"
            :validation="urlValidation"
            :validation-messages="{
                  required: 'URL is required',
                }"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 custom-multiselect-available_tags">
          <span
            style="
              position: relative;
              bottom: -39.1px;
              left: 15px;
              z-index: 90;
              font-size: 16px;
            "
            >Open To</span
          >
          <!-- openDirection="top" -->
          <FormKit
            type="multiselect"
            label="Available To"
            name="available_tags"
            mode="tags"
            v-model="availableTagsSelected"
            :options="availableTags"
          />
        </div>
        <div class="col-6 custom-multiselect-except">
          <span
            style="
              position: relative;
              bottom: -39.1px;
              left: 15px;
              z-index: 90;
              font-size: 16px;
            "
            >Except</span
          >
          <FormKit
            type="multiselect"
            label="Except"
            name="except_tags"
            mode="tags"
            :options="exceptTags"
            v-model="exceptTagsSelected"
          />
          <!-- <div class="disbale-icon">
          <img src="~/assets/images/svg/disable-icon.svg?timestamp=1706775974781" alt="Disable icon">
        </div> -->
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <FormKit type="submit">Save</FormKit>
      </div>
    </FormKit>
    <button
      class="btn"
      style="position: relative; left: 365px; margin-bottom: 20px"
      @click="$emit('close-canvas')"
    >
      Cancel
    </button>
  </div>
</template>

<script lang="ts" setup>
import { classOptions, timeTypeSelect } from "@/constants/class";
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { removeObjectKeys } from "@/utils/dataCleaner";
import { cleanObjectL1 } from "@/utils/dataCleaner";
const { $toast } = useNuxtApp();
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  category: {
    tye: Object,
    default: () => {},
  },
  classData: {
    type: Object,
    default: () => {},
  },
});

const selectedCategory = ref();
const emit = defineEmits(["reload", "close-canvas"]);

const { currentUserType } = useAuthStore();
const classType = ref("On-site");
const location = ref("");
const googlemaps = ref("");
const url = ref("");
const formKey = ref(0);
const availableTagsSelected = ref([]);
const exceptTagsSelected = ref([]);

const locationValidation = computed(() => {
  return ["On-site", "Online"].includes(classType.value) ? "" : "required";
});

const googleMapsValidation = computed(() => {
  return ["On-site", "Online"].includes(classType.value) ? "" : "required";
});

const urlValidation = computed(() => {
  return ["On-site", "Off-site"].includes(classType.value) ? "" : "required";
});

const { tags } = storeToRefs(useTagStore());

// const exceptTags = computed(() => {
//   return tags.value
//     ? tags.value
//         .filter(
//           (item) =>
//             availableTagsSelected.value &&
//             !availableTagsSelected.value.includes(item.id.toString())
//         )
//         .map((item) => ({ label: item.name, value: item.id }))
//     : [];
// });

const exceptTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            item && item.id && // Add this conditional check
            availableTagsSelected.value &&
            !availableTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});

const computedSelectedClass = computed(() => {
  return props.classData
    ? {
        ...useOmit(props.classData, ["img_src", "img_video"]),
        available_tags: props.classData.available_tags
          .filter((item) => item)
          .map((item) => item.id),
        except_tags: props.classData.except_tags
          .filter((item) => item)
          .map((item) => item.id),
      }
    : {};
});

// const availableTags = computed(() => {
//   return tags.value
//     ? tags.value
//         .filter(
//           (item) =>
//             exceptTagsSelected.value &&
//             !exceptTagsSelected.value.includes(item.id.toString())
//         )
//         .map((item) => ({ label: item.name, value: item.id }))
//     : [];
// });
const availableTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            item && item.id && // Add this conditional check
            exceptTagsSelected.value &&
            !exceptTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});


const addClass = async (classData: any) => {
  const { data, error, execute } = useCustomFetch<any>("/category/add/class", {
    method: "POST",
    body: JSON.stringify(cleanObjectL1({
      ...classData,
      facility_id: currentUserType?.id,
    })),
    headers: {
      'Content-Type': 'application/json', // Set the content type for JSON payloads
    },
  });

  try {
    await execute(); // Execute the fetch request

    // Check the response and handle accordingly
    if (data.value && data.value.return) {
      $toast.sucess("Class added successfully!");
      emit("reload"); // Reload or refresh data
      // emit("close-canvas"); // If you have a modal or overlay to close
    } else if (data.value) {
      $toast.error(data.value.message); // Show error message from response
    } else if (error.value) {
      $toast.error("An error occurred while adding the class.");
      console.error("Error:/api/class/add", error.value); // Log the error
    }
  } catch (err) {
    console.log("Catch block error:/api/class/add", err);
      $toast.error("Failed to add class due to an exception.");
  }
};


const updateClass = async (classData: any) => {
  console.log(classData)
  const { data, error, execute } = useCustomFetch<any>("/category/update/class", {
    method: "POST",
    body: JSON.stringify(cleanObjectL1({ // Make sure to stringify your body if your fetch wrapper doesn't automatically do it
      ...classData,
      facility_id: currentUserType?.id,
      class_id: computedSelectedClass.value?.id,
    })),
    headers: {
      'Content-Type': 'application/json', // Ensure you set the correct content type for JSON payloads
      // Additional headers as needed
    },
  });

  try {
    await execute(); // This is assuming useCustomFetch is a wrapper around useFetch that requires execution

    // Since useFetch from Nuxt 3 automatically unwraps the response, you might need to adjust how you access the data
    if (data.value && data.value.return) {
      emit("reload");
      $toast("Class edited successfully!");
      // emit("close-canvas");
    } else if (data.value) {
      $toast.error(data.value.message);
    } else if (error.value) {
      $toast.error("An error occurred while updating the class.");
      console.error("Error:/api/class/edit", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/class/edit", err);
    $toast.error("Failed to update class due to an exception.");
  }
};

const submitHandler = async (classData) => {
  let tempData = removeObjectKeys(classData, [
    "img_src",
    "img_video",
    "updated_date",
  ]);
  // remove disabled data
  if (classData.type === "On-site" || classData.type === "Online") {
    tempData = removeObjectKeys(tempData, ["location", "googlemaps"]);
  } else if (classData.type === "Off-site" || classData.type === "On-site") {
    tempData = removeObjectKeys(tempData, ["url"]);
  }
  computedSelectedClass.value?.id
    ? updateClass(classData)
    : addClass(classData);
};

watch(classType, (newValue) => {
  // Reset all fields initially
  if (newValue === "On-site") {
    location.value = "";
    googlemaps.value = "";
    url.value = "";
  } else if (newValue === "Online") {
    location.value = "";
    googlemaps.value = "";
  } else if (newValue === "Off-site") {
    url.value = "";
  }

  formKey.value++; // Increment the key to force re-render for the changes to take effect
});
</script>

<style lang="scss" scoped>
.is-invalid {
  /* Custom styling for invalid fields */
  border-color: red;
  /* Add more styling as needed */
}
.disbale-icon {
  position: absolute;
  bottom: 340px;
  right: 100px;
}
</style>
