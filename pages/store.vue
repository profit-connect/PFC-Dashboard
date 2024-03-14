<template>
  <div class="container bg-white h-full"> {{ computedStores }}
    <div class="p-5">
      <div class="d-flex align-items-center justify-content-between gap-3">
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
          <SearchBar @on-search="onSearch" />
        </div>
      </div>
      <div class="d-flex align-items-baseline">
        <MixTab
          v-model="activeTab"
          :items="getCategories"
          @edit="onSelectCategory"
        />
        <MixButton
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
      <div class="row g-3">
        <div
          class="col-12 col-lg-4"
          v-for="store in computedStores"
          :key="store.id"
        >
          <CardStore v-bind="store"  
          @onPlanSelect="onPlanSelect(store.id)"
          @onFeaturedChange="onFeaturedChange"
          @onPlanstatusChange="onPlanstatusChange"
            />
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
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useBreadcrumbStore } from "~/store/breadcrumb";
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Manage", link: "#" },
    { label: "Store", link: "#" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "0px",
});

const activeTab = ref(0);
const { currentUserType } = useAuthStore();
const showStoreForm = ref(false);
const selectedStore = ref();
const selectedCategory = ref();
const showCatrgoryForm = ref(false);
const searchTerm = ref("");

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

const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: any) => item.name)
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
        image: item.img_src,
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
    ? data.value.categories.map((item: any) => ({
        name: item.name,
        description: item.description,
        category_id: item.id,
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
      $toast("store status edited successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/store/storestatus", err);
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
      $toast("Store featured status edited successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/store/storefeatured", err);
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
</script>
<style lang="scss" scoped>
.search {
  position: relative;
  top: 7px;
}
</style>
