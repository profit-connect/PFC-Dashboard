<template>
    <div class="px-5 store-form">
      <FormKit
        type="form"
        @submit="submitHandler"
        :actions="false"
      >
     
            <div class="row">
              <div class="col-6">
                <FormKit
                  type="text"
                  label="Title"
                  name="title"
                  placeholder="Title"
                  validation="required"
                />
              </div>
              <div class="col-6">
                <FormKit
                  type="multiselect"
                  label="Level id"
                  name="level_id"
                  placeholder="Access Level"
                  openDirection="bottom"
                  validation="required"
                  :options="levels"
                />
              </div>
            </div>
            <FormKit
              type="textarea"
              name="description"
              label="Description"
              placeholder="Description"
              validation="required"
              :classes="{
                input: 'description-height',
              }"
            />
          
        <div class="row mb-4">
          <div class=""></div>
          <div class="d-flex align-items-center justify-content-between gap-2">
              <FormKit
                type="checkbox"
                name="dashboard-access"
                outer-class="m-0"
                label="Dashboard Access"
                :value="false"
              />
              <FormKit
                type="checkbox"
                outer-class="m-0"
                name="admin-app-access"
                label="Admin App Access"
                :value="false"
              />
              <FormKit
                type="checkbox"
                name="on-payroll"
                outer-class="m-0"
                label="On Payroll"
                :value="false"
              />
              <FormKit
                type="checkbox"
                outer-class="m-0"
                name="performance-monitored"
                label="Performance Monitored"
                :value="false"
              />
           
          </div>
          <div class="tinies">
          <FormKit
                type="tiny"
                outer-class="m-0"
                name="tiny"
                label="Performance Monitored"
             
              />
            </div>
        </div>
     
        <div class="row">
       
      
        </div>
        <div
          class="mt-4 d-flex justify-content-center flex-column"
          style="position: fixed; bottom: 0; right: 17%; margin-bottom: 20px"
        >
          <div><FormKit type="submit">Save</FormKit></div>
          <div>
            <button
              class="btn"
              style="margin-left: 145px"
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
  const levels = ref({
  accessLevel1: {
    id: "1",
    description: "Level 1"
  },
  accessLevel2: {
    id: "2",
    description: "Level 2"
  },
  accessLevel3: {
    id: "3",
    description: "Level 3"
  },
  accessLevel4: {
    id: "4",
    description: "Level 4"
  }
  // Add more access levels if needed
});
//   const { tags } = storeToRefs(useTagStore());
  
//   const exceptTags = computed(() => {
//     return tags.value
//       ? tags.value
//           .filter(
//             (item) =>
//               availableTagsSelected.value &&
//               !availableTagsSelected.value.includes(item.id.toString())
//           )
//           .map((item) => ({ label: item.name, value: item.id }))
//       : [];
//   });
  
//   const computedSelectedStore = computed(() => {
//     return props.storeData
//       ? {
//           ...props.storeData,
//           available_tags: props.storeData.available_tags
//             .filter((item) => item)
//             .map((item) => item.id),
//           except_tags: props.storeData.except_tags
//             .filter((item) => item)
//             .map((item) => item.id),
//           display_original_price:
//             props.storeData.display_original_price === "Yes" ? true : false,
//           pay_with_gift_card:
//             props.storeData.pay_with_gift_card === "Yes" ? true : false,
//           pay_with_card: props.storeData.pay_with_card === "Yes" ? true : false,
//           promotion_price: parseFloat(props.storeData.promotion_price) || "",
//         }
//       : {};
//   });
//   const isPromotionPriceActive = ref(!!computedSelectedStore.value?.promotion_price);
//   const promotionStartDate = ref(computedSelectedStore.value?.promotion_start);
//   const OriginalPrice = computed(() => {
//     if (computedSelectedStore.value && computedSelectedStore.value.price) {
//       return computedSelectedStore.value.price -1 ;
//     }
//     return 0;
//   });
//   // const minDate = computed(() => {
//   //   return new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
//   // });
//   const minDate = computed(() => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//     const day = String(today.getDate()).padStart(2, "0");
  
