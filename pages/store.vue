<template>
  <div class="container bg-white h-full"> 
    <div class="p-5">
      <div  v-if="data && data.categories && data.categories.some(category => category != null)" class="d-flex align-items-center gap-3">
        <div class="d-flex align-items-center gap-4">
          <h1 style="font-size: 22px; margin-bottom: 0px">Store</h1>
          <MixButton
            style="background-color: #f2faff"
            @click="showStoreForm = true"
            size="sm"
            label="New Item"
          />
        </div>
        <div class="search">
          <SearchBar placeholder="&nbsp;Search....." @on-search="onSearch" />
        </div>
      </div>
      <div class="d-flex align-items-baseline mt-5 ">
        <MixTab
          v-model="activeTab"
          :items="getCategories"
          @edit="onSelectCategory"
        />
        <MixButton style="width: 220px;"
          @click="showCatrgoryForm = true"
          size="sm"
          label="Add category"
        />
      </div>
      <!-- <div class="row g-3">
        <div
          class="col-12 col-lg-4"
          v-for="store in computedStores"
          :key="store.id"
          @click="onStoreSelect(store.id)"
        >
          <CardStore v-bind="store"  
            />
        </div>
      </div> -->
      <div style="min-height: calc(100vh - 284px)">
      <div class="row g-3">
        <div
          class="col-12 col-lg-4"
          v-for="store in computedStores"
          :key="store.id"
        >
          <CardStore v-bind="store"  
          @pushMember="showMemberModal"
          @onPlanSelect="onPlanSelect(store.id)"
          @onFeaturedChange="onFeaturedChange"
          @onPlanstatusChange="onPlanstatusChange"
            />
        </div>
      </div>
    </div>
    </div>
    <Modal v-model="showStoreForm" id="store-modal">
      <template #title>
        {{ selectedStore ? "Update" : "Create" }} Store Item
      </template>
      <FormStore
        :categories="getCategoryOptions"
        @reload="refreshData"
        :category="getCurrentCategory"
        :store-data="selectedStore"
        v-if="showStoreForm"
        @close-canvas="showStoreForm = false"
      />
    </Modal>
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedCategory ? "Update" : "Create" }} a Category
      </template>
      <FormStoreCategory
        v-if="showCatrgoryForm"
        v-model:category-data="selectedCategory"
        @reload="refreshData"
        :categories="computedCategories"
        @close-canvas="showCatrgoryForm = false"
      />
    </Modal>
    <ModalExpandable
      v-model="showMember"
      id="day-member-modal"
      v-model:showSubModal="isAddNewMember"
    >
      <template #title>
        <div class="d-flex justify-content-between">
          Member Search<MixBtnGroup
            style="font-size: 11px"
            v-model="memberSort"
            :labels="['A-Z', 'Z-A']"
          />
        </div>
        <FormKit 
        style=" border-bottom-left-radius: 0px; border-top-left-radius: 0px; "
          type="search"
          label="FormKit Input"
          prefix-icon="search"
          placeholder="Search member or Tags"
          v-model="memberText"
        />
     
       <!-- <p style="font-size: 14px; color: red;">{{ capacityMessage }}</p>  -->
      </template>
      <div>
         <!-- <ListStore
           v-if="membersData && membersData.members"
           v-for="member in membersData.members
        .filter(member => member.membership_status === 'Active')
        .filter(member => {
          const searchTermLower = memberText.toLowerCase(); // Replicate the working logic
          const matchesName = (member.firstname && member.firstname.toLowerCase().includes(searchTermLower)) ||
                          (member.lastname && member.lastname.toLowerCase().includes(searchTermLower));
          const matchesTag = member.tags?.some(tagId => { 
            const tag = tags?.find(t => t.id === tagId); 
            return tag ? tag.name.toLowerCase().includes(searchTermLower) : false;
          }) || false; // Default to false if no tags
          console.log(matchesTag)
          return matchesName || matchesTag;
        })
        .sort((a, b) => {
          return memberSort === 1 
            ? a.firstname.localeCompare(b.firstname) 
            : b.firstname.localeCompare(a.firstname);
        })"
      :key="member.id"
      :member="member"
      @click.prevent="onSelectMember(member.id)"
      :class="{ active: selectedMember.includes(member.id) }"
    /> -->
    <ListStore
  v-if="membersData && membersData.members"
  v-for="member in membersData.members
    .filter(member => member && member.membership_status === 'Active' && member.firstname && member.lastname && member.tags)
    .filter(member => {
      const searchTermLower = memberText.toLowerCase();
      const matchesName = (member.firstname && member.firstname.toLowerCase().includes(searchTermLower)) ||
                          (member.lastname && member.lastname.toLowerCase().includes(searchTermLower));
      const matchesTag = member.tags && member.tags.some(tagId => { 
        const tag = tags?.find(t => t.id === tagId); 
        return tag ? tag.name.toLowerCase().includes(searchTermLower) : false;
      });
      return matchesName || matchesTag;
    })
    .sort((a, b) => {
      return memberSort === 1 
        ? a.firstname.localeCompare(b.firstname) 
        : b.firstname.localeCompare(a.firstname);
    })"
  :key="member.id"
  :member="member"
  @click.prevent="onSelectMember(member.id)"
  :class="{ active: selectedMember.includes(member.id) }"
