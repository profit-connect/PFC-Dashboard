<template>
  <div class="scheduler-week-class-form">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <div v-for="(item, key) in formStructure" :key="key">
        <div class="row mx-5">
          <div class="col-5">
            <FormKit
              placeholder="Class Type"
              type="multiselect"
              mode="single"
              :options="computedClassType"
              v-model="formStructure[key].discipline_id"
              :validation="formStructure.length !== key + 1 ? 'required' : ''"
              @update:model-value="onEmptyFirstSlot(key)"
            />
          </div>
          <div class="col-5">
            <FormKit
              placeholder="Class"
              type="multiselect"
              mode="single"
              validation="required"
              v-if="
                formStructure[key].discipline_id &&
                computedClassType.find(
                  (item) => item.value == formStructure[key].discipline_id
                )?.class.length
              "
              :options="
                computedClassType.find(
                  (item) => item.value == formStructure[key].discipline_id
                )?.class
              "
              :key="formStructure[key].class_id"
              v-model="formStructure[key].class_id"
              @update:model-value="
                onClassSelect(key, formStructure[key].class_id)
              "
            />
          </div>
        </div>
        <table
          class="mx-4"
          v-if="item.schedule.length"
          v-show="formStructure[key].class_id"
        >
          <tr>
            <th>Pvt</th>
            <th style="position: relative; left: 10px">Start</th>
            <th style="position: relative; right: 20px">Duration</th>
            <th>End</th>
            <th style="position: relative; left: 5px">Max</th>
            <th style="position: relative; left: 5px">Wait</th>
            <th style="position: relative; left: 10px">Coach</th>
            <th></th>
          </tr>
          <tr
            v-for="(schedule, key_2) in item.schedule"
            :key="`${formStructure[key].class_id}-${key_2}`"
            style="position: relative; bottom: 30px"
          >
            <td>
              <button
                type="button"
                class="pvt-btn"
                @click="
                  formStructure[key].schedule[key_2].private =
                    !formStructure[key].schedule[key_2].private
                "
                :class="{ active: formStructure[key].schedule[key_2].private }"
              >
                <NuxtImg src="/images/svg/check-white.svg" provider="none" />
              </button>
            </td>
            <td>
              <div class="d-flex align-items-center gap-1" style="width: 264px">
                <div>
                  <div
                    class="custom-multiselect-schedule"
                    style="width: 152px"
                    v-if="!formStructure[key].schedule[key_2].isCustomTiming"
                  >
                    <FormKit
                      type="multiselect"
                      mode="single"
                      :options="
                        getAvailableTime(
                          availableTime,
                          formStructure[key].schedule[key_2].start_time,
                          formStructure[key].schedule[key_2].duration
                        )
                      "
                      validation="required|notsametime"
                      :validation-rules="{
                        notsametime,
                      }"
                      :key="`${randomNumber}-${formStructure[key].schedule[key_2].start_time}-${formStructure[key].class_id}`"
                      v-model="formStructure[key].schedule[key_2].start_time"
                    />
                  </div>

                  <button
                    style="height: 40px"
                    class="time-switch"
                    type="button"
                    v-else
                    @click="
                      formStructure[key].schedule[key_2].isCustomTiming = false
                    "
                  >
                    From slots
                  </button>
                </div>
                <div>
                  <FormKit
                    style="height: 40px; margin-left: 5px"
                    type="time"
                    v-model="formStructure[key].schedule[key_2].start_time"
                    v-if="formStructure[key].schedule[key_2].isCustomTiming"
                    validation="required|notsametime"
                    :key="`${randomNumber}`"
                    :validation-rules="{
                      notsametime,
                    }"
                  />
                  <button
                    style="height: 40px"
                    class="time-switch"
                    type="button"
                    v-else
                    @click="
                      formStructure[key].schedule[key_2].isCustomTiming = true
                    "
                  >
                    Custom
                  </button>
                </div>
              </div>
            </td>
            <td
              style="
                position: relative;
                right: 10px;
                width: 30px;
                padding-bottom: 10px;
              "
            >
              {{ formStructure[key].schedule[key_2].duration }} min
            </td>
            <td
              style="
                position: relative;
                right: 10px;
                width: 80px;
                padding-bottom: 10px;
              "
            >
              {{ formStructure[key].schedule[key_2].end_time }}
            </td>
            <td>
              <div>
                <FormKit
                  style="height: 40px; width: 40px"
                  type="number"
                  v-model="formStructure[key].schedule[key_2].capacity"
                  :max="selectedRoomCapacity"
                  validation="required"
                />
              </div>
            </td>
            <td>
              <div>
                <FormKit
                  style="height: 40px; width: 40px"
                  type="number"
                  v-model="formStructure[key].schedule[key_2].waiting_capacity"
                  validation="required"
                />
              </div>
            </td>
            <td style="height: 110px">
              <span
                style="
                  position: relative;
                  top: 35px;
                  left: 38px;
                  z-index: 10;
                  font-size: 16px;
                  pointer-events: none;
                "
                >Add
              </span>
              <div
                style="width: 100px; margin-bottom: 40px"
                class="custom-schedule-wrapper"
              >
                <FormKit
                  :key="formStructure[key].schedule[key_2]"
                  type="multiselect"
                  mode="tags"
                  :options="computedCoachData"
                  :model-value="formStructure[key].schedule[key_2].coach"
                  validation="required"
                  @update:model-value="(val: any) => {
                    formStructure[key].schedule[key_2] ?
                      formStructure[key].schedule[key_2].coach = val : ''
                  }"
                />
              </div>
            </td>
            <td>
              <div class="action-btn">
                <div class="btn">
                  <button @click="onDeleteSlot(key, key_2)"
                  type="button" :disabled="key_2 < initialScheduleLengths[key]" >
                    <NuxtImg
                      src="/images/svg/delete-icon.svg"
                      provider="none"
                      style="height: 16px; width: 16px"
                    />
                  </button>
                  <p :class="{'text-disabled': key_2 < initialScheduleLengths[key]}"
                  style="position: relative; bottom: 5px; font-size: 13.5px">
                    Delete
                  </p>
                </div>
                <div class="btn">
                  <button @click="onDuplicateSlot(key, key_2)" type="button">
                    <NuxtImg
                      src="/images/svg/duplicate-icon.svg"
                      provider="none"
                      style="height: 20px; width: 20px"
                    />
                    <p
                      style="position: relative; bottom: 4px; font-size: 12.5px"
                    >
                      Duplicate
                    </p>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div 
        class="mt-4 d-flex justify-content-center flex-column button-save-schedule"  
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn-cancel"
            @click="$emit('close-canvas')"
          >
            Cancel
          </button>
        </div>
      </div>
    </FormKit>

  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useDayjs } from "#dayjs";
