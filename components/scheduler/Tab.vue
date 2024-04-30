<template>
  <div style="background-color: #036095">
    <!-- <div :class="{'tab-bg-color': props.hideSchedulerBar}" class="vertical-tab" v-show="startDate.isSame(currentDay, 'day') || startDate.isAfter(currentDay, 'day')">  -->
      <div class="vertical-tab" :style="{ 'background-color': hideSchedulerBar ? '#f2faff' : '#002e4b' }" v-show="startDate.isSame(currentDay, 'day') || startDate.isAfter(currentDay, 'day')">
      <div
        v-for="(tab, index) in sortedTimeSlots"
        :key="index"
        @click="selectTab(index)"
        :class="{ active: indexSelected === index }"
        class="tab-item"
      >
        <div class="tab-content">
          <span class="rotated-text">{{ tab.start_time }} </span>
        </div>
      </div>
      <div class="tab-ite">
        <div  class="tab-content1" @click="emit('toggle-modal')">
          <span class="rotated-text" 
            >{{ sortedTimeSlots.length ? "Update" : "Add" }} &nbsp;
            <img
             style="width: 22px; height: 22px;"
              v-if="!sortedTimeSlots.length"
              src="@/assets/images/svg/add-icon.svg"
              alt="Add icon"
            />
            <img
              v-else
              style="width: 20px; height: 20px; margin-right: 0px; position: relative; left: -12px;" 
              src="@/assets/images/svg/edit-icon.svg"
              alt="Edit icon"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDayjs } from "#dayjs";
const emit = defineEmits(["onTimeSlotSelect", "toggle-modal"]);
const dayjs = useDayjs();
function selectTab(index: number) {
  emit("onTimeSlotSelect", index);
}

const props = defineProps({

  hideSchedulerBar: Boolean,

  dates: {
    type: Object,
    default: () => {},
  },
  timeSlot: {
    type: Array as PropType<String[]>,
    default: () => [],
  },
  indexSelected: {
    type: Number,
    default: 0,
  },
});

const currentDay = dayjs();
const startDate = computed(() => dayjs(props.dates.start));
console.log(currentDay,startDate);
const sortedTimeSlots = computed(() => {
  return props.timeSlot.slice().sort((a, b) => {
    const convertTo24Hour = (time: string): number => {
      let [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart
        .split(":")
        .map((num) => parseInt(num, 10));
      if (hours === 12) {
        hours = 0; // Adjust 12 AM to 00 for sorting
      }
      if (modifier.toUpperCase() === "PM") {
        hours += 12; // Convert PM times to 24-hour format
      }
      return hours * 60 + minutes; // Convert to minutes for easier comparison
    };

    return convertTo24Hour(a.start_time) - convertTo24Hour(b.start_time);
  });
});

import { watch } from 'vue';

watch(() => props.hideSchedulerBar, (newValue) => {
  console.log('SchedulerTab hideSchedulerBar changed:', newValue);
});

</script>

<style scoped lang="scss">
.tab-bg-color {
  background-color: #f2faff;
}
.vertical-tab {
  margin-top: 39px;
  // background: #002e4b;
  // background: #f2faff;
  display: flex;
  flex-direction: column;
  width: 43px;
  padding-top: 10px;
  padding-bottom: 64px;
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
  height: 175px;
  // border: 1px solid $main-blue;
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
  margin-bottom: 5px;
  
}
.vertical-tab div:hover {
  background-color: #fff;
  border-color: #fff;
}
.vertical-tab div.active {
  background-color: #fff;
  border-color: #fff;
  z-index: 1000;
  font-weight: bold;
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
.tab-content1:hover {
  background-color: #0290d8; /* Lighter or different shade of blue */
  color: black; /* Ensure text is visible */
  /* Optionally, add a transition for a smooth color change effect */
  transition: background-color 0.3s ease-in-out;
}

.rotated-text {
  font-size: 22px;
  display: inline-block;
  white-space: nowrap;
  transform: rotate(270deg);
  transform-origin: center center;
  margin-top: 10px;
}
</style>
