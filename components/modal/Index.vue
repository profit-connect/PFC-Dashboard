<template>
  <Teleport to="body">
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      :id="`offcanvasModal-${id}`"
      :aria-labelledby="`offcanvasModalLabel-${id}`"
    >
      <div class="offcanvas-header pb-0" v-if="$slots.title">
        <h4
          class="offcanvas-title flex-fill text-center"
          id="offcanvasModalLabel"
        >
          <slot name="title"></slot>
        </h4>
      </div>
      <div class="offcanvas-body">
        <slot />
      </div>
      <div>
        <slot name="footer"></slot>
      </div>
      <!-- <button class="btn my-3" @click="show = false">Cancel</button> -->
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
  id: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const show = useVModel(props, "modelValue", emit);
const showModal = ref();

watch(show, (val) => {
  if (val) {
    showModal.value.show();
  } else {
    showModal.value.hide();
  }
});

onMounted(() => {
  const { $bootstrap } = useNuxtApp();
  const bsOffcanvas = new $bootstrap.Offcanvas(`#offcanvasModal-${props.id}`);
  showModal.value = bsOffcanvas;

  const offcanvas = document.getElementById(`offcanvasModal-${props.id}`);
  if (offcanvas)
    offcanvas.addEventListener("hidden.bs.offcanvas", (event) => {
      show.value = false;
    });
});
</script>

<style lang="scss" scoped>
.offcanvas {
  width: 954px !important;
  background: #ffffff;
  border-radius: 25px 0px 0px 25px;
  @media (max-width: 1200px) {
    width: 90% !important;
  }
  
}
.offcanvas-header {
  // padding: 24px var(--bs-offcanvas-padding-x);
  padding-top: 16px;
}
.offcanvas-body {
  margin-bottom: 140px;
  overflow-y: scroll; /* Enables scrolling for vertical overflow */
  overflow-x: hidden;  /* Hides horizontal scrollbar */

  /* Custom vertical scrollbar styles: */
  &::-webkit-scrollbar {
    width: 5px; /* Reduced width for a thinner scrollbar */
    background-color: #f2faff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #84CEFF;
    border-radius: 10px; /* Rounded for a smoother look */
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background-color: #F2FAFF;
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(159, 109, 109, 0.3); /* Optional styling */
  }
}

</style>