const { $toast } = useNuxtApp();
const props = defineProps({
  categoryData: {
    type: Array,
    default: () => [],
  },
  selectedDate: {
    type: String,
    default: "",
  },
  selectedRoomId: {
    type: Number,
    default: 0,
  },
  selectedSchedule: {
    type: Array,
    default: () => [],
  },
  selectedRoomCapacity: {
    type: Number,
    default: 100,
  },
});
const selectedClassType = ref();
const selectedSlot: any = ref([]);
const { currentUserType } = useAuthStore();
const dayjs = useDayjs();
const emit = defineEmits(["on-class-add", "close-canvas"]);
const randomNumber = ref(dayjs());
const initialScheduleLengths = ref([]);

function generateRandomDate() {
  randomNumber.value = dayjs();
}

const formStructure: any = ref([
  {
    discipline_id: undefined,
    class_id: undefined,
    schedule: [],
  },
]);

const onEmptyFirstSlot = (key: number) => {
  if (!props.selectedSchedule.length) {
    formStructure.value[key].schedule = [];
    formStructure.value[key].class_id = undefined;

    if (
      formStructure.value.length === key + 2 &&
      !(formStructure.value[key + 1] && formStructure.value[key + 1].class_id)
    ) {
      formStructure.value.splice(key + 1, 1);
    }
  } else {
    formStructure.value[key].class_id = undefined;
  }
};

const onAddFirstSlot = (key: number) => {
  formStructure.value[key].schedule = [
    {
      id: undefined,
      private: false,
      start_time: undefined,
      end_time: undefined,
      capacity: undefined,
      waiting_capacity: undefined,
      coach: undefined,
      duration: 0,
    },
  ];
};

const onAddSlot = (key: number) => {
  formStructure.value[key].schedule.push({
    id: undefined,
    private: false,
    start_time: undefined,
    end_time: undefined,
    capacity: undefined,
    waiting_capacity: undefined,
    coach: undefined,
    duration: 0,
  });
};
const onDeleteSlot = (key: number, key_2: number) => {
  formStructure.value[key].schedule.splice(key_2, 1);
};

const onDuplicateSlot = (key: number, key_2: number) => {
  formStructure.value[key].schedule.push({
    ...useCloneDeep(formStructure.value[key].schedule[key_2]),
    start_time: undefined,
    id: undefined,
  });
};

