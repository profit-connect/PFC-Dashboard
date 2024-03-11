import { useBreadcrumbStore } from "~/store/breadcrumb";

export default defineNuxtRouteMiddleware((to, from) => {
  const { unsetBreadcrumb, unsetBreadcrumbTab } = useBreadcrumbStore();
  unsetBreadcrumb();
  unsetBreadcrumbTab();
})