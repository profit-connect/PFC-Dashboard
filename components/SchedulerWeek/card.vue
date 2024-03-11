<template>
  <div
    class="scheduler-card"
    :class="{ inactive: isNotFiltered }"
    :style="{ height: cardHeight, top: topOffset }"
  >

    <div class="d-flex justify-content-between gap-0">
      <div
        class="title m-0"
        style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      >
        <div class="line-clamp1 fw-bold">{{ formatName(data.class_name) }}</div>
        <div class="line-clamp1 fw-light" >{{ data.discipline_name }}</div>
    </div>
      <div
        v-if="data.coach.length === 1"
        class="d-flex position-relative"
        style="height: 60px"
      >
        <img class="avatar0" :src="getImageUrl(data.coach[0].img_src)" />
      </div>
      <div
        v-else-if="data.coach.length === 2"
        class="position-relative"
        style="height: 60px"
      >
        <img class="avatar" :src="getImageUrl(data.coach[0].img_src)" />
        <img
          style="position: relative; bottom: 36px; left: 20px"
          class="avatar"
          :src="getImageUrl(data.coach[1].img_src)"
        />
      </div>
      <div v-else class="position-relative" style="height: 60px">
        <img class="avatar1" :src="getImageUrl(data.coach[0].img_src)" />
        <div class="coach-count-badge">+{{ data.coach.length - 1 }}</div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <img
          style="position: relative; left: 0px"
          src="~assets/images/svg/material-people.svg"
          alt="Link to package"
        />

        <span style="margin-left: 5px">
          {{ data.waiting_capacity }}/{{ data.capacity }}</span
        >
      </div>
      <div class="col-6">
        <img
          style="position: relative; left: 0px"
          src="~assets/images/svg/cancelled-schedule.svg"
          alt="Link to package"
        />
        <span style="margin-left: 5px">{{ data.cancelled }}</span>
      </div>
      <div class="col-6">
        <img
          style="position: relative; left: 0px"
          src="~assets/images/svg/first-timer.svg"
          alt="Link to package"
        />
        <span style="margin-left: 11px"> {{ data.first_timer }}</span>
      </div>
      <div class="col-6">
        <img
          style="position: relative; left: 0px"
          src="~assets/images/svg/group-schedule.svg"
          alt="Link to package"
        />
        <span style="margin-left: 5px"> {{ data.injured }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { getUrl: getImageUrl } = useBoImage();
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  timeSlot: {
    type: String,
    default: "",
  },
});

function formatName(string) {
  if (!string) return '';
  const words = string.split(' ');
  const capitalizedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
}

const isNotFiltered = computed(() => {
  const {
    selectedCoach,
    selectedWorkout,
    selectedDiscipline,
    coach,
    discipline_id,
    class_id,
  } = props.data;
  if (selectedCoach > 0 || selectedWorkout > 0 || selectedDiscipline > 0) {
    const filteredCoach = coach.find((item: any) => item.id == selectedCoach);
    const filteredClass = class_id === selectedWorkout;
    const filteredDiscipline = discipline_id === selectedDiscipline;
    const totalFilter =
      (selectedCoach > 0 ? 1 : 0) +
      (selectedWorkout > 0 ? 1 : 0) +
      (selectedDiscipline > 0 ? 1 : 0);
    const itemFiltered =
      (filteredCoach ? 1 : 0) +
      (filteredClass ? 1 : 0) +
      (filteredDiscipline ? 1 : 0);
    1;
    return totalFilter !== itemFiltered;
  }
  return false;
});
const cardHeight = computed(() => {
  const startTime = props.data.start_time;
  const endTime = props.data.end_time;
  const duration = calculateDuration(startTime, endTime);

  const pixelsPerMinute = 134 / 60;

  // Calculate height based on duration
  let dynamicHeight = duration * pixelsPerMinute;

  // Ensure a minimum height of 131 pixels
  dynamicHeight = Math.max(dynamicHeight, 134);

  return `${dynamicHeight}px`;
});

function calculateDuration(start, end) {
  const [startHour, startMinute] = start.split(" ")[0].split(":");
  const [endHour, endMinute] = end.split(" ")[0].split(":");
  const startDate = new Date(
    0,
    0,
    0,
    (startHour % 12) + (start.includes("PM") ? 12 : 0),
    startMinute
  );
  const endDate = new Date(
    0,
    0,
    0,
    (endHour % 12) + (end.includes("PM") ? 12 : 0),
    endMinute
  );
  const diff = endDate - startDate;
  return Math.round(diff / 60000); // Convert milliseconds to minutes
}

const calculateTopOffset = (timeSlot: string, startTime: string) => {
  const offset = calculateDuration(startTime, timeSlot);
  const pixelsPerMinute = 134 / 60;
  return pixelsPerMinute * offset + "px"; // This will be used as a style property value
};

const topOffset = computed(() =>
  calculateTopOffset(props.data.start_time, props.timeSlot)
);
</script>

<style scoped lang="scss">
.scheduler-card {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  min-height: 134px;
  max-width: 180px;
  background-color: $main-bg;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  transition: height 0.3s ease;
  &.inactive {
    opacity: 50%;
  }
  .title {
    font-size: 14px;
    font-weight: 900;
    width: 140px;
    height: 50px;
  }
}

.avatar {
  width: 32.5px;
  height: 35px;
  border: 6px black;
  // margin-right: px;
  border-radius: 50%;
  // object-fit: cover;
  border: 1px solid #ffffff;
}
.avatar0 {
  width: 40.5px;
  height: 35px;
  border: 6px black;
  // margin-right: px;
  border-radius: 50%;
  // object-fit: cover;
  border: 1px solid #ffffff;
}
.avatar1 {
  width: 40.6px;
  height: 35px;
  border: 6px black;
  // margin-right: px;
  border-radius: 50%;
  border: 1px solid #ffffff;
}
.coach-count-badge {
  position: absolute;
  top: 15px;
  left: 30px;
  background-color: #ffffff; /* red badge */
  color: #000000; /* white text */
  border-radius: 50%;
  width: 13px; /* size of the badge */
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  // border: 2px solid #ffffff; /* to separate the badge from the image */
}

.line-clamp1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>




