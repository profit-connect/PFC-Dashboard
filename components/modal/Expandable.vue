<template>
  <Teleport to="body">
    <div class="modal-expandable">
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        :id="`offcanvasModal-${id}`"
        :aria-labelledby="`offcanvasModalLabel-${id}`"
      >
        <div class="row">
          <div class="col-1"  @click="subModalEnable ? (show = false) : ''"></div>
          <div class="col-4" @click="!subModalEnable ? (show = false) : ''">
            <div class="sub-modal" v-show="subModalEnable">
              <slot name="sub-modal"></slot>
            </div>
          </div>
          <div class="main col-7">
            <div class="p-2 pt-5" ref="header" v-if="$slots.title">
              <h4 class="text-center">
                <slot name="title"></slot>
              </h4>
            </div>
            <div class="body" :style="computedBodySize">
              <slot />
            </div>
            <div ref="footer">
              <slot name="footer"></slot>
              <button class="btn my-3" @click="show = false">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { useElementSize } from "@vueuse/core";
const header = ref(null);
const { height: headerHeight } = useElementSize(header);

const footer = ref(null);
const { height: footerHeight } = useElementSize(footer);

const computedBodySize = computed(() => {
  return `height:calc(100vh - ${headerHeight.value + footerHeight.value}px)`;
});

const props = defineProps<{
  modelValue: boolean;
  showSubModal: boolean;
  id: string;
}>();
const emit = defineEmits(["update:modelValue", "update:showSubModal"]);
const show = useVModel(props, "modelValue", emit);
const subModalEnable = useVModel(props, "showSubModal", emit);
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
  .main {
    background: #ffffff;
    max-height: 100vh;
    
  }
  .body {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    // Hide scrollbar for Firefox
    scrollbar-width: none;

    // Hide scrollbar for IE and Edge
    -ms-overflow-style: none;
  }
}

.offcanvas-header {
  padding: 24px var(--bs-offcanvas-padding-x);
}
</style>

<style lang="scss">
.modal-expandable {
  .offcanvas {
    background: none;
    border: none;
    
  }
  
}
.sub-modal {
  background: #ffffff;
  height: 100vh;
  width: 100%;
  overflow: scroll;

  /* Hide scrollbar for Chrome, Safari, and newer versions of Opera*/
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>