/>


      </div>
      <template #footer>
        <div class="d-flex justify-content-center">
          <MixButton
            label="Save"
            style="border: 1px solid #84ceff; width: 300px"
            :disableIcon="true"
            @click="addProducts"
          />
        </div>
      </template>
    </ModalExpandable>
    <div class="d-flex justify-content-center" style="position: relative" 
    v-if="checkout" >
    <div class="checkout-container">
      <div class="checkout-item avatar">
        <img v-if="selectedMemberDetails?.img_src && !memberImageError" class="member-avatar" :src="getImageUrl(selectedMemberDetails?.img_src)" @error="memberImageError = true" alt="Member Avatar">
        <div v-else class="checkout-item avatar-initials">
            <!-- Display initials if the image fails to load or if there is no image -->
            {{ formatName(selectedMemberDetails?.firstname.charAt(0) )}}{{ formatName(selectedMemberDetails?.lastname.charAt(0) )}}
          </div>
        <span class="checkout-item name small-title-medium"
       > &nbsp;&nbsp;{{ formatName(selectedMemberDetails.firstname) }} 
      {{ formatName(selectedMemberDetails.lastname) }}</span> 
  </div>

  <div class="checkout-item quantity">
    Quantity: <p class=" small-title-medium" style="font-size: 22px;"> 1 </p><!-- Dynamically populate quantity -->
  </div>
  <div class="checkout-item subtotal">
    Sub Total: <p class=" small-title-medium" style="font-size: 22px;">
      <img src="~/assets/images/svg/tag-icon.svg" /> &nbsp;AED 35.00 </p><!-- Dynamically populate subtotal -->
  </div>
  <div class="checkout-item actions">
    <button @click="purchaseForm" class="btn-checkout small-title-medium">Check-out</button>
    <button  @click="checkout=false" class="btn-cancel">Cancel</button>
  </div>
    </div>
    </div>
    <Modal v-model="showPurchaseForm" id="purchase-modal">
    <FormStorePurchase
    :member-info="selectedMemberDetails"
    />
  </Modal>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import type { ICategory, IItem } from "@/types/api/store/category";
import { useBreadcrumbStore } from "~/store/breadcrumb";
const { $toast } = useNuxtApp();
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Manage", link: "" },
    { label: "Store", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "0px",
});

const activeTab = ref(0);
const { currentUserType } = useAuthStore();
const { getUrl: getImageUrl } = useBoImage();
const showStoreForm = ref(false);
const selectedStore = ref();
const selectedCategory = ref();
const showCatrgoryForm = ref(false);
const selectedMember = ref([]);
const searchTerm = ref("");
const selectedMemberId = ref();
const showMember = ref(false);
const showPurchaseForm = ref(false);
const memberSort = ref(1);
const memberText = ref("");
const checkout = ref(false);

const showMemberModal = (type: string) => {
  showMember.value = true;
  console.log("diufcidb")
};

function formatName(string) {
  if (!string) return "";
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(" ");
}

const { data: membersData } = await useCustomFetch<any>(
  "/members/get/members",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);

const { data, pending, refresh } = await useCustomFetch<any>(
  "/store/get/items",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id, category: "All", status: "All" },
  }
);

const refreshData = () => {
  refresh();
};

const getCategoryOptions = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))
    : [];
});

// const getCategories = computed(() => {
//   return data.value && data.value.categories
//     ? data.value.categories.map((item: any) => item.name)
//     : [];
// });
const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories
        .filter((item: ICategory | null | undefined) => item != null)
        .map((item: ICategory) => item.name)
    : [];
});


const computedStores = computed(() => {
  const items = data.value?.categories?.[activeTab.value]?.items;

  if (Array.isArray(items)) {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    return items.filter(item => item)
      .filter(item => 
        item && typeof item === 'object' && (!searchTerm.value || item.name.toLowerCase().includes(lowerCaseSearchTerm))
      )
      .map(item => {
        return {
          id: item.id,
        name: item.name,
        capacity: item.capacity,
        description: item.description,
        image: `${item.img_src}?timestamp=${new Date().getTime()}`,
        price: item.price,
        promotion_price: item.promotion_price,
        display_original_price: item.display_original_price,
        status: item.status,
        featured: item.featured
        };
      });
  } else {
    console.warn('Expected items to be an array, but got:', items);
    return [];
  }
});


const computedCategories = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories
        .filter((item: any) => item !== null && item !== undefined) // Filter out null or undefined items
        .map((item: any) => ({
          name: item?.name,
          description: item?.description,
          category_id: item?.id,
        }))
    : [];
});

