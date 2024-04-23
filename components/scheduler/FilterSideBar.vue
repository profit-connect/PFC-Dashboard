<template> 
  <div class="scheduler-filter-side-bar h-100 px-4 py-4  disable-scorllbar">
    <SchedulerCalendar
      style="position: relative; margin-right: 40px;"
      @dateChanged="emit('dateChanged', $event)"
      @weekChanged="emit('weekChanged', $event)"
    />
    <div class="d-flex flex-column gap-4"
    style="position: relative; margin-right: 80px;">
      <SchedulerFilterBtnGroup
        title="Disciplines"
        :items="disciplines"
        v-model="selectedDiscipline"
      />
      <SchedulerFilterBtnGroup
        title="Workouts"
        :items="computedClasses"
        v-model="selectedWorkout"
      />
      <SchedulerFilterBtnGroup
        title="Coaches"
        :items="computedCoaches"
        v-model="selectedCoach"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
const props = defineProps({
  coaches: {
    type: Array,
    default: () => [],
  },
  workouts: {
    type: Array,
    default: () => [],
  },
  disciplines: {
    type: Array,
    default: () => [],
  },
  classes: {
    type: Array,
    default: () => [],
  },
  coachData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["dateChanged", "weekChanged"]);

const selectedCoach =  useStorage("FILTER_SELECTED_COACH",undefined);
const selectedWorkout = useStorage("FILTER_SELECTED_WORKOUT",undefined);
const selectedDiscipline = useStorage("FILTER_SELECTED_DISCIPLINE",undefined);

// const computedClasses = computed(() => {
//   return props.classes.map((item: any) => ({ id: item.id, label: item.name }));
// });


const computedClasses = computed(() => {
  if (!props.classes) {
    return [];
  }
  return props.classes.map(item => ({ id: item.id, label: item.name }));
});

// const computedCoaches = computed(() => {
//   if (typeof props.coachData === "object") {
//     return props.coachData.map((item: any) => ({
//       id: item.id,
//       label: item.firstname,
//     }));
//   }
//   return [];
// });
const computedCoaches = computed(() => {
  if (Array.isArray(props.coachData)) {
    return props.coachData.map(item => ({
      id: item.id,
      label: item.firstname,
    }));
  }
  return [];
});
</script>

<style scoped lang="scss">
.scheduler-filter-side-bar {
  background: $main-dark-blue;
  height: calc(100vh - 84px);
  max-width: 380px;
  overflow: scroll;
  padding-bottom: 48px !important;
}
</style>
