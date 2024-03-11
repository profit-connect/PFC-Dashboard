<template>
  <div class="tab disable-scorllbar mb-4">
    <Swiper
      slides-per-view="auto"
      :modules="[SwiperFreeMode, SwiperNavigation, SwiperMousewheel]"
      :mousewheel="true"
      :free-mode="true"
      :navigation="{ enabled: true, prevEl: '.tabPrev', nextEl: '.tabNext' }"
    >
      <SwiperSlide v-for="(item, key) in items" :key="key">
        <div
          :class="key === currentIndex ? 'active' : ''"
          class="tab-item d-flex align-items-center position-relative py-2 "
          style="margin-left: 10px;"
          @click="currentIndex = key"
        >
          {{ item }}
          <NuxtImg
            v-if="key === currentIndex"
            class="position-absolute end-0"
            src="/images/svg/edit-icon-white.svg"
            height="14"
            width="14"
            @click="onClickEdit(key)"
            provider="none"
          />
        </div>
      </SwiperSlide>
    </Swiper>
    <button class="btn tabPrev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </button>
    <button class="btn tabNext">
      <i class="bi bi-chevron-right"></i
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
// test 
const props = defineProps({
  modelValue: {
    type: Number,
  },
  items: {
    type: Array<string>,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue", "edit"]);
const currentIndex = useVModel(props, "modelValue", emit);

const onClickEdit = (tab: number) => {
  emit("edit", tab);
};
</script>

<style scoped lang="scss">
.tab {
  overflow-x: scroll;
  position: relative;
  // background-color: $main-bg;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -20px; // Adjust this value to move the left corner image outside the background color
    width: 20px; // Set the width of your left corner image
    height: 100%;
    background: url(~/assets/images/svg/corner/left-corner.svg) no-repeat;
    background-position: left;
  }
  .tabPrev,
  .tabNext {
    position: absolute;
    top: 0px;
    border: none;
    height: 38px;
    background-color: $main-blue;
    color: #fff;
  }
  .tabNext {
    right: 0;
  }

  .tab-item {
    cursor: pointer;
    padding: 0px 34px;
    position: relative;

    &.active {
      color: #fff;
      background-color: $main-blue;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -19px; // Adjust this value to move the left corner image outside the background color
        width: 20px; // Set the width of your left corner image
        height: 100%;
        background: url(~/assets/images/svg/corner/left-corner.svg) no-repeat;
        background-position: left;
      }

      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: -18px; // Adjust this value to move the right corner image outside the background color
        width: 20px; // Set the width of your right corner image
        height: 100%;
        background: url(~/assets/images/svg/corner/right-corner.svg) no-repeat;
        background-position: right;
      }
    }
  }
}
</style>

<style lang="scss">
.tab {
  .swiper {
    margin-left: 48px;
    margin-right: 48px;
    padding-left: 18px !important;
    padding-right: 18px !important;
  }
  .swiper-slide {
    width: fit-content;
  }
  .swiper-button-disabled {
    opacity: 0.4;
  }
}
</style>
