<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedCategory"
      @submit="submitHandler"
      :actions="false"
    >
      <!-- <div class="row mt-4"> -->
        <div  style="height: 54px;">
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
        <div class="mt-4" style="height: 74px; margin-bottom: 80px;">
          <FormKit
            type="textarea"
            name="description"
            label="Description"
            placeholder="Please enter category description"
            :validation-messages="{
                  required: 'Category description is required',
                }"
          />
        </div>
      <!-- </div> -->
      <div
      class="saved-category my-4"
      v-if="selectedCategory"
      style="margin-bottom: 20px"
    >
      <h5 class="text-center  mb-4" style="font-size: 23px;">Saved Categories</h5>
      <div class="row g-3">
        <div
          v-for="category in categories"
          :key="category.category_id"
          class="col-4 saved-category-card"
        >
          <CardEdit
            @edit="onCategorySelect(category)"
            :active="category.category_id === selectedCategory?.category_id"
          >
            <span class="category">
              {{ category.name }}
            </span>

            <p class="mt-2">
              <!-- {{ category.description }} -->
            </p>
          </CardEdit>
        </div>
      </div>
    </div>
    <div v-if="selectedCategory"
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: relative; width: 830px; text-align: center; bottom: -90px;"
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn"
            @click="$emit('close-canvas')"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-else
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: fixed; width: 830px; text-align: center; bottom: 0px;"
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn"
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

const createCategory = async (categoryData: any) => {
  const { data, error, execute } = useCustomFetch<any>("/store/add/category", {
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
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/store/add-category", err);
    $toast.error("Failed to add category due to an exception.");
  }
};


const editCategory = async (categoryData: any) => {
  console.log(categoryData)
  const { data, error, execute } = useCustomFetch<any>("store/update/category", {
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
      $toast("Category edited successfully!");
      // emit("close-canvas");
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/store/update-category", err);
    $toast.error("Failed to edit category due to an exception.");
  }
};


const onCategorySelect = (category:  any) => {
  selectedCategory.value = category;
};

const submitHandler = async (categoryData: any) => {
  categoryData.category_id
    ? editCategory(categoryData)
    : createCategory(categoryData);
};
</script>
<style lang="scss" scoped>

.saved-category-card {
  > div {
    min-height: 131px;
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
.category {
  position: absolute;
   top:38%;
   font-weight:600;
   font-size: 22px;
}
</style>