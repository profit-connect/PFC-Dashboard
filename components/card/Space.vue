<template>
  <div class="category-items">
    <div class="category-item">
      <div class="category-item__title" style="width: 300px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      ">
        <span>{{ name }}</span>
        <img
          class="editRoom"
          src="~/assets/images/svg/edit-icon-black.svg?timestamp=1701334462987"
          alt="Edit room"
          data-room-num="0"
        />
      </div>
      <div class="category-item__description">{{ description }}</div>

      <div class="category-item__data">
        <div class="category-item__people">
          <img
            class="plusIcon"
            src="~/assets/images/svg/people.svg?timestamp=1701334462987"
            alt="People icon"
          />
        <div style="position: relative; top: 1px;"> {{ capacity }}</div> 
        </div>
        <div class="category-item__waitlist">
          <!-- <img
            class="plusIcon"
            src="~/assets/images/svg/waiting-list.svg?timestamp=1701334462987"
            alt="Plus icon"
          />
          waiting list -->
        </div>
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
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    position: relative;
    max-width: 260px;
    height: 130px;
    background: #f2faff;
    border-radius: 10px;
    padding: 9px 35px 9px 20px;
    margin-right: 10px;
    margin-bottom: 10px;

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
  height: 45px;
  width: 100%;
  font-style: italic;
  font-size: 10px;
  margin-bottom: 9px;
  color: #000;
  max-height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.category-item__data {
  font-size: 14px;
  display: flex;
  
}

.category-item__data .category-item__people {
  margin-right: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.category-item__waitlist{
  display: flex;
  align-items: center;
  gap: 10px;
}
img {
  max-width: 100%;
}
.plusIcon{
  width: 18px;
  height: 16px;
}
</style>
