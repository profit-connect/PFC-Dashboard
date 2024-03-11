import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBreadcrumb } from "~/types/breadcrumb";

export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  const breadcrumb = ref<IBreadcrumb | undefined>();
  const breadcrumbTab = ref<IBreadcrumb | undefined>();
  const styles = ref({}); // New styles reactive property

  const setBreadcrumb = (item: IBreadcrumb) => {
    breadcrumb.value = item;
  };
  const unsetBreadcrumb = () => {
    breadcrumb.value = undefined;
  };
  const setBreadcrumbTab = (item: IBreadcrumb) => {
    breadcrumbTab.value = item;
  };
  const unsetBreadcrumbTab = () => {
    breadcrumbTab.value = undefined;
  };
  const setStyles = (customStyles: Record<string, any>) => {
    styles.value = customStyles; // Set custom styles
  };
  const unsetStyles = () => {
    styles.value = {}; // Reset styles
  };

  return {
    breadcrumb,
    breadcrumbTab,
    styles,
    setBreadcrumb,
    unsetBreadcrumb,
    setBreadcrumbTab,
    unsetBreadcrumbTab,
    setStyles, // New method to set styles
    unsetStyles, // New method to unset styles
  };
});
