<template>
    <div class="container bg-white h-full">
      <div class="p-5">
        <div v-if="data && data.categories && data.categories.some(category => category != null)" class="d-flex align-items-center gap-3">
          <h1 style="font-size: 22px; margin-bottom: 0px" >Wellness Corner</h1>
          <MixButton
            style="background-color: #f2faff"
            @click="showArticleForm = true"
            size="sm"
            label="New Article"
          />
        </div>
        <div class="search">
          <SearchBar @on-search="onSearch" />
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
            label="Add category"
            style="min-width: 180px; margin-top: 5px"
          />
        </div>
        <div style="min-height: calc(100vh - 284px)">
          <div class="row g-3">
            <div
              class="col-6 col-lg-4"
              v-for="category in computedArticles"
              :key="category.id"
            >
              <CardWellness v-bind="category" @click="onArticleSelect(category.id)" />
            </div>
          </div>
        </div>
      </div>
      <Modal v-model="showArticleForm" id="class-modal">
        <template #title>
          {{ selectedArticle ? "Update" : "Create" }} a Article or Event
        </template>
        <FormWellnessArticle
          v-if="showArticleForm"
          :categories="getCategorOptions"
          @reload="refreshData"
          :category="getCurrentCategory"
          :article-data="selectedArticle"
          @close-canvas="showArticleForm = false"
        />
      </Modal>
      <Modal v-model="showCatrgoryForm" id="category-modal">
        <template #title>
          {{ selectedCategory ? "Update" : "Create" }} a Category
        </template>
        <FormWellnessCategory
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
  import type { ICategory, WellnessArticle } from "@/types/api/wellness/category";
  import { useBreadcrumbStore } from "~/store/breadcrumb";

  const breadcrumbStore = useBreadcrumbStore();
  breadcrumbStore.setBreadcrumb({
    items: [
    //   { label: "Comms", link: "#" },
      { label: "Wellness Corner", link: "#" },
    ],
  });
  
  breadcrumbStore.setStyles({
    position: "relative",
    right: "0px",
    width: "200px"
  });
  const activeTab = ref(0);
  const { currentUserType } = useAuthStore();
  const showArticleForm = ref(false);
  const selectedArticle = ref();
  const selectedCategory = ref();
  const showCatrgoryForm = ref(false);
  const searchTerm = ref();
  const { data, pending, refresh } = await useCustomFetch<any>(
    "/wellness/get/articles",
    {
      method: "POST",
      body: { facility_id: currentUserType?.id },
    }
  );
  
  const refreshData = () => {
    refresh();
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
  
  
  const computedArticles = computed(() => {
    // Verify data.value and categories exist and activeTab is within bounds
    if (data.value?.categories?.length > activeTab.value) {
      const activeCategory = data.value.categories[activeTab.value];
      // Ensure the active category is not null or undefined
      if (activeCategory) {
        // Now safely check if the class property exists and is an array
        if (Array.isArray(activeCategory.articles)) {
          let articles = activeCategory.articles
            .filter((item: WellnessArticle) => item) // Ensure each item is truthy
            .map((item: WellnessArticle) => ({
              id: item.id,
              header: item.header,
              image: `${item.src}?timestamp=${new Date().getTime()}`,
              published_date: item.published_date,
              read_time_no: item.read_time_no,
              read_time: item.read_time,

            }));
  
          // Filter based on searchTerm, if provided
          if (searchTerm.value?.trim()) {
            const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
            articles = articles.filter(
              (item: WellnessArticle) =>
                item.header.toLowerCase().includes(lowerCaseSearchTerm)
                
            );
          }
  
          return articles;
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
        computedArticles.value && !computedArticles.value.length && !pending.value
    );
  });
  
  const getCurrentCategory = computed(() => {
    return data.value && data.value.categories && data.value.categories.length
      ? data.value.categories[activeTab.value]
      : null;
  });
  
  const onArticleSelect = (article_id: number) => {
    console.log(article_id)
    selectedArticle.value =
      data.value && data.value.categories && data.value.categories.length
        ? data.value.categories[activeTab.value].articles.find(
            (item: WellnessArticle) => item && item.id === article_id.toString()
          )
        : null;
    showArticleForm.value = true;
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
  
  watch(showArticleForm, (val) => {
    if (!val) {
        selectedArticle.value = null;
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
    bottom: 43px;
    left: 880px;
  }
  </style>
  