const getCurrentCategory = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value]
    : null;
});

// const onStoreSelect = (store_id: number) => {
//   selectedStore.value =
//     data.value && data.value.categories && data.value.categories.length
//       ? data.value.categories[activeTab.value].items.find(
//           (item: any) => item && item.id === store_id.toString()
//         )
//       : null;
//   showStoreForm.value = true;
// };



const onSelectMember = (id: number) => {
  selectedMemberId.value= id;
  checkout.value =  true;
  showMember.value = false;
};

const purchaseForm = (id: number) => {
  // selectedMemberId.value= id;
  showPurchaseForm.value =  true;
  // showMember.value = false;
};

const selectedMemberDetails = computed(() => {
  if (!membersData.value || !membersData.value.members || !selectedMemberId.value) {
    return null;
  }
  return membersData.value.members.find(member => member.id === selectedMemberId.value) || null;
});


const onPlanSelect = (store_id: number) => {
  selectedStore.value =
    data.value && data.value.categories && data.value.categories.length
      ? data.value.categories[activeTab.value].items.find(
          (item: any) => item && item.id === store_id.toString()
        )
      : null;
  showStoreForm.value = true;
};

const onPlanstatusChange = async (selectedStore: any) => {
  console.log(selectedStore)
  try {
    const { data } = await useCustomFetch<any>("/store/update/itemstatus", {
      method: "POST",
      body: {
        ...selectedStore,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      refresh();
      $toast("Store status updated successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/store/update/itemstatus", err);
  }
};

const onFeaturedChange = async (selectedStore: any) => {
  try {
    const { data } = await useCustomFetch<any>(
      "/store/update/itemfeatured",
      {
        method: "POST",
        body: {
          ...selectedStore,
          facility_id: currentUserType?.id,
        },
      }
    );
    if (data.value.return) {
      refresh();
      $toast("Store featured  updated successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/store/update/itemfeatured", err);
  }
};



const onSelectCategory = (tab: number) => {
  selectedCategory.value =
    data.value && data.value.categories && data.value.categories.length
      ? {
          name: data.value.categories[tab].name,
          description: data.value.categories[tab].description,
          category_id: data.value.categories[tab].id,
          id: data.value.categories[tab].id,
        }
      : null;
  showCatrgoryForm.value = true;
};

const onSearch = (data: string) => {
  searchTerm.value = data;
};

watch(showStoreForm, (val) => {
  if (!val) {
    selectedStore.value = null;
  }
});

watch(showCatrgoryForm, (val) => {
  if (!val) {
    selectedCategory.value = null;
  }
});

const memberImageError = ref(false);
watch(
  () => selectedMemberDetails.value?.img_src,
  (newImgSrc) => {
    // Only reset imageError if newImgSrc is not undefined
    if (newImgSrc !== undefined) {
      memberImageError.value = false;
    }
  },
  { immediate: true } // This ensures the watcher is run immediately with the current value
);
</script>
<style lang="scss" scoped>
.search {
  width: 200px;
  position: relative;
  bottom: -10px;
  left: 67%;
}
.checkout-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding: 0px 20px 0px 20px;
  min-width: 937px;
  min-height: 90px;
  background: #F2FAFF;
  border: 2px solid #84CEFF;
  border-radius: 10px;
  margin: auto; /* Center the checkout-container */
  position: relative;
  bottom: 40px; /* Position at the bottom with 40px offset */
  left: 0;
  right: 0;
 
}

.checkout-item {
  margin: 0 10px; /* Add some space between the items */ 
}

.avatar {
display: flex;
}
.avatar img {
  border-radius: 50%; /* Make the avatar image round */
  width: 50px; /* Set a fixed width */
  height: 50px; /* Set a fixed height */
}
.name {
font-size: 22px;
position: relative;
top: 3px;
}
.btn-checkout, .btn-cancel {
  border: none;
  border-radius: 5px;
  margin-left: 10px; /* Add space between buttons */
}

.btn-checkout {
  background-color: #FFD700; /* Checkout button color */
  font-size: 22px;
  padding: 10px 20px;
   max-width: 185px;
   height: 50px;
}

.btn-cancel {
  background-color: #f5f5f5; /* Cancel button color */
  color: #333; /* Text color for cancel button */
  font: 14px;
}
.avatar-initials {
  display: flex;
  align-items: center; /* Centers the initials vertically */
  justify-content: center; /* Centers the initials horizontally */
  width: 50px;
  height:50px;
  border-radius: 50%; /* Makes the div circular */
  background-color: #84ceff; /* Example background color, change as needed */
  color: white; /* Example text color, change as needed */
  font-size: 16px; /* Adjust based on your design */
  font-weight: bold; /* Makes the letters a bit thicker */
  // margin-right: 15px;
}
/* Make sure to add responsive design features such as media queries 
   if you need the layout to be responsive. */

</style>