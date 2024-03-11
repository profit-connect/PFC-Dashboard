<script setup lang="ts">
// test 
import type { IAlertBox } from "~/types/mix/alert";
import { ref } from "vue";
import type { OnClickOutsideHandler } from "@vueuse/core";
import { onClickOutside } from "@vueuse/core";

const modal = ref(false);
const modalRef = ref(null);
const title = ref();
const alertType = ref("info");
const message = ref();
const alwaysOpen = ref(false);

const { on } = useEventBus<IAlertBox>("alert-box");

on((val: IAlertBox) => {
  val.destroy ? (modal.value = false) : (modal.value = true);
  title.value = val.title;
  message.value = val.message;
  alertType.value = val.type ?? "info";
  alwaysOpen.value = val.alwaysOpen ?? false;
});

onClickOutside(modalRef, (event) => {
  if (!alwaysOpen.value) modal.value = false;
});

const closeAlert = () => {
  if (!alwaysOpen.value) modal.value = false;
};
</script>

<template>
  <ClientOnly>
    <Transition name="nested" :duration="450">
      <div v-if="modal" class="alert-box-custom">
        <div class="inner card" ref="modalRef">
          <div class="position-absolute top-0 end-0" v-if="!alwaysOpen">
            <button class="btn" @click="closeAlert">X</button>
          </div>
          <div class="py-4 px-5">
            <h2>{{ title }}</h2>
            <p>
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.alert-box-custom {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
// for backdrop
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}
.nested-enter-from,
.nested-leave-to {
  opacity: 0;
}
// for alertbox
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: scale(0.5);
  opacity: 0;
}
</style>
