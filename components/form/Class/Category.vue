<template>
  <div class="px-5 pt-0">
    <FormKit
      type="form"
      :modelValue="selectedCategory"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="row mt-0" >
        <div class="col-3">
          <FormKit
            type="uppy"
            label="Upload Image"
            :targetHeight="250"
            :targetWidth="250"
            name="image"
            :hideUploadButton="true"
            help="Max image upload: 250x250px, 500KB png with transparency"
          />
        </div>
        <div class="col-9">
          <div style="height: 74px;">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Please enter category name"
            validation="required"
            :validation-messages="{
                  required: 'Category name is required',
                }"
          />
        </div>
          <FormKit
            style="height: 120px"
            type="textarea"
            name="description"
            label="Description"
            placeholder="Please enter category description"
            validation="required"
            :validation-messages="{
                  required: 'Category description is required',
                }"
          />
        </div>
      </div>

      <div class="saved-category my-4" v-if="selectedCategory">
        <h5 class="text-center mb-3" style="font-size: 22px;">
          Saved Categories
        </h5>
        <div class="row g-3" >
          <div
            v-for="category in categories"
            :key="category.category_id"
            class="col-4 saved-category-card"
          >
            <CardEdit
              @edit="onCategorySelect(category)"
              :active="category.category_id === selectedCategory?.category_id"
            >
              <div class="row align-items-center" style="margin-bottom: 10px">
                <div
                  style="height: 26px; width: 26px; margin-bottom: 14px"
                  class="col-2 p-0 rounded overflow-hidden"
                >
                  <img :src="getImageUrl(category.image)" />
                </div>
                <div class="col-10 ">
                  <p class="small-title-medium " style="font-size: 22px" >
                    {{ category.name }}
                  </p>
                </div>
                <p class="">
                  {{ category.description }} 
                </p>
              </div>
            </CardEdit>
          </div>
        </div>
      </div>
      <div v-if="selectedCategory" style="position: relative;">
        <div class="d-flex justify-content-center">
          <FormKit type="submit">Save</FormKit>
        </div>
        <button
          class="btn"
          style="position: absolute; left: 380px; top: 160px"
          @click="$emit('close-canvas')"
        >
          Cancel
        </button>
      </div>

      <div
        v-else
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: fixed; bottom: 0; right: 14%; margin-bottom: 20px"
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
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useVModel } from "@vueuse/core";
const { $toast } = useNuxtApp();
const { getUrl: getImageUrl } = useBoImage();
const emit = defineEmits(["reload", "update:categoryData", "close-canvas"]);

const props = defineProps({
  categoryData: {
    type: Object,
    default: () => {},
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const { currentUserType } = useAuthStore();
const selectedCategory = useVModel(props, "categoryData", emit);

const createCategory = async (categoryData) => {
  const { data, error, execute } = useCustomFetch<any>("/category/add/category", {
    method: "POST",
    body: JSON.stringify({
      ...categoryData,
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
      $toast("Category added successfully!");
      // emit("close-canvas");
    } else if (data.value) {
      $toast.error(data.value.message);
    } else if (error.value) {
      $toast.error("An error occurred while adding the category.");
      console.error("Error:/api/category/add", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/category/add", err);
    $toast.error("Failed to add category due to an exception.");
  }
};


const editCategory = async (categoryData) => {
  const { data, error, execute } = useCustomFetch<any>("/category/update/category", {
    method: "POST",
    body: JSON.stringify({
      ...categoryData,
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
      $toast.sucess("Category edited successfully!");
      // emit("close-canvas");
    } else if (data.value) {
      $toast.error(data.value.message);
    } else if (error.value) {
      $toast.error("An error occurred while editing the category.");
      console.error("Error:/api/category/edit", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/category/edit", err);
    $toast.error("Failed to edit category due to an exception.");
  }
};


const onCategorySelect = (category) => {
  selectedCategory.value = useOmit(category, ["image"]);
};

const submitHandler = async (categoryData) => {
  categoryData.category_id
    ? editCategory(categoryData)
    : createCategory(categoryData);
};
</script>
<style lang="scss" scoped>
.saved-category-card {
  > div {
    height: 130px;
  }
  h6 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

</style>
