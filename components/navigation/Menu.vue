<template>
  <ul class="main-links">
    <li
      v-for="item in menuitems"
      :key="item.id"
      @mouseover="showSubmenu = item.id"
      @mouseleave="showSubmenu = undefined"
    >
      <NuxtLink :to="item.link" class="navigate-link mx-2">
        <img :src="item.icon" :alt="item.label" />
        {{ item.label }}
      </NuxtLink>

      <div
        class="dropdown hoverDropdown panel row"
        :class="showSubmenu === item.id ? 'is-active' : ''"
        v-if="item.sub_menu"
      >
        <NuxtLink
          :to="sub_item.link"
          class="dropdown__link col-4"
          v-for="sub_item in item.sub_menu"
          :key="sub_item.id"
        >
          <div class="title">{{ sub_item.label }}</div>
          <div class="text">
            {{ sub_item.description }}
          </div>
        </NuxtLink>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useMenuStore } from "@/store/menu";

const { menuitems } = useMenuStore();
const showSubmenu = ref();
</script>

<style lang="scss" scoped>
ul.main-links {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 13px 0 5px;
  padding: 0;

  li {
    margin-right: 20px;
  }

  .dropdown {
    position: absolute;
    background: #ffffff;
    color: #000000;
    box-shadow: 0px 10px 20px #00000029;
    padding: 26px;
    width: 100vw;
    max-width: 998px;
    border-radius: 10px;
    transition: $transitionSpeed;
    opacity: 0;
    z-index: -1;
    transform: translateX(-50%) scale(0.8);
    height: 50px;
    left: 50%;
    overflow: hidden;
    margin: auto;

    &.is-active {
      opacity: 1;
      z-index: 9999;
      transform: translateX(-50%) scale(1);
      left: 50%;
      height: unset;
    }
    &__link {
      display: block;
      transition: $transitionSpeed;
      border-left: 8px solid transparent;
      padding-left: 15px;
      margin: 20px 0;
      color: #000000;
      text-decoration: none;

      &:hover {
        border-left: 8px solid $main-blue;

        .title {
          color: $main-blue;
        }
      }

      .title {
        font-size: 22px;
        color: #000000;
        text-decoration: none;
        transition: $transitionSpeed;
      }

      &.pd {
        margin: 20px 0;
      }

      &.pt {
        padding-top: 20px;
      }

      &[href="#"] {
        pointer-events: none;
      }
    }
  }

  a.navigate-link {
    display: flex;
    align-items: center;
    color: $main-blue;
    text-decoration: none;
    padding: 5px 15px 10px;
    transition: $transitionSpeed;
    border-bottom: 2px solid transparent;

    &:hover,
    &.is-active {
      border-bottom: 2px solid $main-blue;
    }

    img {
      margin-right: 7px;
    }
  }
}
</style>