//     return `${year}-${month}-${day}`; // Today's date in YYYY-MM-DD format
//   });
  
//   const isPromotionCurrentlyActive = computed(() => {
//       const today = new Date();
//       const startDate = new Date(promotionStartDate.value);
//       const endDate = new Date(computedSelectedStore.value?.promotion_end);
//       return startDate <= today && today <= endDate;
//   });
  
//   // Adjust the minimum start date for the promotion based on whether it's currently active
//   const effectiveMinDate = computed(() => {
//       if (isPromotionCurrentlyActive.value && promotionStartDate.value) {
//           // If the promotion is active, allow the original start date as the minimum
//           return promotionStartDate.value;
//       }
//       return minDate.value; // Otherwise, use today's date
//   });
  
//   watchEffect(() => {
//       promotionStartDate.value = computedSelectedStore.value?.promotion_start;
//       isPromotionPriceActive.value = !!computedSelectedStore.value?.promotion_price;
//   });
  
//   const availableTags = computed(() => {
//     return tags.value
//       ? tags.value
//           .filter(
//             (item) =>
//               exceptTagsSelected.value &&
//               !exceptTagsSelected.value.includes(item.id.toString())
//           )
//           .map((item) => ({ label: item.name, value: item.id }))
//       : [];
//   });
//   const promotion_price = ref(computedSelectedStore.promotion_price  || "");
//   watch(isPromotionPriceActive, (newVal) => {
//     console.log({ isPromotionPriceActive });
//     if (!newVal) {
//       // promotion_price.value = null;
//     }
//   });
//   const addRoles = async (storeData: any) => {
//     const { data, error, execute } = useCustomFetch<any>("/roles/add/role", {
//       method: "POST",
//       body: JSON.stringify({
//         ...storeData,
//         facility_id: currentUserType?.id,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     try {
//       await execute();
  
//       if (data.value && data.value.return) {
//         $toast("Store added successfully!");
//         emit("reload");
//         // emit("close-canvas");
//       } else {
//         const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
//         $toast(errorMessage);
//       }
//     } catch (err) {
//       console.error("Error:/api/store/add", err);
//       $toast("Failed to add store item due to an exception.");
//     }
//   };
  
  
//   const updateRoles = async (storeData: any) => {
//     console.log(storeData)
//     const { data, error, execute } = useCustomFetch<any>("/store/update/item", {
//       method: "POST",
//       body: JSON.stringify({
//         ...storeData,
//         facility_id: currentUserType?.id,
//         store_item_id: computedSelectedStore.value?.id,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     try {
//       await execute();
  
//       if (data.value && data.value.return) {
//         $toast("Store edited successfully!");
//         emit("reload");
//         // emit("close-canvas");
//       } else {
//         const errorMessage = data.value ? data.value.message : "Unexpected error occurred. Please try again.";
//         $toast(errorMessage);
//       }
//     } catch (err) {
//       console.error("Error:/api/store/edit", err);
//       $toast("Failed to edit store item due to an exception.");
//     }
//   };
  
  
  const submitHandler = async () => {
      emit("close-canvas");
      console.log("data");
    // const data = {
    //   ...storeData,
    //   dashboard: storeData.dashboard ? "Yes" : "No",
    //   pay_with_gift_card: storeData.pay_with_gift_card ? "Yes" : "No",
    //   pay_with_card: storeData.pay_with_card ? "Yes" : "No",
    //   promotion_price: isPromotionPriceActive.value
    //     ? storeData.promotion_price ?? ""
    //     : "",
    // };
    // computedSelectedStore.value?.id ? updateRoles(data) : addRoles(data);
  };
  </script>
  <style lang="scss">
  .store-form {
    .description-height {
      height: 10em !important;
    }
  }
  </style>