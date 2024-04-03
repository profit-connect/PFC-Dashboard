<template>
  <!-- <section class="content-section"> -->
   <!-- <FacilityUpdate /> -->
   <!-- <div class="content-box"> -->
 <h3 class="mt-2">Facility Timing</h3>
 <div class="facility">
   <FormKit
     type="form"
     :modelValue="selectedPlan"
     @submit="submitHandler"
     :actions="false"
   >
     <div class="general-timimg">
       <FormKit
         type="checkbox"
         name="always_open"
         outer-class="m-10"
         label="Always Open"
         v-model="form.always_open"
       />
     </div>
     <div class="schedule-container" v-if="!form.always_open">
       <div
         v-for="(day, index) in form.generalTiming"
         :key="index"
         class="day-schedule"
       >
         <div style="width: 80px">
           <p>{{ day.day }}</p>
         </div>

         <FormKit
           style="
             height: 40px;
             font-family: Poppins Regular, sans-serif, Arial;
           "
           type="time"
           :placeholder="'From'"
           v-model="day.start_time"
           class="time-input"
           validation="required"
         />
         <span class="mb-3">to</span>
         <FormKit
           style="height: 40px"
           type="time"
           :placeholder="'To'"
           v-model="day.end_time"
           class="time-input"
         />
         <div style="position: relative;">
           <p style="position: absolute;"
             ref="error"
             v-if="day.start_time >= day.end_time"
             class="custom-formkit-message"
             validation="required"
           >
           Increase end-time
           </p>
         </div>
       </div>
     </div>
     <div style="position: relative; top: 160px; left: 29%;">
     <div
       class="mt-4 d-flex justify-content-center save"
       style="position: absolute; "
     >
       <FormKit type="submit">Save</FormKit>
     </div>
    </div>
   </FormKit>
 </div>
<!-- </div> -->
<!-- </section> -->
</template>
<!-- <script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { cleanObjectL1 } from "@/utils/dataCleaner";
const { $toast } = useNuxtApp();
const { generalInfo, generalTiming } = defineProps({
 generalInfo: {
   type: Object,
   default: () => {},
 },
 generalTiming: {
   type: Array,
   default: () => [],
 },
});
const { currentUserType } = useAuthStore();

const convertYesNoToBoolean = (key: string) => key === "Yes";
function convertBooleanToYesNo(obj) {
 for (let key in obj) {
   if (typeof obj[key] === "boolean") {
     obj[key] = obj[key] ? "Yes" : "No";
   }
 }
 return obj;
}

const form = ref({
 always_open: convertYesNoToBoolean(generalInfo.always_open),
 generalTiming: [...generalTiming],
});

const submitHandler = async () => {
 const payload = {
   facility_id: currentUserType?.id,
   always_open: form.value.always_open,
   timings: form.value.generalTiming,
 };
 convertBooleanToYesNo(payload);

 try {
   const { data } = await useCustomFetch<any>("/franchise/update/facility", {
     method: "POST",
     body: cleanObjectL1(payload),
   });
   $toast(data.value.message);
 } catch (err) {
   console.error("Error fetching facility data:", err);
 } finally {
 }
};

</script> -->

<script setup lang="ts">

import { useAuthStore } from "@/store/auth";
import { cleanObjectL1 } from "@/utils/dataCleaner";

const { $toast } = useNuxtApp();
const { generalInfo, generalTiming } = defineProps({
 generalInfo: {
   type: Object,
   default: () => ({}),
 },
 generalTiming: {
   type: Array,
   default: () => [],
 },
});

const { currentUserType } = useAuthStore();
const convertYesNoToBoolean = (key: string) => key === "Yes";

// Define the missing function here
function convertBooleanToYesNo(obj: Record<string, any>) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'boolean') {
      obj[key] = obj[key] ? 'Yes' : 'No';
    }
  });
  return obj;
}

const form = ref({
 always_open: convertYesNoToBoolean(generalInfo.always_open),
 generalTiming: [...generalTiming],
});

const timingIsValid = computed(() => {
 return form.value.generalTiming.every((timing) => {
   const startTimeMinutes = timeToMinutes(timing.start_time);
   const endTimeMinutes = timeToMinutes(timing.end_time);
   return endTimeMinutes > startTimeMinutes;
 });
});

const timeToMinutes = (time: string) => {
 const [hours, minutes] = time.split(':').map(Number);
 return hours * 60 + minutes;
};

const submitHandler = async () => {
  // Check if the form should not be submitted due to invalid timing
  if (!timingIsValid.value && !form.value.always_open) {
    $toast('Please ensure all end times are greater than start times.');
    return; // Stop the submission as the validation failed
  }

  // Prepare the payload
  let payload = {
    facility_id: currentUserType?.id,
    always_open: form.value.always_open,
    timings: form.value.generalTiming,
  };

  // Convert boolean values to 'Yes' or 'No'
  payload = convertBooleanToYesNo(payload);

  try {
    // Attempt to submit the form data
    const { data } = await useCustomFetch<any>("/franchise/update/facility", {
      method: "POST",
      body: cleanObjectL1(payload),
    });
    $toast("Facility Timing Updated Successfully"); // Adjust according to actual response
  } catch (err) {
    console.error("Error fetching facility data:", err);
    $toast('An error occurred while updating facility data.'); // Show an error toast
  }
};

</script>


<style scoped>
.general-timimg {
 margin-top: 40px;
 margin-bottom: 60px;
}
.schedule-container {
 display: grid;
 grid-template-columns: repeat(2, 1fr);
 gap: 10px;
}

.day-schedule {
 display: flex;
 align-items: center;
 gap: 10px;
}

.day-checked label {
 color: #007bff; /* Bootstrap primary color */
}

.time-input {
 width: 100px;
 border: 1px solid #dee2e6; /* Bootstrap light grey border */
 border-radius: 0.25rem;
 padding: 0.375rem 0.75rem;
 height: 30px;
}
.custom-formkit-message {
 color: red;
 font-size: 10px;
 margin-bottom: 0px;
 margin-top: -22px;
 width: 50px;
}
.time-input .formkit-input {
 border: 2px solid #007bff; /* Blue border */
 font-size: 16px; /* Larger font size */
 padding: 5px; /* Padding inside the input */
 border-radius: 5px; /* Rounded corners */
 background-color: #f8f9fa; /* Light background */
}
.facility {
 .formkit-messages {
   display: none;
 }
}
.content-section {
 display: flex;
 justify-content: center;
 margin: 0 15px;
}

.content-box {
 position: relative;
 width: 70vw;
 max-width: 950px;
 margin: unset;
 height: fit-content;
 min-height: calc(100vh - 110px);
}
</style>
