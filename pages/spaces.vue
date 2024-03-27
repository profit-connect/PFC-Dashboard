<template>
  <div class="container bg-white h-full">
    <div class="p-5">
      <div  v-if="data && data.categories && data.categories.some(category => category != null)" class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px">Spaces</h1> 
        <MixButton
          style="background-color: #f2faff"
          @click="showSpaceForm = true"
          size="sm"
          label="New Space"
        />
      </div> 
      <div class="d-flex align-items-baseline mt-4">
        <MixTab
          v-model="activeTab"
          :items="getCategories"
          @edit="onSelectCategory"
        />
        <MixButton
          @click="showCatrgoryForm = true"
          size="sm"
          label="Add Category"
          style="min-width: 190px; margin-top: 5px"
        />
      </div>
      <div style="min-height: calc(100vh - 284px)">
      <div class="row g-3">
        <div
          class="col-6 col-lg-3"
          v-for="space in computedSpaces"
          :key="space.id"
        >
          <CardSpace v-bind="space" @click="onSpaceSelect(space.id)" />
        </div>
      </div>
    </div>
    </div>
    <Modal v-model="showSpaceForm" id="space-modal">
      <template #title>
        {{ selectedSpace ? "Update" : "Create" }} Space
      </template>
      <FormSpace
        :categories="getCategorOptions"
        @reload="refreshData"
        :category="getCurrentCategory"
        :space-data="selectedSpace"
        :facility-timing="facilityTiming"
        v-if="showSpaceForm"
        @close-canvas="showSpaceForm = false"
      />
    </Modal>
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedCategory ? "Update" : "Create" }} a Category
      </template>
      <FormSpaceCategory
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
import { defaultTiming } from "~/constants/common";
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Control Panel", link: "" },
    { label: "Spaces", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "0px",
});

const activeTab = ref(0);
const { currentUserType } = useAuthStore();
const showSpaceForm = ref(false);
const selectedSpace = ref();
const selectedCategory = ref();
const showCatrgoryForm = ref(false);
const facilityData = ref(null);

const { data, pending, refresh } = await useCustomFetch(
  "/space/get/categories",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);

const refreshData = () => {
  refresh();
};



const getCategorOptions = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories
        .filter((item: any) => item != null) // Filter out null or undefined items
        .map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
    : [];
});

const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories
        .filter((item: any) => item != null) // Filter out null or undefined items
        .map((item: any) => item.name)
    : [];
});

const computedSpaces = computed(() => {
  // Check if the room property exists and is an array for the active category
  const rooms = data.value?.categories?.[activeTab.value]?.room;
  if (Array.isArray(rooms)) {
    return rooms
      .filter((item: any) => item) // Ensure item is not null or undefined
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        capacity: item.capacity,
        description: item.description,
      }));
  } else {
    return [];
  }
});

const computedCategories = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories
        .filter((item: any) => item !== null && item !== undefined) // Filter out null or undefined items
        .map((item: any) => ({
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

const onSpaceSelect = (space_id: number) => {
  selectedSpace.value =
    data.value && data.value.categories && data.value.categories.length
      ? data.value.categories[activeTab.value].room.find(
          (item: any) => item && item.id === space_id.toString()
        )
      : null;
  showSpaceForm.value = true;
};

const onSelectCategory = (tab: number) => {
  selectedCategory.value =
    data.value && data.value.categories && data.value.categories.length
      ? {
          name: data.value.categories[tab].name,
          description: data.value.categories[tab].description,
          category_id: data.value.categories[tab].id,
        }
      : null;
  showCatrgoryForm.value = true;
};

watch(showSpaceForm, (val) => {
  if (!val) {
    selectedSpace.value = null;
  }
});

watch(showCatrgoryForm, (val) => {
  if (!val) {
    selectedCategory.value = null;
  }
});


const SelectFacility = async () => {
  try {
    const { data } = await useCustomFetch<any>("/franchise/get/franchise", {
      method: "POST",
      body: {
        facility_id: currentUserType?.id,
      },
    });
    facilityData.value = data;
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } 
};
const facilityTiming = computed(() => {
  if (!facilityData.value) return null;

  const timing =
    facilityData.value.value.facility[0].general[0].timings.filter(Boolean);
  if (!timing.length) return defaultTiming();

  return timing.map(({ day, start_time, end_time }) => ({
    day,
    start_time,
    end_time,
  }));
});

onMounted(SelectFacility);
</script>
