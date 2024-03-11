<template>
    <div class="category-items">
      <div class="category-item">
        <div class="category-item__title">
          <span>waiver</span>
          <img
            class="editRoom"
            src="~/assets/images/svg/edit-icon-black.svg?timestamp=1701334462987"
            alt="Edit room"
            data-room-num="0"
          />
        </div>
        <div class="category-item__description">Description</div>
  
        <div class="category-item__data">
            Reset Fitness | JIP
        </div>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  const props = defineProps({
    id: { type: Number },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    capacity: {
      type: String,
      default: "",
    },
  });
  </script>
  
  <style scoped lang="scss">
  .category-items {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .category-items .category-item {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      position: relative;
      max-width: 260px;
      background: #f2faff;
      border-radius: 10px;
      padding: 9px 35px 9px 20px;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 180px;
  }
  
  .category-item__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 22px "Poppins Medium", sans-serif, Arial;
    color: #000;
    margin-bottom: 5px;
  }
  
  .category-item__title .editRoom {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 17px;
    height: 17px;
    margin-left: 3px;
    opacity: 0.3;
    cursor: pointer;
    transition: 0.35s;
  }
  
  .category-item__description {
    width: 100%;
    font-style: italic;
    font-size: 10px;
    margin-bottom: 20px;
    color: #000;
  }
  
  .category-item__data {
    font-size: 14px;
    display: flex;
  }
  
  .category-item__data .category-item__people {
    margin-right: 22px;
  }
  
  img {
    max-width: 100%;
  }
  </style>
  