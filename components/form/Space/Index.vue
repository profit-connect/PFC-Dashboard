<template>
  <div class="px-5 scheduler-week-clas-form"> 
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedSpace"
      #default="{ value }"
    >
      <div class="row">
        <div class="col-8 " style="height: 80px;">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Please enter space name"
            validation="required"
            :validation-messages="{
                  required: 'Space name is required',
                }"
          />
        </div>
        <div class="col-4">
          <FormKit
            type="multiselect"
            label="Category id"
            name="category_id"
            openDirection="bottom"
            validation="required"
            :value="category?.id"
            :options="categories"
            :key="category?.id"
          />
        </div>
      </div>
      <div class="row" style="height: 110px;">
        <div class="col-12">
          <FormKit
            type="textarea"
            name="description"
            label="Description"
            placeholder="Please enter space description"
            :validation-messages="{
                  required: 'Space description is required',
                }"
          />
        </div>
      </div>
      <div class="d-flex align-items-center-end gap-3 justify-content-end">
        <div class="d-flex align-items-center gap-2">
          <div class="">
            <p>Space Capacity</p>
          </div>
          <div style="width: 50px">
            <FormKit
              style="height: 40px"
              type="text"
              placeholder="No."
              name="capacity"
              label="Capacity"
            />
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <FormKit
            type="checkbox"
            name="virtual_room"
            label="Virtual Room"
            :value="false"
            v-model="isUrlactive"
          />
          <div style="height: 60px;">
          <FormKit
            style="width: 170px; height: 40px"
            type="text"
            name="url"
            placeholder="Add URL"
            label="Url"
            :disabled="!isUrlactive"
            :validation="isUrlactive ? 'required' : ''"
            :validation-messages="{
                  required: 'URL is required',
                }"
          />
        </div>
        </div>
      </div>
      <div class="room-availabilty my-4">
        <h6 class="text-center" style="font-size: 22px; margin-top: 50px">
          Availability
        </h6>
        <!-- <div class="d-flex align-items-center gap-2" >
        <div>
        <FormKit
          type="checkbox"
          name="follow_facility_timing"
          label=""
          :value="value.follow_facility_timing"
        />
        </div>
        <div class="mb-3">Follows Facility Timing</div>
      </div> -->
   
    </div>
    <!-- <div class="schedule-container" v-if="!value.follow_facility_timing"> -->
      <div class="schedule-container" >
        <div class="d-flex align-items-center gap-2" >
        <div>
        <FormKit
          type="checkbox"
          name="follow_facility_timing"
          label=""
          :value="value.follow_facility_timing"
        />
        </div>
        <div class="mb-3">Follows Facility Timing</div>
      </div>
        <div
          v-if="!value.follow_facility_timing"
          v-for="(day, index) in value.timings"
          :key="index"
          class="day-schedule"
        >
          <div style="width: 90px; margin-bottom: 15px">{{ day.day }}</div>
          <FormKit
            style="height: 30px"
            type="time"
            :placeholder="'From'"
            :ignore="true"
            v-model="value.timings[index].start_time"
            class="time-input"
          />
          <span class="mb-3">to</span>
          <FormKit
            style="height: 30px"
            type="time"
            :ignore="true"
            :placeholder="'To'"
            v-model="value.timings[index].end_time"
            class="time-input"
          />
          <div>
            <p
              ref="error"
              v-if="
                value.timings[index].start_time >= value.timings[index].end_time
              "
              class="custom-formkit-message"
            >
              End time should be later.
            </p>
          </div>
        </div>
      </div>
      <div v-if="computedSelectedSpace.follow_facility_timing === true"
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: relative; width: 830px; text-align: center; bottom: -90px;"
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn"
            @click="$emit('close-canvas')"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-else
        class="mt-4 d-flex justify-content-center flex-column"
        style="position: fixed; width: 830px; text-align: center; bottom: 0px;"
      >
        <div><FormKit type="submit">Save</FormKit></div>
        <div>
          <button
            class="btn"
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
import { useAuthStore } from "@/store/auth";
import { removeObjectKeys } from "@/utils/dataCleaner";
import { defaultTiming } from "~/constants/common";
const { $toast } = useNuxtApp();
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  category: {
    tye: Object,
    default: () => {},
  },
  spaceData: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["reload", "close-canvas"]);
