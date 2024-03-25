<template>
  <div class="px-5">  
    <FormKit
      type="form"
      :modelValue="selectedPlan"
      @submit="submitHandler"
      :actions="false"
      #default="{ state: { valid } }"
    >
      <div class="d-flex justify-content-end align-items-center gap-4 mb-3">
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
      <FormKit
        type="text"
        label="Name"
        name="name"
        placeholder="Name"
        validation="required"
        help="Recommended 26 character"
      />
      <FormKit
        type="text"
        name="description"
        label="Description"
        placeholder="Short description"
        help="Recommended 35 character"
        validation="required"
      />
      <div class="plan-tab my-4">
        <MixTabPackages
          v-model="activeTab"
          :items="['General', 'Access', 'Other']"
        />
        <div v-show="activeTab === 0">
          <div class="row mb-4">
            <div class="col-6">
              <MixInputBox title="Type">
                <div class="d-flex align-items-center gap-2">
                  <FormKit
                    type="number"
                    name="credit_count"
                    v-if="planTypeData === 'credits'"
                    placeholder="Count"
                    validation="required"
                  />
                  <FormKit
                    :classes="{
                      outer: 'w-100 plan-input-min-width',
                    }"
                    type="multiselect"
                    v-model="planTypeData"
                    name="type"
                    mode="single"
                    validation="required"
                    :options="planType"
                  />
                </div>
              </MixInputBox>
            </div>
            <div class="col-6">
              <MixInputBox title="Duration">
                <div class="d-flex align-items-center gap-2">
                  <FormKit
                    type="number"
                    name="duration"
                    validation="required"
                    :validation-messages="{
                  required: 'Duration Required',
                }"
                  />
                  <FormKit
                    :classes="{
                      outer: 'w-100',
                    }"
                    type="multiselect"
                    name="period"
                    mode="single"
                    :options="periodType"
                    validation="required"
                  />
                </div>
              </MixInputBox>
            </div>
          </div>

          <MixInputBox title="Payment">
            <div class="row">
              <div class="col-5 d-flex align-items-center gap-2">
                <FormKit
                  type="multiselect"
                  name="category"
                  mode="single"
                  :classes="{
                    outer: 'plan-input-min-width',
                  }"
                  :options="paymentCategory"
                  v-model="paymentCategoryData"
                  validation="required"
                />
                <FormKit
                  type="number"
                  name="price"
                  placeholder="Price"
                  validation="required"
                />
              </div>
              <div
                class="col-7 d-flex align-items-center gap-2"
                v-if="paymentCategoryData === 'Recurring'"
              >
                <span class="mb-3"> every </span>
                <FormKit
                  type="number"
                  name="payment_duration"
                  :validation="
                    paymentCategoryData === 'Recurring' ? 'required' : ''
                  "
                  placeholder="Dration"
                />
                <FormKit
                  type="multiselect"
                  name="payment_period"
                  mode="single"
                  :classes="{
                    outer: 'plan-input-min-width',
                  }"
                  :validation="
                    paymentCategoryData === 'Recurring' ? 'required' : ''
                  "
                  :options="periodType"
                />
                <span class="mb-3"> for </span>
                <FormKit
                  type="number"
                  name="payment_cycle"
                  :validation="
                    paymentCategoryData === 'Recurring' ? 'required' : ''
                  "
                  placeholder="Cycle"
                />
              </div>
            </div>
          </MixInputBox>
          <div
            class="d-flex justify-content-between align-items-center mb-4 my-4"
          >
            <div class="d-flex gap-4 align-items-center">
              <FormKit
                type="checkbox"
                outer-class="m-0"
                label="On Promotion for"
                :value="false"
                v-model="isPromotionPriceActive"
              />
        
              <FormKit
                type="number"
                outer-class="m-0"
                name="promotion_price"
                v-model="promotion_price"
                label="Promotion price"
                placeholder="Promotion price"
                :disabled="!isPromotionPriceActive"
                :validation="`${isPromotionPriceActive ? 'required|max:' + OriginalPrice : ''}`"
                :validation-messages="{
                  max: 'Promotion price must be less than OriginalPrice',
                }"
              />
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
                help="Promotion start"
                v-model="promotionStartDate"
                :validation="isPromotionPriceActive ? 'required' : ''"
                />

              <FormKit
                type="date"
                outer-class="m-0 date-width"
                label="End date"
                placeholder="End date"
                name="promotion_end"
                :max="maxDate"
                :min="promotionStartDate || minDate"
                help="Promotion end"
                :validation="`${
                  isPromotionPriceActive ? 'required|' : ''
                }date_after:${promotionStartDate}`"
              />
              
            </div>
          </div>
        </div>
        <div v-show="activeTab === 1" class="row g-4">
          <div class="col-4">
            <MixInputBox title="Classes">
              <FormKit
                type="multiselect"
                name="classes"
                mode="multiple"
                :options="accessData.classes"
                :hideSelected="false"
              />
            </MixInputBox>
          </div>
          <div
            class="col-4"
            v-for="space in accessData.spaces"
            :key="space.value"
          >
            <MixInputBox :title="space.label">
              <FormKit
                type="multiselect"
                :name="`spaces[${space.label}]`"
                mode="multiple"
                :options="space.rooms"
                :hideSelected="false"
              />
            </MixInputBox>
          </div>
        </div>
        <div v-show="activeTab === 2">
          <div class="d-flex align-items-center gap-4 mb-4">
            <FormKit
              type="checkbox"
              name="charge_on_first"
              outer-class="m-0"
              label="Charge on 1st of every month"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="auto_renew"
              label="Will auto-renew"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="first_class_free"
              label="First class free"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="joining_fee"
              label="Joining fee"
              :value="false"
            />
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
                >Available To</span
              >
              <FormKit
                type="multiselect"
                label="Available To"
                openDirection="top"
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
                openDirection="top"
                :options="exceptTags"
                v-model="exceptTagsSelected"
              />
             
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <FormKit type="submit">Save</FormKit>
      </div>
      <button
        class="btn"
        style="position: relative; left: 365px; bottom: 10px"
        @click="$emit('close-canvas')"
      >
        Cancel
      </button>
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { useVModel } from "@vueuse/core";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
// import { periodType, planType, paymentCategory } from "@/constants/plan";
import {
  periodType,
  planType,
  paymentCategory as fullPaymentCategory,
} from "@/constants/plan";

const emit = defineEmits(["reload", "update:planData", "close-canvas"]);

const props = defineProps({
  planData: {
    type: Object,
    default: () => {},
  },
  selectedPackage: {
    type: Object,
    default: () => {},
  },
  accessData: {
    type: Object,
    default: () => {},
  },
  createDates: {
    type: Object,
    default: () => ({})
  },
  updateDates: {
    type: Object,
    default: () => ({})
  },
});

const { currentUserType } = useAuthStore();
const selectedPlan = useVModel(props, "planData", emit);
const promotionStartDate = ref(selectedPlan.value?.promotion_start);
const isPromotionPriceActive = ref(!!selectedPlan.value?.promotion_price);
// const OriginalPrice = ref(selectedPlan.value?.price -1)
const OriginalPrice = computed(() => {
  if (selectedPlan.value && selectedPlan.value.price) {
    return selectedPlan.value.price -1 ;
  }
  return 0;
});


const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Today's date in YYYY-MM-DD format
});

const { $toast } = useNuxtApp();


const activeTab = ref(0);
const { tags } = storeToRefs(useTagStore());
const availableTagsSelected = ref([]);
const exceptTagsSelected = ref([]);
const planTypeData = ref();
const paymentCategoryData = ref();
const paymentCategory = ref([...fullPaymentCategory]);

const isPromotionCurrentlyActive = computed(() => {
    const today = new Date();
    const startDate = new Date(promotionStartDate.value);
    const endDate = new Date(selectedPlan.value?.promotion_end);
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
    promotionStartDate.value = selectedPlan.value?.promotion_start;
    isPromotionPriceActive.value = !!selectedPlan.value?.promotion_price;
});

// Watch for changes in planTypeData
watch(planTypeData, (newValue) => {
  if (newValue === "credits") {
    // If 'credits' is selected
    // 1. Limit paymentCategory to only 'One-time'
    paymentCategory.value = fullPaymentCategory.filter(
      (category) => category.value === "One-time"
    );
    // 2. Remove 'Recurring' from paymentCategoryData if it's selected
    if (paymentCategoryData.value === "Recurring") {
      paymentCategoryData.value = "";
    }
  } else {
    // Otherwise, show all options
    paymentCategory.value = [...fullPaymentCategory];
  }
});

const promotion_price = ref(selectedPlan.promotion_price || "");
watch(isPromotionPriceActive, (newVal) => {
  console.log({ isPromotionPriceActive });
  if (!newVal) {
    // promotion_price.value = null;
  }
});

const createPlan = async (planData) => {
  const { data, error, execute } = useCustomFetch<any>("/packages/add/plan", {
    method: "POST",
    body: JSON.stringify({
      package_id: props.selectedPackage?.package_id,
      facility_id: currentUserType?.id,
      plans: [planData],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      emit("reload");
      $toast.success("Plan added successfully!");
      // emit("close-canvas");
    } else {
      // Enhanced error handling to prevent TypeError when data.value is null
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/package/addplan", err);
    // Optionally, show a user-friendly error message
    $toast.error("An error occurred while adding the plan. Please check the console for more details.");
  }
};



const editPlan = async (planData) => {
  const { data, error, execute } = useCustomFetch<any>("/packages/update/plan", {
    method: "POST",
    body: JSON.stringify({
      facility_id: currentUserType?.id,
      plan_id: selectedPlan.value.plan_id,
      plans: [planData],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      emit("reload");
      $toast.success("Plan edited successfully!");
      // emit("close-canvas");
    } else {
      // Handling potential null data.value more gracefully
      const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
      $toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Error:/api/package/updateplan", err);
    // Providing a user-friendly error message
    $toast.error("An error occurred while editing the plan. Please check the console for more details.");
  }
};



const submitHandler = async (planData) => {
  const totalSpaces = props.accessData.spaces.length;
  const spaces = [];
  for (let i = 0; i < totalSpaces; i++) {
    if (planData[`spaces[${props.accessData.spaces[i].label}]`])
      planData[`spaces[${props.accessData.spaces[i].label}]`].forEach(
        (item) => {
          spaces.push(item);
        }
      );
  }
  

  const getTagsOrDefault = (tags) => {
    return tags.length === 0 || tags.every((tag) => tag === "" || tag === null)
      ? [""]
      : tags;
  };

  const availableTags = getTagsOrDefault(planData.available_tags);
  const exceptTags = getTagsOrDefault(planData.except_tags);
  const postData = {
    private: planData.private ? "Yes" : "No",
    pay_with_card: planData.pay_with_card ? "Yes" : "No",
    pay_with_gift_card: planData.pay_with_gift_card ? "Yes" : "No",
    name: planData.name,
    description: planData.description,
    charge_on_first: planData.charge_on_first ? "Yes" : "No",
    auto_renew: planData.auto_renew ? "Yes" : "No",
    first_class_free: planData.first_class_free ? "Yes" : "No",
    joining_fee: planData.joining_fee ? "Yes" : "No",
    available_tags: availableTags,
    except_tags: exceptTags,
    display_original_price: planData.display_original_price ? "Yes" : "No",
    promotion_end: planData.promotion_end ?? null,
    promotion_price: isPromotionPriceActive.value
      ? planData.promotion_price ?? ""
      : "",
    promotion_start: planData.promotion_start ?? null,
    classes: planData.classes,
    spaces,
    credit_count: planData.credit_count,
    price: planData.price,
    payment_duration: planData.payment_duration,
    payment_period: planData.payment_period,
    payment_cycle: planData.payment_cycle,
    type: planData.type,
    duration: planData.duration,
    period: planData.period,
    category: planData.category,
  };
  planData.plan_id ? editPlan(postData) : createPlan(postData);
};

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

const maxDate = ref('');
watchEffect(() => {
    // Use updateDates.endDate if it's not null/undefined; otherwise, use createDates.startDate.
    maxDate.value = props.updateDates?.endDate ?? props.createDates?.endDate ?? '';
});



</script>

<style lang="scss">
.plan-tab {
  ul {
    width: 100% !important;
    li {
      flex-basis: 100%;
    }
  }
}
.plan-input-min-width {
  min-width: 180px;
}
</style>
