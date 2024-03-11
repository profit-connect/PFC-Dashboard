<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedPackage"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="col-2 position-absolute" style="right: 70px; top: 20px">
        <FormKit
          style="text-align: center"
          type="text"
          name="publish"
          placeholder="Publish"
          validation="required"
          disabled="true"
        />
      </div>
      <div class="d-flex gap-2">
        <div class="col-9">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
            validation="required"
          />
        </div>

        <div class="col-2 position-absolute" style="right: 70px">
          <FormKit
            placeholder="Waivers"
            type="multiselect"
            name="period"
            mode="single"
          />
        </div>
      </div>

      <FormKit
        type="textarea"
        name="description"
        label="Description"
        placeholder="Description"
      />
      <div class="row">
        <div class="col-6">
          <FormKit
            type="multiselect"
            label="Available To"
            openDirection="top"
            placeholder="Available To"
            name="available_tags"
            mode="tags"
            v-model="availableTagsSelected"
            :options="availableTags"
          />
        </div>
        <div class="col-6">
          <FormKit
            type="multiselect"
            label="Except"
            placeholder="Except"
            name="except_tags"
            mode="tags"
            openDirection="top"
            :options="exceptTags"
            v-model="exceptTagsSelected"
          />
        </div>
      </div>
      <div class="mt-4 d-flex justify-content-center">
        <FormKit type="submit">Submit</FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useVModel } from "@vueuse/core";

const emit = defineEmits(["reload", "update:packageData"]);

const props = defineProps({
  packageData: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPackage = useVModel(props, "packageData", emit);

const createCategory = async (packageData) => {
  try {
    const { data } =
      (await useCustomFetch) <
      any >
      ("/packages/add/package",
      {
        method: "POST",
        body: {
          ...packageData,
          facility_id: currentUserType?.id,
        },
      });
    if (data.value.return) {
      emit("reload");
      alert("Package added successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};

const editCategory = async (packageData) => {
  try {
    const { data } =
      (await useCustomFetch) <
      any >
      ("/packages/update/package",
      {
        method: "POST",
        body: {
          ...packageData,
          facility_id: currentUserType?.id,
        },
      });
    if (data.value.return) {
      emit("reload");
      alert("Package edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/update", err);
  }
};

const submitHandler = async (packageData) => {
  packageData.package_id
    ? editCategory(packageData)
    : createCategory(packageData);
};
</script>