const enableVirtualRoom = ref(false);

const { currentUserType } = useAuthStore();

const computedSelectedSpace = computed(() => {
  const timing = props.spaceData?.timings?.filter(Boolean);
  return props.spaceData
    ? {
        ...props.spaceData,
        timings: timing && timing.length ? timing : defaultTiming(),
        follow_facility_timing:
          props.spaceData?.follow_facility_timing === "1" ||
          props.spaceData?.follow_facility_timing === "Yes"
            ? true
            : false,
        virtual_room: props.spaceData?.url ? true : false,
      }
    : { timings: defaultTiming() };
});

const isPromotionPriceActive = ref(!!computedSelectedSpace.value?.url);

const addSpace = async (spaceData: any) => {
// console.log(spaceData)
if (!timingIsValid.value && !spaceData.follow_facility_timing) {
    $toast.error('Attempt to add space with invalid timings.');
    return; // Optionally, show an error message here as well
  }
  const { data, error, execute } = useCustomFetch<any>("/space/add/space", {
    method: "POST",
    body: JSON.stringify({
      ...spaceData,
      facility_id: currentUserType?.id,
      follow_facility_timing: spaceData.follow_facility_timing ? "Yes" : "No",
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      $toast("Space added successfully");
      emit("reload");
      // emit("close-canvas");
    } else if (data.value) {
      // $toast.error(data.value.message);
      $toast.error("Space already exists");
    } else if (error.value) {
      $toast.error("An error occurred while adding the space.");
      console.error("Error:/api/space/add", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/space/add", err);
    $toast.error("Failed to add space due to an exception.");
  }
};


const updateSpace = async (spaceData: any) => {
// console.log(spaceData)
  const { data, error, execute } = useCustomFetch<any>("/space/update/space", {
    method: "POST",
    body: JSON.stringify({
      ...spaceData,
      facility_id: currentUserType?.id,
      room_id: computedSelectedSpace.value?.id,
      follow_facility_timing: spaceData.follow_facility_timing ? "Yes" : "No",
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      $toast("Space updated successfully");
      emit("reload");
      // emit("close-canvas");
    } else if (data.value) {
      $toast.error(data.value.message);
    } else if (error.value) {
      $toast.error("An error occurred while editing the space.");
      console.error("Error:/api/space/edit", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/space/edit", err);
    $toast.error("Failed to edit space due to an exception.");
  }
};

const timingIsValid = computed(() => {
  return computedSelectedSpace.value.timings.every((timing) => {
    const startTimeMinutes = timeToMinutes(timing.start_time);
    const endTimeMinutes = timeToMinutes(timing.end_time);
    return endTimeMinutes > startTimeMinutes;
  });
});



const timeToMinutes = (time: string) => {
  if (!time) return 0; // Add a check for undefined or null time
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};


const submitHandler = async (spaceData) => {
  // console.log(spaceData)
  if (!timingIsValid.value && spaceData.follow_facility_timing === false) {
    $toast.error('Please ensure all end times are later than start times');
    return; // Stop the submission as the validation failed
  }

    let tempData = { ...spaceData };
    // console.log("tempData",tempData)
    tempData.capacity = tempData.capacity ?? '';

    if (!tempData.virtual_room) {
        tempData = removeObjectKeys(tempData, ['url']);
    }
    tempData = removeObjectKeys(tempData, ['virtual_room', 'updated_date']);

    if (computedSelectedSpace.value?.id) {
        tempData.room_id = computedSelectedSpace.value.id;
        await updateSpace(tempData);
    } else {
        await addSpace(tempData); 
    }
};
</script>

<style lang="scss" scoped>
.schedule-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
}
.day-schedule {
  display: flex;
  align-items: center;
  gap: 11px;
}
.time-input {
  width: 100px;
  border: 1px solid #dee2e6; /* Bootstrap light grey border */
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}
.custom-formkit-message {
  width: 50px;
  position: relative;
  left: -4px;
  color: red;
  font-size: 10px;
  margin-bottom: 0px;
  margin-top: -10px;
  line-height: 12px;
}
.scheduler-week-class-form {
  .formkit-messages {
    display: none;
  }
}
</style>
