<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedCategory"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="">
        <div class="" style="height: 74px;">
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
        <div class="">
          <FormKit
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
        <h5 class="text-center mb-3" style="font-size: 23px; margin-top: 90px;">
          Saved Categories
        </h5>
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
      <div v-if="selectedCategory">
        <div class="d-flex justify-content-center">
          <FormKit type="submit">Save</FormKit>
        </div>
        <button
          class="btn"
          style="position: relative; left: 370px; bottom: 10px;"
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
      <!-- <div
        class="d-flex justify-content-center flex-column"
        style="position: fixed; bottom: 0; right: 17%; margin-top: 0px"
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn"
            style="margin-left: 140px; margin-bottom: 20px"
            @click="$emit('close-canvas')"
          >
            Cancel
          </button>
        </div>
      </div> -->
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
  const { data, error, execute } = useCustomFetch<any>("/space/add/category", {
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
      alert(data.value.message); // Using alert for error feedback as per your code
    } else if (error.value) {
      console.error("Error:/api/space/add-category", error.value);
      alert("An error occurred while adding the category.");
    }
  } catch (err) {
    console.log("Catch block error:/api/space/add-category", err);
    alert("Failed to add category due to an exception.");
  }
};


const editCategory = async (categoryData: any) => {
  const { data, error, execute } = useCustomFetch<any>("/space/update/category", {
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
    } else if (data.value) {
      $toast(data.value.message);
    } else if (error.value) {
      console.error("Error:/api/space/update-category", error.value);
      $toast("An error occurred while editing the category.");
    }
  } catch (err) {
    console.log("Catch block error:/api/space/update-category", err);
    $toast("Failed to edit category due to an exception.");
  }
};


const onCategorySelect = (category) => {
  console.log(category);
  selectedCategory.value = category;
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
