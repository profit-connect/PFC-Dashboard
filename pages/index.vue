<template>
  <div class="top-bar-bg">
    <div
      class="text-white fs-2"
      @click="hideScheduler"
      style="margin-left: 300px; cursor: pointer"
    >
      &lt;&lt;
    </div>
    <div
      class="text-white fs-2"
      @click="hideScheduler"
      style="margin-left: 300px; cursor: pointer"
    >
      &gt;&gt;
    </div>
  </div>
  <div
    class="calander-show-btn-left"
    @click="hideSchedulerBar = false"
    v-show="hideSchedulerBar"
  >
    <img
      src="/images/svg/calander.svg"
      alt="calendar"
      style="height: 200px"
    />
    <div
      class="d-flex items-align-center scheduler-btn-text-left gap-2"
      style="margin-left: 7px; position: absolute; top: 85px; rotate:180deg;"
    >
      <img
        src="/images/svg/feather-calendar.svg"
        alt="calender icon"
        style="width: 20px; height: 15px; rotate:270deg;"
      />
      Calendar
    </div>
  </div>
  <div class="d-flex h-100 content">
    <!-- <SchedulerFilterSideBar
      style="min-width: 400px; transition: 100ms ease-in all"
      :class="{ 'hide-scheduler': hideSchedulerBar }"
      :coaches="coaches"
      :workouts="workouts"
      :classes="computedClass"
      :coachData="coachData"
      :disciplines="computedDisciplines"
      @dateChanged="dateChanged"
      @weekChanged="weekChanged"
    />  -->
    <SchedulerFilterSideBar
      style="min-width: 400px; transition: 100ms ease-in all"
      :class="{ 'hide-scheduler': hideSchedulerBar }"
      :classes="classDetails"
      :coachData="coachDetailsFromWeekData"
      :disciplines="DisciplineDetails"
      @dateChanged="dateChanged"
      @weekChanged="weekChanged"
    />
    <SchedulerWeek
      :data="weekData"
      v-if="weekSchedule"
      :date="weekSchedule"
      :categoryData="categoryData"
      :availableRoom="computedRoom"
      @onRoomSelect="onRoomSelect"
      :selectedRoomId="selectedRoomId"
      :selectedClass="selectedClass"
      @on-class-add="weekDataRefresh"
    />
    <Scheduler
      v-else
      :key="currentScheduledTime.start"
      :data="sortScheduleTime(data)"
      :availableClasses="computedClass"
      :disciplines="computedDisciplines"
      :date="weekSchedule"
      :categoryData="categoryData"
      :selectedRoomId="selectedRoomId"
      :availableRoom="computedRoom"
      :dates="currentScheduledTime"
      @onRoomSelect="onRoomSelect"
      :selectedClass="selectedClass"
      @on-class-add="refresh"
    />
  </div>

  <div
    class="calander-show-btn-right"
    @click="hideSchedulerBarChat = false"
    v-show="!hideSchedulerBarChat"
  >
    <img
      src="/images/svg/calander.svg"
      alt="calender"
      style="height: 200px"
    />
    <div
      class="d-flex items-align-center scheduler-btn-text-right gap-2"
      style="margin-left: 0px; position: absolute; top: 90px"
    >
      <img
        src="~assets/images/svg/comment.svg"
        alt="chat icon"
        style="width: 20px; height: 20px; rotate:-90deg;"
      />
      Chats
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDayjs } from "#dayjs";
import { useAuthStore } from "~/store/auth";
import { useEventBus } from "@vueuse/core";
import { useStorage } from "@vueuse/core";

const bus = useEventBus<boolean>("reload-days");
const hideSchedulerBar = ref(false);
const hideSchedulerBarChat = ref(false);
const weekSchedule = ref();
const selectedClass = useStorage("SELECTED_ROOM_INDEX", -1);

const dayjs = useDayjs();
const currentScheduledTime = ref({
  start: dayjs().format("YYYY-MM-DD"),
  end: dayjs().format("YYYY-MM-DD"),
});
const hideScheduler = () => {
  hideSchedulerBar.value = true;
};
const hideSchedulerChat = () => {
  hideSchedulerBarChat.value = true;
};
const formatTime = (time: string) => {
  return dayjs(`2024-01-01 ${time}`);
};

const sortScheduleTime = (data) => {
  if (!data || !data.schedule) {
    // If data is null, undefined, or data.schedule is null or undefined, return an empty schedule
    return { schedule: [] };
  }

  const schedule = Array.isArray(data.schedule) && data.schedule.length > 0
    ? data.schedule.sort((a, b) =>
        formatTime(a.start_time).isAfter(formatTime(b.start_time)) ? 1 : -1
      )
    : [];

  return {
    schedule,
  };
};


