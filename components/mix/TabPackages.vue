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
          class="tab-item d-flex align-items-center position-relative py-2  "
         
          @click="currentIndex = key"
        >
         <span  style="margin-left: 95px; "> {{ item }}</span> 
        </div>
      </SwiperSlide>
    </Swiper>
    
  
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
  right: 40px;
  width: 850px;
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
    padding: 0px 0px;
    position: relative;
    width: 240px;
    text-align: center;

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