const onAddNewClass = () => {
  formStructure.value.push({
    discipline_id: undefined,
    class_id: undefined,
    schedule: [],
  });
};

const checkIsPrevDate = (data: string) => {
  const target_time = timeToDateTime(data);
  const dateToCheck = dayjs(props.selectedDate);
  const today = dayjs();
  if (dateToCheck.isSame(today, "day")) {
    const today_time = timeToDateTime(getCurrentTime());
    const isBefore = target_time.isBefore(today_time);
    if (isBefore) {
      return true;
    }
  }
  return false;
};
function convertTo24HourNew(timeStr: string) {
  if (timeStr.slice(-2) === "AM" || timeStr.slice(-2) === "PM") {
    let time = timeStr.slice(0, -2).split(":");
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);

    if (timeStr.slice(-2) === "AM") {
      if (hours === 12) {
        hours = 0;
      }
    } else {
      // PM
      if (hours !== 12) {
        hours += 12;
      }
    }

    return (
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes
    );
  } else {
    return timeStr;
  }
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function notsametime(node: any) {
  const target_time = timeToDateTime(convertTo24HourNew(node.value));
  const dateToCheck = dayjs(props.selectedDate);
  const today = dayjs();
  if (dateToCheck.isSame(today, "day")) {
    const today_time = timeToDateTime(getCurrentTime());
    const isBefore = target_time.isBefore(today_time);
    if (isBefore) {
      const start_time = props.selectedSchedule.map(
        (item: any) => item.start_time
      );
      if (start_time.includes(target_time.format("hh:mm A"))) return true;
      return false;
    }
  }

  let repeated = 0;
  for (let i = 0; i < selectedSlot.value.length; i++) {
    const start_time = selectedSlot.value[i].start_time;
    const end_time = selectedSlot.value[i].end_time;

    if (
      (target_time.isSame(start_time) || target_time.isAfter(start_time)) &&
      target_time.isBefore(end_time)
    ) {
      repeated = repeated + 1;
      if (repeated > 1) {
        break;
      }
    }
  }
  generateRandomDate();
  return !(repeated > 1);
}
function generateAvailableTimeArray() {
  const availableTime = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour =
        h === 0
          ? "12"
          : h > 12
          ? (h - 12).toString().padStart(2, "0")
          : h.toString().padStart(2, "0");
      const period = h < 12 ? "AM" : "PM";
      const minute = m === 0 ? "00" : m.toString().padStart(2, "0");
      const timeValue = `${hour}:${minute} ${period}`;

      availableTime.push({
        label: timeValue,
        value: timeValue,
        disabled: checkIsPrevDate(timeValue),
      });
    }
  }

  return availableTime;
}

// Example usage:
const availableTime = computed(() => {
  return generateAvailableTimeArray();
});

const checkIsTimeBetween = (
  startTime: any,
  endTime: any,
  duration: any,
  availableTime: any
) => {
  return availableTime.map((item: any) => {
    const currentItem = timeToDateTime(item.value);
    const currentItemWithOffset = timeToDateTime(item.value).add(
      duration,
      "minute"
    );
    let isBetween = false;
    for (let i = 0; i < selectedSlot.value.length; i++) {
      const start_time = selectedSlot.value[i].start_time;
      const end_time = selectedSlot.value[i].end_time;
      if (
        (currentItem.isSame(start_time) || currentItem.isAfter(start_time)) &&
        currentItem.isBefore(end_time)
      ) {
        isBetween = true;
      }

      if (
        (currentItem.add(duration, "minute").isSame(start_time) ||
          currentItem.add(duration, "minute").isAfter(start_time)) &&
        currentItem.add(duration, "minute").isBefore(end_time)
      ) {
        isBetween = true;
      }
    }

    if (
      currentItem.add(duration, "minute").isAfter(startTime) &&
      currentItemWithOffset.isBefore(endTime)
    ) {
      isBetween = false;
    }

    return {
      ...item,
      disabled: item.disabled ? item.disabled : isBetween,
    };
  });
};

const comparator = (a: any, b: any) =>
  a.isBefore(b) ? -1 : a.isAfter(b) ? 1 : 0;

