<template>
  <div class="scheduler-week"> 
    <MixTab 
      v-model="selectedClass"
      :items="availableRoom.map((item) => item.name)"
      style="background-color: #00609f; color: #fff"
    />
    <div class="m-4">
      <div class="header d-flex justify-content-between mb-4">
        <div class="title">
          {{ dayjs(date.start).format("MMMM DD") }} -
          {{ dayjs(date.end).format("MMMM DD") }}
        </div>
        <ul>
          <li>
            <div class="value">{{ totalInjured }}</div>
            Need Attention
          </li>
          <li>
            <div class="value">{{ totalFirstTimer }}</div>
            First Timer
          </li>
          <li>
            <div class="value">{{ totalCancelled }}</div>
            Canceled
          </li>
          <li class="flex-column">
            Booked<br />
            <div class="d-flex alig-items-center" style="line-height: 38px">
              <div class="value">3/</div>
              <span class="fs-6">20</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="main-content disable-scorllbar" v-if="computedScheduler">
        <table style="border-spacing: 2px">
          <tr>
            <th></th>
            <th>
              <div>Monday</div>
            </th>
            <th>
              <div>Tuesday</div>
            </th>
            <th>
              <div>Wednesday</div>
            </th>
            <th>
              <div>Thursday</div>
            </th>
            <th>
              <div>Friday</div>
            </th>
            <th>
              <div>Saturday</div>
            </th>
            <th>
              <div>Sunday</div>
            </th>
          </tr>
          <tr style="padding-right: 60px; position: relative; left: 20px">
            <th></th>
            <!-- Day 1 (Monday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day1).length && !dayjs(getDate(0)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(0, data.day1, 'add')"
      provider="none" 
    />
  </div>
</td>
<!-- Day 2 (Tuesday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day2).length && !dayjs(getDate(1)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(1, data.day2, 'add')"
      provider="none" 
    />
  </div>
</td>
<!-- Day 3 (Wednesday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day3).length && !dayjs(getDate(2)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(2, data.day3, 'add')"
      provider="none" 
    />
  </div>
</td>
<!-- Day 4 (Thursday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day4).length && !dayjs(getDate(3)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(3, data.day4, 'add')"
      provider="none" 
    />
  </div>
</td>
<!-- Day 5 (Friday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day5).length && !dayjs(getDate(4)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(4, data.day5, 'add')"
      provider="none" 
    />
  </div>
</td>
<!-- Day 6 (Saturday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day6).length && !dayjs(getDate(5)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(5, data.day6, 'add')"
      provider="none" 
    />
  </div>
</td>
<!-- Day 7 (Sunday) -->
<td>
  <div v-if="!Object.keys(computedScheduler.day7).length && !dayjs(getDate(6)).isBefore(today)">
    Add
    <NuxtImg
      style="height: 20px; width: 20px; margin-right: 15px"
      src="/images/svg/add-icon.svg"
      @click="onSchedulerDateSelect(6, data.day7, 'add')"
      provider="none" 
    />
  </div>
</td>

          </tr>
          <tr
            v-for="timeSlot in computedScheduler.tempTimeRanges"
            :key="timeSlot"
            class="edit-data-card"
          >
            <td>
              <div class="time-slot">
                {{ timeSlot }}
              </div>
            </td>
          
            <!-- Day 1 (Monday) -->
<td :class="{ 'disabled': isDayInPast(0) }" @click="!isDayInPast(0) && onSchedulerDateSelect(0, data.day1, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day1[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(0)"
    />
</td>

<!-- Day 2 (Tuesday) -->
<td :class="{ 'disabled': isDayInPast(1) }" @click="!isDayInPast(1) && onSchedulerDateSelect(1, data.day2, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day2[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(1)"
    />
</td>

<!-- Day 3 (Wednesday) -->
<td :class="{ 'disabled': isDayInPast(2) }" @click="!isDayInPast(2) && onSchedulerDateSelect(2, data.day3, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day3[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(2)"
    />
</td>

<!-- Day 4 (Thursday) -->
<td :class="{ 'disabled': isDayInPast(3) }" @click="!isDayInPast(3) && onSchedulerDateSelect(3, data.day4, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day4[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(3)"
    />
</td>

<!-- Day 5 (Friday) -->
<td :class="{ 'disabled': isDayInPast(4) }" @click="!isDayInPast(4) && onSchedulerDateSelect(4, data.day5, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day5[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(4)"
    />
</td>

<!-- Day 6 (Saturday) -->
<td :class="{ 'disabled': isDayInPast(5) }" @click="!isDayInPast(5) && onSchedulerDateSelect(5, data.day6, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day6[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(5)"
    />
</td>

<!-- Day 7 (Sunday) -->
<td :class="{ 'disabled': isDayInPast(6) }" @click="!isDayInPast(6) && onSchedulerDateSelect(6, data.day7, 'edit')">
    <SchedulerWeekCard
        v-for="schedule in computedScheduler.day7[timeSlot]"
        :key="schedule.id"
        :data="schedule"
        :timeSlot="timeSlot"
        :disabled="isDayInPast(6)"
    />
</td>

          </tr>
        </table>
      </div>

      <Modal v-model="showClassScheduleForm" id="class-schedule-modal">
        <template #title>
          <div>
            Add/ Edit Classes
            <div class="room-title small-title-medium mt-4">
              {{ currentRoom?.name }} |
              {{
                selectedDate
                  ? dayjs(selectedDate).format("dddd,MMMM D, YYYY")
                  : ""
              }}
            </div>
          </div>
        </template>
        <SchedulerWeekClassForm
          @on-class-add="emit('on-class-add'), (showClassScheduleForm = false)"
          :categoryData="categoryData"
          :selectedRoomId="selectedRoomId"
          :selectedRoomCapacity="currentRoom?.capacity"
          :selectedDate="selectedDate"
          :selectedSchedule="selectedSchedule"
          v-if="showClassScheduleForm"
        />
      </Modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDayjs } from "#dayjs";
import { useStorage } from "@vueuse/core";
const selectedCoach = useStorage("FILTER_SELECTED_COACH", undefined);
const selectedWorkout = useStorage("FILTER_SELECTED_WORKOUT", undefined);
const selectedDiscipline = useStorage("FILTER_SELECTED_DISCIPLINE", undefined);
const dayjs = useDayjs();
const selectedDate = ref("");
const selectedSchedule = ref([]);

const totalFirstTimer = ref(0);
const totalInjured = ref(0);
const totalCancelled = ref(0);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  date: {
    type: Object,
    default: () => {},
  },
  categoryData: {
    type: Array,
    default: () => [],
  },
  availableRoom: {
    type: Array,
    default: () => [],
  },
  selectedRoomId: {
    type: Number,
    default: 0,
  },
  selectedClass: {
    type: Number,
    default: 0,
  },
});

const selectedClass = ref(props.selectedClass);

const emit = defineEmits(["onRoomSelect", "on-class-add"]);
function generateTimeRanges() {
  const timeRanges = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = ((hour + 11) % 12) + 1;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      const time = `${
        formattedHour < 10 ? `0${formattedHour}` : formattedHour
      }:${formattedMinute} ${period}`;
      timeRanges.push(time);
    }
  }
  return timeRanges;
}

const showClassScheduleForm = ref(false);

const onAddClass = (selectedDateNew: string) => {
  showClassScheduleForm.value = true;
  selectedDate.value = selectedDateNew;
};

const getDate = (offset: number) => {
  return dayjs(props.date.start).add(offset, "day").format("YYYY-MM-DD");
};
const today = ref(dayjs().format('YYYY-MM-DD'));

const isDayInPast = (offset) => {
  return dayjs(getDate(offset)).isBefore(today.value);
};



const currentRoom: any = computed(() => {
  const roomId = props.selectedRoomId;
  if (roomId && props.availableRoom && props.availableRoom.length) {
    return props.availableRoom.find((item) => item.id == roomId);
  }
  return {};
});

watch(
  selectedClass,
  (val) => {
    if (val > -1) emit("onRoomSelect", props.availableRoom[val]?.id);
  },
  { immediate: true }
);

const weeklyData = computed(async () => {
  return await props.data;
});

watch(weeklyData, (val) => {
  if (val) {
    totalFirstTimer.value = 0;
    totalInjured.value = 0;
    totalCancelled.value = 0;
    Object.values(val).forEach((item: Object[]) => {
      if (item && item.length) {
        item.forEach((schedule: any) => {
          if (schedule) {
            totalFirstTimer.value =
              totalFirstTimer.value + schedule.first_timer;
            totalInjured.value = totalInjured.value + schedule.injured;
            totalCancelled.value = totalCancelled.value + schedule.cancelled;
          }
        });
      }
    });
  }
});
watch(showClassScheduleForm, (val) => {
  if (!val) {
    selectedSchedule.value = [];
  }
});

const timeToDateTime = (time: string) => {
  return dayjs(`2024-01-01 ${time}`);
};

const pruneTimeSlot = (data: any) => {
  const timeRanges: any = [];
  if (
    data &&
    (data.day1 || data.day2,
    data.day3,
    data.day4,
    data.day5,
    data.day6,
    data.day7)
  ) {
    const tempTimeRanges = generateTimeRanges();
    const days = [
      ...data.day1,
      ...data.day2,
      ...data.day3,
      ...data.day4,
      ...data.day5,
      ...data.day6,
      ...data.day7,
    ];
    const includedTimes = new Set();

    tempTimeRanges.forEach((time: string) => {
      const refTimeDayjs = timeToDateTime(time);
      for (let i = 0; i < days.length; i++) {
        const item = days[i];
        if (item) {
          const start_time = item.start_time;
          const end_time = item.end_time;
          const startInDayjs = timeToDateTime(start_time).subtract(
            60,
            "minute"
          );
          const endInDayjs = timeToDateTime(end_time).add(60, "minute");

          if (
            time === start_time ||
            time === end_time ||
            (refTimeDayjs.isAfter(startInDayjs) &&
              refTimeDayjs.isBefore(endInDayjs)) ||
            (refTimeDayjs.isAfter(endInDayjs) &&
              refTimeDayjs.isBefore(startInDayjs))
          ) {
            timeRanges.push(time);
            break;
          }
        }
      }
    });
  }

  return timeRanges;
};

const formWeekSchedulerData = (tempTimeRanges: any, data: any) => {
  if (data) {
    const dataAfterNoNull = data.filter((item: any) => item);
    const newData: any = {};
    for (let i = 0; i < dataAfterNoNull.length; i++) {
      const startTime = timeToDateTime(dataAfterNoNull[i].start_time);
      for (let j = 1; j < tempTimeRanges.length; j++) {
        const refTimeStart = timeToDateTime(tempTimeRanges[j]);
        if (startTime.isBefore(refTimeStart)) {
          if (!(tempTimeRanges[j - 1] in newData)) {
            newData[tempTimeRanges[j - 1]] = [];
          }
          newData[tempTimeRanges[j - 1]].push({
            ...dataAfterNoNull[i],
            selectedCoach: selectedCoach.value,
            selectedWorkout: selectedWorkout.value,
            selectedDiscipline: selectedDiscipline.value,
          });
          break;
        }
      }
    }
    return newData;
  }
  return {};
};

const computedScheduler = computed(() => {
  if (props.data) {
    const tempTimeRanges = pruneTimeSlot(props.data);
    const day1 = formWeekSchedulerData(tempTimeRanges, props.data?.day1) ?? {};
    const day2 = formWeekSchedulerData(tempTimeRanges, props.data?.day2) ?? {};
    const day3 = formWeekSchedulerData(tempTimeRanges, props.data?.day3) ?? {};
    const day4 = formWeekSchedulerData(tempTimeRanges, props.data?.day4) ?? {};
    const day5 = formWeekSchedulerData(tempTimeRanges, props.data?.day5) ?? {};
    const day6 = formWeekSchedulerData(tempTimeRanges, props.data?.day6) ?? {};
    const day7 = formWeekSchedulerData(tempTimeRanges, props.data?.day7) ?? {};
    return {
      day1,
      day2,
      day3,
      day4,
      day5,
      day6,
      day7,
      tempTimeRanges,
    };
  }
});

const onEditClass = (date: string, data: any) => {
  showClassScheduleForm.value = true;
  selectedDate.value = date;
  selectedSchedule.value = data;
};

const onSchedulerDateSelect = (date: number, data: any, type: string) => {
  if (type === "add") {
    onAddClass(getDate(date));
  } else {
    onEditClass(getDate(date), data);
  }
};
</script>

<style lang="scss" scoped>
.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.scheduler-week {
  //  margin-right: 100px;
  @media only screen and (max-width: 1367px) {
    margin-right:200px;
  }
  background: #fff;
  margin-top: -38px;
  height: calc(100vh - 64px);
  overflow: hidden;

  .main-content {
    overflow: scroll;
    height: calc(100vh - 200px);
  }

  .title {
    width: 140px;
  }

  .body {
    margin-top: 18px;
  }

  .header {
    .title {
      font-size: 26px;
      width: 400px;
      font-family: "Poppins Bold";
    }

    ul {
      list-style: none;
      display: flex;

      gap: 8px;
      align-items: center;
      gap: 18px;

      li {
        display: flex;
        align-items: center;
        width: 84px;
        font-size: 14px;
        line-height: 12px;
        gap: 8px;

        .value {
          margin: 0px;
          font-size: 36px;
          font-family: "Poppins Bold";
        }
      }
    }
  }

  .time-slot {
    transform: rotate(270deg);
    width: 78px;
    // margin-top: -48px;
  }

  .edit-data-card td {
    height: 134px;
    position: relative;
  }

  th {
    font-family: "Poppins Bold";

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 184px;
      padding: 12px 18px;

      img {
        width: 18px;
        height: 18px;
        cursor: pointer;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
<style>
/* .room-title-date {
  font-size: 22px !important;
  font-weight: normal !important;
  text-align: left;
  margin-top: 12px;
  margin-left: 60px;
} */
.room-title {
  font-size: 22px !important;
  font-weight: normal;
  text-align: left;
  margin-top: 12px;
  margin-left: 60px;
}
</style>
<style lang="scss">
.scheduler-week {
  display: block;
  .scheduler-grid {
    display: grid;
    grid-template-columns: 100px repeat(7, 1fr);
    grid-auto-rows: minmax(50px, auto);
    .time-slot-header,
    .day-header {
      background-color: #f0f0f0;
      text-align: center;
      padding: 10px 0;
    }
    .day-header {
    }
    .time-slot {
      grid-column: 1;
    }
  }
}
</style>