import { Toast, Tooltip, Offcanvas } from "bootstrap";

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: {
      Toast,
      Tooltip,
      Offcanvas
    },
  },
}));
