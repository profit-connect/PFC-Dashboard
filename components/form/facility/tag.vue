<template>
  <div class="px-5">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      #default="abc"
    >
      <div class="d-flex align-items-start gap-3">
        <FormKit v-if="tagData" :value="tagData.id" type="hidden" name="id" />

        <FormKit
          type="text"
          name="name"
          placeholder="name"
          v-model="form.name"
          validation="required"
        />
        <FormKit
          type="text"
          name="description"
          placeholder="Description"
          validation="required"
          v-model="form.description"
          :classes="{
            outer: 'flex-grow-1',
          }"
        />
      </div>
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
const emit = defineEmits(["reload", "update:tagData", '"close-canvas"']);

const props = defineProps({
  tagData: {
    type: Object,
    default: () => {},
  },
});

const defaultForm = () => ({ name: "", description: "" });
const form = ref({
  ...defaultForm,
  ...(props.tagData || {}),
});
watch(
  () => props.tagData,
  (newValue) => {
    watch(
      () => props.tagData,
      (newValue) => {
        Object.assign(form, newValue || defaultForm());
      }
    );
  }
);

const { currentUserType, loggedUser } = useAuthStore();
const selectedPackage = useVModel(props, "tagData", emit);

const createTag = async (tagData :any) => {
  const { data, error, execute } = useCustomFetch<any>("/tags/add/tag", {
    method: "POST",
    body: JSON.stringify({
      ...form.value,
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
      $toast("Tag added successfully!");
      // emit("close-canvas");
    } else if (data.value) {
      $toast(data.value.message);
    } else if (error.value) {
      $toast("An error occurred while adding the tag.");
      console.error("Error:/tags/add", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/tags/add", err);
    $toast("Failed to add tag due to an exception.");
  }
};
const editTag = async (tagData :any) => {
  const { data, error, execute } = useCustomFetch<any>("/api/tags/update", {
    method: "POST",
    body: JSON.stringify({
      ...form.value,
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
      $toast("Tag edited successfully!");
      // emit("close-canvas");
    } else if (data.value) {
      $toast(data.value.message);
    } else if (error.value) {
      $toast("An error occurred while editing the tag.");
      console.error("Error:/api/tags/update", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/tags/update", err);
    $toast("Failed to edit tag due to an exception.");
  }
};

const submitHandler = async () => {
  if (props.tagData && props.tagData.id) {
    await editTag(props.tagData);
  } else {
    await createTag(props.tagData);
  }
};


</script>