const selectedRoomId = useStorage("SELECTED_ROOM_ID", undefined);
const { currentUserType } = useAuthStore();

const { data: categoryData } = await useCustomFetch<any>(
  "/category/get/categories",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);

const { data: roomData } = await useCustomFetch<any>("/space/get/categories", {
  method: "POST",
  body: { facility_id: currentUserType?.id },
});

const computedQueryCoach = computed(() => {
  return {
    facility_id: currentUserType?.id,
    date: currentScheduledTime.value?.start,
  };
});
const { data: coachData } = await useCustomFetch<any>("/adminapp/get/coaches", {
  method: "POST",
  body: computedQueryCoach,
});

const computedDisciplines = computed(() => {
  // First, check if categoryData.value.categories is not null and is an array
  if (Array.isArray(categoryData.value?.categories)) {
    return categoryData.value.categories
      .filter((item) => item != null) // Ensure each item is not null
      .map((item: any) => ({
        id: item.id,
        label: item.name,
      }));
  } else {
    return [];
  }
});
const computedClass = computed(() => {
  const classItem: any = [];
  if (categoryData.value && Array.isArray(categoryData.value.categories)) {
    categoryData.value.categories.forEach((item: any) => {
      if (item && Array.isArray(item.class)) {
        classItem.push(...item.class);
      }
    });
  }
  return classItem
    .filter((item: any) => item) // This ensures each item is truthy
    .map((item: any) => ({
      name: item.name,
      id: item.id,
      duration: item.duration,
    }));
});

const computedRoom = computed(() => {
  const roomItem: any = [];
  // Check if roomData.value.categories is not null and is an array
  if (Array.isArray(roomData.value?.categories)) {
    roomData.value.categories.forEach((item: any) => {
      // First, ensure the item itself is not null
      if (item && Array.isArray(item.room)) {
        roomItem.push(...item.room);
      }
    });
  }
  return roomItem
    .filter((item: any) => item) // Ensures each item is truthy
    .map((item: any) => ({
      name: item.name,
      id: item.id,
      capacity: item.capacity,
    }));
});

watch(
  computedRoom,
  (val) => {
    if (val && val.length) {
      selectedRoomId.value = selectedRoomId.value
        ? selectedRoomId.value
        : val[0].id;
      selectedClass.value = computedRoom.value.findIndex(
        (item: any) => item.id == selectedRoomId.value
      );
    }
  },
  { immediate: true }
);

const dayScheduleQuery = computed(() => {
  if (
    currentScheduledTime.value &&
    currentScheduledTime.value.start === currentScheduledTime.value.end
  )
    return {
      facility_id: currentUserType?.id,
      room_id: selectedRoomId.value,
      date: currentScheduledTime.value.start,
    };
});

const onRoomSelect = (id: number) => {
  selectedRoomId.value = id;
  selectedClass.value = computedRoom.value.findIndex(
    (item: any) => item.id == id
  );
};
const { data, pending, refresh } = await useCustomFetch<any>(
  "/calendar/get/dayschedule",
  {
    method: "POST",
    body: dayScheduleQuery,
  }
);

// Weekly scheduler Data
const weekDateQuery = computed(() => {
  if (weekSchedule.value) {
    return {
      facility_id: currentUserType?.id,
      room_id: selectedRoomId.value,
      start_date: weekSchedule.value.start,
      end_date: weekSchedule.value.end,
    };
  }
});
const { data: weekData, refresh: weekDataRefresh } = await useCustomFetch<any>(
  "/calendar/get/weekschedule",
  {
    method: "POST",
    body: weekDateQuery,
  }
);

function calculateDuration(startTimeStr, endTimeStr) {
  // Helper to parse a time string (HH:mm AM/PM) and return a Date object for today with that time
  function parseTime(timeStr) {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Adjust hours for 12-hour AM/PM format
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Create a new date object for today
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set time
    return date;
  }

  const startTime = parseTime(startTimeStr);
  const endTime = parseTime(endTimeStr);

  // Calculate duration; adjust if endTime is past midnight
  let duration = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes
  if (duration < 0) {
    // End time is past midnight; add 24 hours to endTime before calculating
    duration += 24 * 60;
  }

  return duration;
}

