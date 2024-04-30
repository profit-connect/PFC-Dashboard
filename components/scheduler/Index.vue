<template>
  <div class="scheduler d-flex disable-scorllbar">
    <SchedulerTab
      :hide-scheduler-bar="hideSchedulerBar"
      @toggle-modal="handleModalToggle"
      :timeSlot="computedTimeSlots"
      :dates="dates"
      @onTimeSlotSelect="onTimeSlotSelect"
      :indexSelected="indexForTimeSlot[selectedClass]"
    />
    <div class="w-100 scheduler-main">
      <div style="height: 39px;">
        <MixTab
        v-model="selectedClass"
        :items="availableRoom.map((item) => item.name)"
        style="background-color: #00609f"
      />
      </div>
      
      <div class="scheduler-list disable-scorllbar" v-if="computedSchedule" style="margin-top: 2px;">  
        <SchedulerDay
          :schedule="computedSchedule"
          :dates="dates"
          :disciplines="disciplines"
        />
      </div>
    </div>
    <Modal v-model="showWeekForm" id="day-schdedule">
      <template #title>
        <div>
          Add/ Edit Classes
          <div class="room-title small-title-medium mt-4">
            {{ currentRoom?.name }} |
            {{
              dates.start ? dayjs(dates.start).format("dddd,MMMM D, YYYY") : ""
            }}
          </div>
        </div>
      </template>
      <SchedulerWeekClassForm
        @on-class-add="emit('on-class-add'), (showWeekForm = false)"
        @close-canvas="showWeekForm = false"
        :categoryData="categoryData"
        :selectedRoomId="selectedRoomId"
        :selectedRoomCapacity="currentRoom?.capacity"
        :selectedDate="dates.start"
        :selectedSchedule="computedTimeSlots.length ? data.schedule : []"
        v-if="showWeekForm"
      />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { useDayjs } from "#dayjs";
const dayjs = useDayjs();
const props = defineProps({

  hideSchedulerBar: Boolean,

  data: {
    type: Object,
    default: () => {},
  },
  availableClasses: {
    type: Array,
    default: () => [],
  },
  availableRoom: {
    type: Array,
    default: () => [],
  },
  dates: {
    type: Object,
    default: () => {},
  },
  selectedRoomId: {
    type: Number,
    default: 0,
  },
  date: {
    type: Object,
    default: () => {},
  },
  categoryData: {
    type: Array,
    default: () => [],
  },
  disciplines: {
    type: Array,
    default: () => [],
  },
  selectedClass: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["onRoomSelect", "on-class-add"]);
const indexForTimeSlot = ref(
  [...Array(props.availableRoom.length).keys()].map((i) => 0)
);
const selectedClass = ref(props.selectedClass);
const showWeekForm = ref(false);
const selectedDate = ref("");
const computedTimeSlots = computed(() => {
  if (props.data.schedule)
    return props.data.schedule
      .map((item: any) => {
        if (item)
          return {
            id: item?.id,
            start_time: item.start_time,
            end_time: item.end_time,
          };
      })
      .filter((item) => item);

  return [];
});

const currentRoom = computed(() => {
  const roomId = props.selectedRoomId;
  if (roomId && props.availableRoom && props.availableRoom.length) {
    return props.availableRoom.find((item) => item.id == roomId);
  }
  return {};
});
const onTimeSlotSelect = (index: number) => {
  indexForTimeSlot.value[selectedClass.value] = index;
};
const onAddClass = (selectedDateNew: string) => {
  selectedDate.value = selectedDateNew;
};
const handleModalToggle = () => {
  showWeekForm.value = !showWeekForm.value;
};



const computedSchedule = computed(() => {
  if (props.data && props.data.schedule && props.data.schedule[indexForTimeSlot.value[selectedClass.value]]) {
    const schedule = props.data.schedule[indexForTimeSlot.value[selectedClass.value]];

    // Correctly filter for non-null members with "Booked" status
    const bookedMembers = schedule.members.filter(member => member !== null && member.status === "Booked");
    const nonNullBookedMemberCount = bookedMembers.length;

    // Optionally, you could also prepare members data to be used elsewhere,
    // like filtering out cancelled members if needed.
    const filteredMembers = bookedMembers; // This example just reuses bookedMembers, adjust as needed.

    return {
      ...schedule,
      nonNullMemberCount: nonNullBookedMemberCount,
      // Add filteredMembers if you plan to use this adjusted list elsewhere
      filteredMembers: filteredMembers,
    };
  }
  return null;
});


watch(
  selectedClass,
  (val) => {
    if (val > -1) emit("onRoomSelect", props.availableRoom[val]?.id);
  },
  { immediate: true }
);

watch(() => props.hideSchedulerBar, (newValue) => {
  console.log('Scheduler hideSchedulerBar changed:', newValue);
});
</script>

<style scoped lang="scss">
.scheduler {
  background: white;
  height: fit-content;
  overflow: hidden;
  position: relative;
  margin-left: -39px;
  width: calc(100% + 38px);
  margin-top: -39px;
  .scheduler-list {
    margin-top: -25px;
    padding-left: 10px;
    height: calc(100vh - 84px);
    overflow: scroll;
    box-shadow: 0 0 13px #00000026;
  }
}
</style>
<style lang="scss">
.scheduler {
  .tab {
    padding-left: 0px;
    button {
      background: transparent !important;
    }
    .tab-item {
      color: #fff;

      img {
        display: none;
      }
    }
  }
}
.scheduler-main {
  // margin-left: -48px;
}
</style>
