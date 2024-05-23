<template>
  <div class="container bg-white" style="height: 100%;" >
    <div class="p-2 pt-4">
      <div v-if="data && data.categories && data.categories.some(category => category != null)" class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px" >Classes</h1>
        <MixButton
          style="background-color: #f2faff"
          @click="showClassForm = true"
          size="sm"
          label="New Class"
        />
      </div>
      <div class="search">
        <SearchBar placeholder="&nbsp;Search....." @on-search="onSearch" />
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
          style="min-width: 180px; margin-top: 5px"
        />
      </div>
      <div style="min-height: calc(100vh - 284px)">
        <div class="row g-3  case">
          <div
            class="col-6 col-lg-4"
            v-for="category in computedClasses"
            :key="category.id"
          >
            <CardClass v-bind="category" @click="onClassSelect(category.id)" />
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showClassForm" id="class-modal">
      <template #title>
        {{ selectedClass ? "Update" : "Create" }} a Class or Event
      </template>
      <FormClass
        v-if="showClassForm"
        :categories="getCategorOptions"
        @reload="refreshData"
        :category="getCurrentCategory"
        :class-data="selectedClass"
        @close-canvas="showClassForm = false"
      />
    </Modal>
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedCategory ? "Update" : "Create" }} a Category
      </template>
      <FormClassCategory
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
import type { ICategory, IClass } from "@/types/api/class/category";
import { useBreadcrumbStore } from "~/store/breadcrumb";
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Control Panel", link: "" },
    { label: "Classes", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "0px",
});
const activeTab = ref(0);
const { currentUserType } = useAuthStore();
const showClassForm = ref(false);
const selectedClass = ref();
const selectedCategory = ref();
const showCatrgoryForm = ref(false);
const searchTerm = ref();
const { data, pending, refresh } = await useCustomFetch<any>(
  "/category/get/categories",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);
// const refreshData = () => {
//   refresh();
// };

const refreshData = () => {
  refresh().then(() => {
    // Loop through each category
    data.value.categories.forEach(category => {
      // Update category image URL for cache busting
      if (category.img_src) {
        category.img_src = `${category.img_src.split('?')[0]}?timestamp=${new Date().getTime()}`;
      }
      
      // Check if the category has classes and they are not null
      if (Array.isArray(category.class) && category.class[0]) {
        // Loop through each class within the category
        category.class.forEach(classItem => {
          // Update class image and video URLs for cache busting
          if (classItem) {
            if (classItem.img_src) {
              classItem.img_src = `${classItem.img_src.split('?')[0]}?timestamp=${new Date().getTime()}`;
            }
            if (classItem.img_video) {
              classItem.img_video = `${classItem.img_video.split('?')[0]}?timestamp=${new Date().getTime()}`;
            }
          }
        });
      }
    });
    
    // Trigger reactivity to update the view with new data
    data.value = { ...data.value };
  });
};




const getCategorOptions = computed(() => {
  return data.value?.categories
    ? data.value.categories
        .filter((item: ICategory | null) => item !== null && item !== undefined) // Filter out null or undefined items
        .map((item: ICategory) => ({
          label: item.name,
          value: item.id,
        }))
    : [];
});


const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories
        .filter((item: ICategory | null | undefined) => item != null)
        .map((item: ICategory) => item.name)
    : [];
});


const computedClasses = computed(() => {
  // Verify data.value and categories exist and activeTab is within bounds
  if (data.value?.categories?.length > activeTab.value) {
    const activeCategory = data.value.categories[activeTab.value];
    // Ensure the active category is not null or undefined
    if (activeCategory) {
      // Now safely check if the class property exists and is an array
      if (Array.isArray(activeCategory.class)) {
        let classes = activeCategory.class
          .filter((item: IClass) => item) // Ensure each item is truthy
          .map((item: IClass) => ({
            id: item.id,
            name: item.name,
            image: `${item.img_src}?timestamp=${new Date().getTime()}`,
            // image: item.img_src,
            img_video: item.img_video,
            duration: item.duration,
            description: item.description,
            period: item.period,
          }));

        // Filter based on searchTerm, if provided
        if (searchTerm.value?.trim()) {
          const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
          classes = classes.filter(
            (item: IClass) =>
              item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
              item.description?.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }

        return classes;
      }
    }
  }
  return [];
});

const computedCategories = computed(() => {
  if (
    Array.isArray(data.value?.categories) &&
    data.value.categories.length > 0
  ) {
    return data.value.categories
      .filter((item) => item != null) // Exclude null or undefined items
      .map((item) => ({
        name: item.name,
        description: item.description,
        image: item.img_src,
        category_id: item.id,
      }));
  } else {
    return [];
  }
});

const showNoDataMsg = computed(() => {
  return (
    computedClasses.value && !computedClasses.value.length && !pending.value
  );
});

const getCurrentCategory = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value]
    : null;
});

const onClassSelect = (class_id: number) => {
  selectedClass.value =
    data.value && data.value.categories && data.value.categories.length
      ? data.value.categories[activeTab.value].class.find(
          (item: IClass) => item && item.id === class_id.toString()
        )
      : null;
  showClassForm.value = true;
};

const onSelectCategory = (tab: number) => {
  selectedCategory.value =
    data.value && data.value.categories && data.value.categories.length
      ? {
          name: data.value.categories[tab].name,
          description: data.value.categories[tab].description,
          image: data.value.categories[tab].img_src,
          category_id: data.value.categories[tab].id,
        }
      : null;
  showCatrgoryForm.value = true;
};

const onSearch = (data: string) => {
  searchTerm.value = data;
};

watch(showClassForm, (val) => {
  if (!val) {
    selectedClass.value = null;
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
  width: 200px;
  position: relative;
  bottom: 45px;
  left: 85%;
}
.case {
  position: relative;
  bottom: 10px;
}
</style>