function indexOfSmallestPositiveNonZeroNumber(arr: any) {
  let smallestPositiveNumber = Infinity;
  let smallestPositiveIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0 && arr[i] < smallestPositiveNumber) {
      smallestPositiveNumber = arr[i];
      smallestPositiveIndex = i;
    }
  }

  return smallestPositiveIndex;
}
const getAvailableTime = (
  availableTime: any,
  start_time: any,
  duration: any
) => {
  const startTime = timeToDateTime(start_time);
  const selectedSlotStartTimes = selectedSlot.value.map(
    (item: any) => item.start_time
  );
  const sortedStartDates = selectedSlotStartTimes.sort(comparator);
  const difference = sortedStartDates.map((item: any) =>
    item.diff(startTime, "minute")
  );
  const nearestTime =
    sortedStartDates[indexOfSmallestPositiveNonZeroNumber(difference)] ??
    timeToDateTime("11:50 PM");
  return checkIsTimeBetween(startTime, nearestTime, duration, availableTime);
};

const computedQueryCoach = computed(() => {
  return { facility_id: currentUserType?.id, date: props.selectedDate };
});
const { data: coachData } = await useCustomFetch<any>("/adminapp/get/coaches", {
  method: "POST",
  body: computedQueryCoach,
});

const computedClassType = computed(() => {
  if (
    props.categoryData &&
    Array.isArray(props.categoryData.categories) &&
    props.categoryData.categories.length > 0
  ) {
    return props.categoryData.categories
      .filter((categoryItem) => categoryItem != null) // Ensure each category item is not null
      .map((item: any) => {
        const classes =
          item && Array.isArray(item.class) // Check item is not null and item.class is an array
            ? item.class
                .filter((classItem) => classItem) // Ensure class item is not null
                .map((classItem: any) => ({
                  label: classItem.name,
                  value: classItem.id,
                  duration: classItem.duration,
                  periodInMinutes: classItem.period === "Minutes",
                }))
            : [];
        return {
          label: item.name,
          value: item.id,
          class: classes,
        };
      });
  }
  return [];
});

const computedCoachData = computed(() => {
  if (coachData.value && coachData.value.coaches.length)
    return coachData.value.coaches.map((item: any) => {
      return {
        label: formatName(item.firstname),
        value: item.id,
      };
    });
});

const addSchedule = async (data: any) => {
  try {
    const { data: res } = await useCustomFetch<any>("/calendar/add/schedule", {
      method: "POST",
      body: data,
    });
    if (!res.value.return) {
      $toast.error(res.value.message);
    } else {
      formStructure.value = [
        {
          discipline_id: undefined,
          class_id: undefined,
          schedule: [],
        },
      ];
      $toast("Schedule added successfully");
      emit("on-class-add");
    }
  } catch {
    $toast.error("Schedule is not added");
  }
};
const updateSchedule = async (data: any) => {
  try {
    const { data: res } = await useCustomFetch<any>(
      "/calendar/update/schedule",
      {
        method: "POST",
        body: data,
      }
    );
    if (!res.value.return) {
      $toast.error(res.value.message);
    } else {
      formStructure.value = [
        {
          discipline_id: undefined,
          class_id: undefined,
          schedule: [],
        },
      ];
      $toast("Schedule updated successfully");
      emit("on-class-add");
    }
  } catch {
    $toast.error("Schedule is not updated!");
  }
};

const submitHandler = async () => {
  const schedule: any = [];
  for (let i = 0; i < formStructure.value.length; i++) {
    formStructure.value[i].schedule.forEach((item) => {
      schedule.push({
        discipline_id: formStructure.value[i].discipline_id,
        class_id: formStructure.value[i].class_id,
        ...useOmit(item, ["isCustomTiming"]),
        private: item.private ? "Yes" : "No",
        end_time: formatTime(item.end_time),
        start_time: formatTime(item.start_time),
      });
    });
  }

  const data = {
    facility_id: currentUserType?.id,
    room_id: props.selectedRoomId,
    date: props.selectedDate,
    schedule,
  };
  if (props.selectedSchedule.length) {
    updateSchedule(data);
  } else {
    addSchedule(data);
  }
};

const convertTo24Hour = (timeStr: string) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

const endTime = (start_time: string, offetInMinute: number = 0) => {
  let time24hours = convertTo24HourNew(start_time);
  const originalDateTime = dayjs(`2024-01-01 ${time24hours}`);
  const newDateTime = originalDateTime.add(offetInMinute, "minute");
  return newDateTime.format("hh:mm A");
};

