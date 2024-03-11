<template>
  <div
    class="scheduler-calendar d-flex flex-column justify-content-center align-items-center"
  >
    <div class="filter">
      <button
        @click="(currentFilter = 'today'), selectToday()"
        :class="currentFilter === 'today' ? 'active' : ''"
      >
        Today
      </button>
      <button
        @click="(currentFilter = 'currentWeek'), selectWeek()"
        :class="currentFilter === 'currentWeek' ? 'active' : ''"
      >
        This Week
      </button>
      <button
        @click="(currentFilter = 'currentMonth'), selectCurrentMonth()"
        :class="currentFilter === 'currentMonth' ? 'active' : ''"
      >
        This Month
      </button>
    </div>
    <DatePicker
      class="mt-2 mb-4"
      borderless
      transparent
      :class="
        range.start.toString() === range.end.toString() ? 'isSameDay' : ''
      "
      :model-value="range"
      first-day-of-week="2"
      :masks="{ weekdays: 'WWW', model: 'iso' }"
      @update:pages="showPrevMonthAndNextMonth"
      ref="calendar"
    />
  </div>
</template>

<script setup>
import { DatePicker } from "v-calendar";
import { useDayjs } from "#dayjs";
import "v-calendar/style.css";
const calendar = ref(null);
const dayjs = useDayjs();
const range = ref({ start: new Date(), end: new Date() });
const selectedRange = ref();

const showPrevMonthAndNextMonth = () => {
  // enableSingleClick();
  nextTick(() => {
    const ele = document.getElementsByClassName("vc-day");
    for (let i = 0; i < ele.length; i++) {
      ele[i].classList.remove("is-not-in-month");
    }
    enableSingleClick();
  });
};

const addClickEvent = ($event) => {
  onDaySelected($event.target.ariaLabel);
};

const enableSingleClick = () => {
  const element = document.getElementsByClassName("vc-day-content");
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", addClickEvent);
  }
};

onMounted(() => {
  showPrevMonthAndNextMonth();
  enableSingleClick();
});

const currentFilter = ref("today");
const emit = defineEmits(["dateChanged", "weekChanged"]);

const isItAWholeWeek = (start, end) => {
  if (
    end.diff(start, "day") === 6 &&
    end.format("dd") === "Su" &&
    start.format("dd") === "Mo"
  ) {
    return true;
  } else {
    return false;
  }
};

const selectCurrentMonth = async () => {
  await calendar.value.move(new Date());
};

const selectToday = async () => {
  await calendar.value.move(new Date());
  range.value = { start: new Date(), end: new Date() };
};

const selectWeek = async () => {
  // Check if a day has been selected, if not default to current date
  const selectedDate = range.value.start ? dayjs(range.value.start) : dayjs();
  const firstDayOfWeek =
    selectedDate.format("dd") === "Su"
      ? selectedDate.subtract(1, "day").startOf("week").add(1, "day")
      : selectedDate.startOf("week").add(1, "day");
  const lastDayOfWeek =
    selectedDate.format("dd") === "Su"
      ? selectedDate.subtract(1, "day").endOf("week").add(1, "day")
      : selectedDate.endOf("week").add(1, "day");

  await calendar.value.move(new Date(firstDayOfWeek.format("YYYY-MM-DD")));
  range.value = {
    start: new Date(firstDayOfWeek.format("YYYY-MM-DD")),
    end: new Date(lastDayOfWeek.format("YYYY-MM-DD")),
  };
};

const onDaySelected = (date) => {
  const selectedDate = dayjs(date);
  range.value = { start: selectedDate.toDate(), end: selectedDate.toDate() };
};

watch(
  range,
  (val) => {
    if (val) {
      console.log(val, "val");
      const startDate = dayjs(val.start);
      const endDate = dayjs(val.end);
      selectedRange.value = {
        start: startDate.format("YYYY-MM-DD"),
        end: endDate.format("YYYY-MM-DD"),
      };
      if (startDate.isSame(endDate)) {
        emit("dateChanged", selectedRange.value);
        emit("weekChanged", undefined);
      } else if (isItAWholeWeek(startDate, endDate)) {
        emit("weekChanged", selectedRange.value);
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: center;
  gap: 14px;
  button {
    background: none;
    border: 1px solid $dark-blue-seconadary;
    color: #fff;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    &.active {
      border-color: $main-yellow;
    }
  }
}
</style>

<style lang="scss">
.scheduler-calendar {
  .vc-header {
    .vc-arrow,
    .vc-title {
      background: none;
      color: #fff;
      font-size: 14px;
    }
  }
  .vc-nav-item {
    &.is-active {
      background: $dark-blue-seconadary;
    }
  }
  .vc-day,
  .vc-weekday,
  .vc-focusable {
    color: #fff;
  }
  .vc-day {
    height: 38px;
    width: 42px;
  }

  .vc-highlight {
    background: none;
    border: none;
    border-top: 1px solid $main-yellow;
    border-bottom: 1px solid $main-yellow;
  }
  .isSameDay {
    .vc-highlight {
      border: none;
    }
  }
  .vc-highlight-content-solid {
    // background: $main-blue;
    border: 1px solid yellow;
  }

  .on-right {
    .vc-highlight {
      border-radius: 0 50% 50% 0;
    }
  }
  .on-left {
    .vc-highlight {
      border-radius: 50% 0px 0px 50%;
    }
  }
  .vc-weeks {
    > :nth-child(7) {
      display: none !important;
    }
  }
}
</style>