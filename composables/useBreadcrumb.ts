import { useBreadcrumbStore } from "~/store/breadcrumb";

export default () => {
  const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumbStore();

  return {
    setBreadcrumb,
    setBreadcrumbTab,
  };
};