const formatTime = (time: string) => {
  let time24hours = convertTo24HourNew(time);
  return dayjs(`2024-01-01 ${time24hours}`).format("hh:mm A");
};
function formatName(string) {
  if (!string) return "";
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(" ");
}
watch(
  formStructure,
  (val) => {
    if (val) {
      selectedSlot.value = [];
      for (let i = 0; i < val.length; i++) {
        let currentClass: any = undefined;
        const currentClasses: any = computedClassType.value.find(
          (item: any) => item.value == val[i].discipline_id
        )?.class;
        if (currentClasses) {
          currentClass = currentClasses.find(
            (item: any) => item.value == val[i].class_id
          );
        }
        for (let j = 0; j < val[i].schedule.length; j++) {
          val[i].schedule[j].duration = currentClass?.periodInMinutes
            ? currentClass?.duration
            : currentClass?.duration * 60;

          if (val[i].schedule[j].start_time) {
            val[i].schedule[j].end_time = endTime(
              val[i].schedule[j].start_time,
              val[i].schedule[j].duration
            );
            selectedSlot.value.push({
              start_time: timeToDateTime(val[i].schedule[j].start_time),
              end_time: timeToDateTime(val[i].schedule[j].end_time),
            });
          }
        }
      }
    }
  },
  { immediate: true, deep: true }
);
const timeToDateTime = (time: string) => {
  return dayjs(`2024-01-01 ${time}`);
};

const selectedTime = ref([]);

watch(
  props,
  (val) => {
    if (val.selectedSchedule) {
      formStructure.value = [];
      const dataPreprocess: any = {};
      val.selectedSchedule.forEach((item: any) => {
        selectedTime.value.push(item.start_time);
        selectedSlot.value.push({
          start_time: timeToDateTime(item.start_time).subtract(
            item.duration,
            "minute"
          ),
          end_time: timeToDateTime(item.end_time),
        });
        if (!Object.keys(dataPreprocess).includes(item.discipline_id)) {
          dataPreprocess[item.discipline_id] = {};
        }
        if (
          !Object.keys(dataPreprocess[item.discipline_id]).includes(
            item.class_id
          )
        ) {
          dataPreprocess[item.discipline_id][item.class_id] = [];
        }
        dataPreprocess[item.discipline_id][item.class_id].push(item);
      });
      Object.entries(dataPreprocess).forEach((item: any) => {
        const discipline_id = item[0];
        Object.entries(item[1]).forEach((classItem: any) => {
          const class_id = classItem[0];
          const entries = classItem[1];
          formStructure.value.push({
            discipline_id: discipline_id,
            class_id: class_id,
            schedule: entries.map((entry: any) => {
              return {
                id: entry.id,
                private: entry.private === "No" ? false : true,
                start_time: availableTime.value.find(
                  (availableTimeItem) =>
                    availableTimeItem.value === entry.start_time
                )
                  ? entry.start_time
                  : timeToDateTime(entry.start_time).format("HH:mm"),
                end_time: entry.end_time,
                capacity: entry.capacity,
                waiting_capacity: entry.waiting_capacity,
                coach: entry.coach
                  .filter((coachItem: any) => coachItem.id)
                  .map((coachItem: any) => coachItem.id),
                isCustomTiming: availableTime.value.find(
                  (availableTimeItem) =>
                    availableTimeItem.value === entry.start_time
                )
                  ? false
                  : true,
              };
            }),
          });
          initialScheduleLengths.value.push(entries.length);
        });
      });
    }
  },
  { immediate: true }
);

const onClassSelect = (key: number, class_id: number) => {
  if (class_id) {
    if (!formStructure.value[key].schedule.length) {
      onAddFirstSlot(key);
    }
    if (formStructure.value.length - 1 === key) {
      onAddNewClass();
    }
  }
};

onMounted(() => {
  onAddNewClass();
});
</script>

<style scoped lang="scss">
.time-switch {
  border: none;
  color: #ccc;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  margin-left: 5px;
  height: 48px;
  padding: 0px 12px;
  border-radius: 8px;

  &:hover {
    border-color: $main-dark-blue;
  }
}

th {
}

td {
  padding: 2px 7px;
}

.action-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  // margin-left: 80px;

  button {
    border: none;
    background-color: #fff;
    // margin-bottom: 12px;

    &:hover {
      opacity: 0.6;
    }
  }

  img {
    width: 14px;
  }
}

.pvt-btn {
  border-radius: 50%;
  background: white;
  width: 20px;
  height: 20px;
  border: 1px solid #f1f2f2;
  margin-bottom: 12px;
  position: relative;

  &.active {
    background: $main-blue;
    border-color: $main-blue;
  }

  img {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 2px;
    left: 2px;
  }
}
button:disabled {
 color: red;
opacity: 0.2;
}
.text-disabled {
    color: #ccc; /* Light gray color */
    opacity: 0.5; /* Half opacity for a faded look */
}
</style>
<style lang="scss">
.scheduler-week-class-form {
  .formkit-message {
    display: none;
  }

  [data-message-type="ui"] {
    display: block;
  }
}
</style>
