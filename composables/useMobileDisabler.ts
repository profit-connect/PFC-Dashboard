import { useWindowSize } from "@vueuse/core";

export default () => {
  const { width } = useWindowSize();
  const { showAlertBox, closeAlertBox } = useAlertBox();
  const isMobileAlertActive = ref(false);

  watch(
    width,
    (val) => {
      if (val <= 576) {
        if (!isMobileAlertActive.value) {
          showAlertBox({
            type: "info",
            title: "Warning",
            message: "Only on desktop",
            alwaysOpen: true,
          });
          isMobileAlertActive.value = true;
        }
      } else {
        if (isMobileAlertActive.value) {
          closeAlertBox();
          isMobileAlertActive.value = false;
        }
      }
    },
    { immediate: true }
  );
};
