<template>
  <div class="px-5 store-form">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedStore"
    >
      <div class="row">
        <div class="col-4">
          <FormKit
            type="uppy"
            label="Upload Image"
            name="image"
            :hideUploadButton="true"
            help="Max image size: 500x500px, 1MB. Format: .jpg or .png"
          />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-8 mb-2">
              <FormKit
                type="text"
                label="Name"
                name="name"
                placeholder="Please enter item name"
                validation="required"
                :validation-messages="{
                  required: 'Item name is required',
                }"
              />
            </div>
            <div class="col-4">
              <FormKit
                type="multiselect"
                label="Category id"
                name="category_id"
                placeholder="Category"
                openDirection="bottom"
                validation="required"
                :value="category?.id"
                :options="categories"
                :key="category?.id"
              />
            </div>
          </div>
          <FormKit
            type="textarea"
            name="description"
            label="Description"
            placeholder="Please enter item description"
            validation="required"
            :classes="{
              input: 'description-height',
            }"
              :validation-messages="{
                  required: 'Item description is required',
                }"

          />
        </div>
      </div>
      <div class="row mb-4">
        <div class=""></div>
        <div class="d-flex align-items-center justify-content-end gap-2">
          <FormKit
            style="width: 120px"
            type="number"
            outer-class="m-0"
            name="price"
            label="Price"
            placeholder="Enter Price"
            validation="required"
            :validation-messages="{
                  required: 'Price is required',
                }"
          />
          <div class="d-flex align-items-center gap-4">
            <span> Can be paid with </span>
            <FormKit
              type="checkbox"
              name="pay_with_card"
              outer-class="m-0"
              label="card"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="pay_with_gift_card"
              label="gift card"
              :value="false"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex gap-4 align-items-center">
          <FormKit
            type="checkbox"
            outer-class="m-0"
            label="On Promotion for"
            :value="false"
            v-model="isPromotionPriceActive"
          />
          <div style="width: 175px">
            <FormKit
            type="number"
            outer-class="m-0"
            name="promotion_price"
            v-model="promotion_price"
            label="Promotion price"
            placeholder="Enter Promotion price"
            :disabled="!isPromotionPriceActive"
            :validation="`${isPromotionPriceActive ? 'required|max:' + OriginalPrice : ''}`"
            :validation-messages="{
              max: 'Promotion price must be less than OriginalPrice',
              required: 'Promotion Price is required',
            }"
             />
          </div>
          <FormKit
            type="checkbox"
            outer-class="m-0"
            label="Display original price"
            name="display_original_price"
            :value="false"
            :validation="isPromotionPriceActive ? 'required' : ''"
          />
        </div>
        <div class="d-flex gap-2">
          <FormKit
            type="date"
            outer-class="m-0"
            label="Start date"
            name="promotion_start"
            :min="effectiveMinDate"
            v-model="promotionStartDate"
            :validation="isPromotionPriceActive ? 'required' : ''"
            :validation-messages="{
                  required: 'Start date is required',
                }"
          />
          <FormKit
            type="date"
            outer-class="m-0 date-width"
            label="End date"
            placeholder="End date"
            name="promotion_end"
            :min="promotionStartDate || minDate"
            :validation="`${
              isPromotionPriceActive ? 'required|' : ''
            }date_after:${promotionStartDate}`"
             :validation-messages="{
                  required: 'End date is required',
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
      <div
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: fixed; bottom: 0; right: 15.2%; margin-bottom: 20px"
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
import { removeObjectKeys } from "@/utils/dataCleaner";
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
  storeData: {
    type: Object,
    default: () => {},
  },
});

const selectedCategory = ref();
const emit = defineEmits(["reload", "close-canvas"]);
// const isPromotionPriceActive = ref(false);

const { currentUserType } = useAuthStore();
const availableTagsSelected = ref([]);
const exceptTagsSelected = ref([]);

const { tags } = storeToRefs(useTagStore());

const exceptTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            availableTagsSelected.value &&
            !availableTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});

const computedSelectedStore = computed(() => {
  return props.storeData
    ? {
        ...props.storeData,
        available_tags: props.storeData.available_tags
          .filter((item) => item)
          .map((item) => item.id),
        except_tags: props.storeData.except_tags
          .filter((item) => item)
          .map((item) => item.id),
        display_original_price:
          props.storeData.display_original_price === "Yes" ? true : false,
        pay_with_gift_card:
          props.storeData.pay_with_gift_card === "Yes" ? true : false,
        pay_with_card: props.storeData.pay_with_card === "Yes" ? true : false,
        promotion_price: parseFloat(props.storeData.promotion_price) || "",
      }
    : {};
});

const promotionStartDate = ref(computedSelectedStore.value?.promotion_start);
const isPromotionPriceActive = ref(!!computedSelectedStore.value?.promotion_price);
const OriginalPrice = computed(() => {
  if (computedSelectedStore.value && computedSelectedStore.value.price) {
    return computedSelectedStore.value.price -1 ;
  }
  return 0;
});
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

const isPromotionCurrentlyActive = computed(() => {
    const today = new Date();
    const startDate = new Date(promotionStartDate.value);
    const endDate = new Date(computedSelectedStore.value?.promotion_end);
    return startDate <= today && today <= endDate;
});

// Adjust the minimum start date for the promotion based on whether it's currently active
const effectiveMinDate = computed(() => {
    if (isPromotionCurrentlyActive.value && promotionStartDate.value) {
        // If the promotion is active, allow the original start date as the minimum
        return promotionStartDate.value;
    }
    return minDate.value; // Otherwise, use today's date
});

watchEffect(() => {
    promotionStartDate.value = computedSelectedStore.value?.promotion_start;
    isPromotionPriceActive.value = !!computedSelectedStore.value?.promotion_price;
});

const availableTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            exceptTagsSelected.value &&
            !exceptTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});
const promotion_price = ref(computedSelectedStore.promotion_price  || "");
watch(isPromotionPriceActive, (newVal) => {
  console.log({ isPromotionPriceActive });
  if (!newVal) {
    // promotion_price.value = null;
  }
});
const addStore = async (storeData: any) => {
  const { data, error, execute } = useCustomFetch<any>("/store/add/item", {
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
      $toast("Store added successfully!");
      emit("reload");
      // emit("close-canvas");
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/store/add", err);
    $toast("Failed to add store item due to an exception.");
  }
};


const updateStore = async (storeData: any) => {
  console.log(storeData)
  const { data, error, execute } = useCustomFetch<any>("/store/update/item", {
    method: "POST",
    body: JSON.stringify({
      ...storeData,
      facility_id: currentUserType?.id,
      store_item_id: computedSelectedStore.value?.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      emit("reload");
      $toast("Store edited successfully!");
      // emit("close-canvas");
    } else {
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/store/edit", err);
    $toast("Failed to edit store item due to an exception.");
  }
};


const submitHandler = async (storeData) => {
  const data = {
    ...storeData,
    display_original_price: storeData.display_original_price ? "Yes" : "No",
    pay_with_gift_card: storeData.pay_with_gift_card ? "Yes" : "No",
    pay_with_card: storeData.pay_with_card ? "Yes" : "No",
    promotion_price: isPromotionPriceActive.value
      ? storeData.promotion_price ?? ""
      : "",
  };
  computedSelectedStore.value?.id ? updateStore(data) : addStore(data);
};
</script>
<style lang="scss">
.store-form {
  .description-height {
    height: 10em !important;
  }
}
</style>