const DisciplineDetails = computed(() => {
  const hasValidWeekData = Object.values(weekData.value).some(
    (day) => Array.isArray(day) && day.length > 0
  );

  if (!hasValidWeekData) {
    // return computedDisciplines.value;
    return null;
  }

  const Discipline = Object.values(weekData.value)
    .flatMap((day) => (Array.isArray(day) ? day : []))
    .filter((DisciplineSession) => DisciplineSession)
    .map((DisciplineSession) => {
      return {
        label: DisciplineSession.discipline_name,
        id: DisciplineSession.discipline_id,
      };
    });

  const uniqueDiscipline = Array.from(
    new Map(Discipline.map((item) => [item.id, item])).values()
  );

  return uniqueDiscipline;
});

const classDetails = computed(() => {
  const hasValidWeekData = Object.values(weekData.value).some(
    (day) => Array.isArray(day) && day.length > 0
  );

  if (!hasValidWeekData) {
    // return computedClass.value;
    return null;
  }

  const classes = Object.values(weekData.value)
    .flatMap((day) => (Array.isArray(day) ? day : []))
    .filter((classSession) => classSession)
    .map((classSession) => {
      const duration = calculateDuration(
        classSession.start_time,
        classSession.end_time
      );

      return {
        name: classSession.class_name,
        id: classSession.class_id,
        duration: `${duration} minutes`,
      };
    });

  const uniqueClasses = Array.from(
    new Map(classes.map((item) => [item.id, item])).values()
  );

  return uniqueClasses;
});

const coachDetailsFromWeekData = computed(() => {
  const hasValidWeekData = Object.values(weekData.value).some(
    (day) => Array.isArray(day) && day.length > 0
  );

  if (!hasValidWeekData) {
    // return coachData.value.coaches;
    return null;
  }
  let allCoachIds = new Set();
  Object.values(weekData.value).forEach((day) => {
    if (Array.isArray(day)) {
      day.forEach((session) => {
        if (session && Array.isArray(session.coach)) {
          session.coach.forEach((coach) => allCoachIds.add(coach.id));
        }
      });
    }
  });
  const filteredCoaches = coachData.value.coaches
    .filter((coach) => allCoachIds.has(coach.id))
    .map(({ id, firstname }) => ({ id, firstname }));

  return filteredCoaches;
});

const coaches: any = ref([]);
const workouts: any = ref([]);
const disciplines: any = ref([]);
watch(
  data,
  (value) => {
    if (value) {
      const coachesTemp: any = [];
      const workoutsTemp: any = [];
      const disciplinesTemp: any = [];
      sortScheduleTime(value).schedule?.forEach((item: any) => {
        if (item) {
          coachesTemp.push(
            ...item.coach.map((item: any) => ({
              id: item.id,
              label: item.firstname,
            }))
          );
          if (item.class_id) {
            workoutsTemp.push({ id: item.class_id, label: item.class_name });
          }
          if (item.discipline_id) {
            disciplinesTemp.push({
              id: item.discipline_id,
              label: item.discipline_name ?? item.discipline_id,
            });
          }
        }
      });
      workouts.value = useUniqBy(workoutsTemp, "id");
      coaches.value = useUniqBy(coachesTemp, "id");
      disciplines.value = useUniqBy(disciplinesTemp, "id");
    }
  },
  { immediate: true }
);

const dateChanged = (dateObj: object) => {
  currentScheduledTime.value = dateObj;
};

const weekChanged = (dateObj: Object) => {
  weekSchedule.value = dateObj;
};

bus.on((val) => {
  refresh();
});
</script>
<style lang="scss">
.top-bar-bg {
  background: #03609f;
  height: 40px;
  width: 100%;
}
.top-bar-bg-right {
  background: #03609f;
  height: 42px;
  width: 100%;
}

.hide-scheduler {
  width: 0px !important;
  min-width: 0 !important;
  visibility: hidden;
}

.calander-show-btn-left,
.calander-show-btn-right {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  .scheduler-btn-text-left,
  .scheduler-btn-text-right {
    color: white;
    position: absolute;
    font-size: 12px;
  }

  .scheduler-btn-text-left {
    transform: rotate(270deg);
    transform-origin: center;
    left: -22px;
    top: 46px;
  }
  .scheduler-btn-text-right {
    transform: rotate(270deg);
    transform-origin: center;
    left: -22px;
    top: 46px;
  }
}

.calander-show-btn-right {
  transform: rotate(180deg);
  right: 0;
  top: 40%;
  .scheduler-btn-text-right {
    transform: rotate(270deg);
    transform-origin: center;
    right: -22px; // Adjust based on your layout
    top: 46px;
  }
  .scheduler-btn-text-right .img {
    transform: rotate(270deg);
    transform-origin: center;
    right: -22px; // Adjust based on your layout
    top: 46px;
  }
}
.content {
  width: 90%;
}
</style>