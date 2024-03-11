<template>
  <div>
    <div class="vertical-tab">
      <div class="tab-content1"
      @click="selectSchedule()" >
          <span class="rotated-text">Add &nbsp;<img  src="~assets/images/svg/add-icon.svg"
              alt="Edit icon"
            /></span>
        </div>
       
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["onTimeSlotSelect" ,"selectSchedule"]);
const selectedIndex = ref(0);
function selectTab(index: number) {
  selectedIndex.value = index;
  emit("onTimeSlotSelect", index);
}
defineProps({
  timeSlot: {
    type: Array as PropType<String[]>,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.vertical-tab {
  display: flex;
  flex-direction: column;
  width: 38px;
  padding-top: 49px;
  height: calc(100vh - 80px);
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.vertical-tab div {
  cursor: pointer;
  height: 98px;
  border: 1px solid $main-blue;
  clip-path: polygon(
    0% 20%,
    2.57% 15.19%,
    7.3% 12.16%,
    12.03% 9.14%,
    20.21% 6.88%,
    100% 0%,
    100% 100%,
    20.21% 91.75%,
    14.46% 89.72%,
    7.98% 87.44%,
    2.57% 84.55%,
    0% 80%,
    0% 44.1%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: none;
  transition: background-color 0.3s;
  border-top-left-radius: 30%;
  border-bottom-left-radius: 30%;
  margin-top: -10px;
}
.tab-item {
  background-color: #f3faff;
}
.vertical-tab div:hover {
  background-color: #fff;
  border-color: #fff;
}
.vertical-tab div.active {
  background-color: #fff;
  border-color: #fff;
  z-index: 1000;
}
.tab-content {
  width: 100%;
  text-align: center;
}
.tab-content1 {
  width: 100%;
  text-align: center;
 color: white;
 background-color: #03609f;
}

.rotated-text {
  display: inline-block;
  white-space: nowrap;
  transform: rotate(270deg);
  transform-origin: center center;
}
</style>
