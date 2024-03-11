<template>
  <div class="breadcrumb" v-if="breadcrumb">
    <div
      class="container h-100 row align-items-center justify-content-between mx-auto"
    >
      <div class="col-2" :style="styles">
        <ul class="link">
          <li v-for="item in breadcrumb.items" :key="item.link.toString()">
            <!-- <NuxtLink :to="item.link"> {{ item.label }}</NuxtLink> -->
            <NuxtLink v-if="typeof item.link === 'string'" :to="item.link">
              {{ item.label }}</NuxtLink
            >
            <a @click="router.push(item.link)" v-else>{{ item.label }}</a>
          </li>
        </ul>
      </div>
      <div class="breadcrumb-tab col-10" v-if="breadcrumbTab">
        <Swiper
          slides-per-view="auto"
          :modules="[SwiperFreeMode, SwiperNavigation, SwiperMousewheel]"
          :mousewheel="true"
          :free-mode="true"
          :navigation="{
            enabled: true,
            prevEl: '.tabPrev',
            nextEl: '.tabNext',
          }"
        >
          <SwiperSlide v-for="(item, key) in breadcrumbTab.items" :key="key">
            <div
              class="tab-item d-flex align-items-center position-relative"
              :class="
                typeof item.link === 'string'
                  ? route.path === item.link
                    ? 'active'
                    : ''
                  : route.path === item.link.path
                  ? 'active'
                  : ''
              "
            >
              <NuxtLink v-if="typeof item.link === 'string'" :to="item.link">
                {{ item.label }}</NuxtLink
              >
              <a @click="router.push(item.link)" v-else>{{ item.label }}</a>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBreadcrumbStore } from "~/store/breadcrumb";

const router = useRouter();
const route = useRoute();

const { breadcrumb, breadcrumbTab, styles } = storeToRefs(useBreadcrumbStore());
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 0px;
  width: 100%;
  height: 43px;
  background: $dark-blue-seconadary;
  color: #c5c5c5;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    margin-left: -50px;
    &.link {
      a {
        color: #c5c5c5;
        text-decoration: none;

        &:last-child:not(.is-active) {
          color: #ffffff;
        }
      }
      li {
        display: flex;
        align-items: center;
        &:not(:last-child)::after {
          content: ">";
          margin: 0 10px;
          font-size: 18px;
        }
      }
    }
  }
  .breadcrumb-tab {
    position: relative;
    left: 115px;

    .tabPrev,
    .tabNext {
      position: absolute;
      top: 0px;
      border: none;
      height: 44px;
      color: #fff;
    }
    .tabNext {
      right: 0;
    }

    .tab-item {
      cursor: pointer;
      padding: 0px 34px;
      height: 43px;
      position: relative;
      a {
        text-decoration: none;
        color: inherit;
      }

      &.active {
        background-color: #fff;
        color: #000;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: -20px; // Adjust this value to move the left corner image outside the background color
          width: 20px; // Set the width of your left corner image
          height: 100%;
          background: url(~/assets/images/svg/corner/left-corner-light.svg)
            no-repeat;
          background-position: left;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: -20px; // Adjust this value to move the right corner image outside the background color
          width: 20px; // Set the width of your right corner image
          height: 100%;
          background: url(~/assets/images/svg/corner/right-corner-light.svg)
            no-repeat;
          background-position: right;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.breadcrumb-tab {
  .swiper {
    margin-left: 48px;
    margin-right: 48px;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .swiper-slide {
    width: fit-content;
  }
  .swiper-button-disabled {
    opacity: 0.4;
  }
}
// .container {
// max-width: 1450px;
// }
</style>
