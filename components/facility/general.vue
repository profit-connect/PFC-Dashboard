<template>
  
  <!-- <section class="content-section"> -->
    <!-- <FacilityUpdate /> -->
    <!-- <div class="content-box"> -->
      <FormKit type="form" @submit="submitHandler" :actions="false">
    <div class="scheduler-week-class-form">
      <div class="content__title-box">
        <h1 class="content-title">General</h1>
      </div>
      <div class="general__settings mt-4">
        <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit
              type="switch"
              v-model="form.allow_leads_to_register"
              name="allow_leads_to_register"
            />
          </div>
          <Span> Allow leads to register on the website or app</Span>
        </div>
        <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit
              type="switch"
              v-model="form.schedule_available_to_clients"
              name="schedule_available_to_clients"
            />
          </div>
          <Span> Schedule available to registered clients only</Span>
        </div>

        <!-- <div class="row">
          <div class="d-flex align-items-center gap-2">
            <Span class="mb-3"> Schedule displays</Span>
            <div style="width: 50px" class="col-1">
              <FormKit type="number" name="duration" />
            </div>
            <div class="col-2">
              <FormKit
                :classes="{
                  outer: 'w-100',
                }"
                type="multiselect"
                name="period"
                mode="single"
                :options="periodType"
              />
            </div>
            <Span class="mb-3"> of past and available</Span>
          </div>
        </div> -->
      </div>

      <!-- <div class="booking__settings mt-4">
        <h2 class="content-title">Booking &amp; Cancellation</h2>

        <div class="row mt-4">
          <div class="d-flex align-items-center gap-2">
            <FormKit type="switch" name="is_public" v-model="isPublic" />
            <Span class="mb-3"> Booking closes</Span>
            <div style="width: 50px" class="col-1">
              <FormKit
                type="number"
                v-model="form.booking_close_no"
                name="booking_close_no"
                validation="required"
              />
            </div>
            <div class="col-2">
              <FormKit
                :classes="{
                  outer: 'w-100',
                }"
                type="multiselect"
                v-model="form.booking_close_period"
                name="booking_close_period"
                mode="single"
                validation="required"
                :options="timeTypeSelect"
              />
            </div>
            <Span class="mb-3"> of past and available</Span>
          </div>

          <div
            class="d-flex align-items-center gap-2"
            style="margin-bottom: 10px"
          >
            <FormKit type="switch" name="" />
            <Span class="mb-3"> Allow clients to bring</Span>
            <div style="width: 50px" class="col-1">
              <FormKit
                type="number"
                name="foc"
                v-model="form.foc"
                validation="required"
              />
            </div>

            <Span class="mb-3"
              >Friends for FREE (one-time FOC per friend) at a time</Span
            >
          </div>
        </div>
        <div class="d-flex gap-2" style="margin-bottom: 20px">
          <div class="col-">
            <FormKit
              type="switch"
              v-model="form.schedule_available_to_clients"
              name="schedule_available_to_clients"
            />
          </div>
          <Span>Schedule available to registered clients only</Span>
        </div>
        <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit
              type="switch"
              name="is_public"
              @update:model-value="
                $emit('on-planstatus-change', {
                  plan_id: id,
                  private: `${isPublic ? 'Yes' : 'No'}`,
                })
              "
              v-model="isPublic"
            />
          </div>
          <Span
            >Late cancellations consume credits (for credit plans only)</Span
          >
        </div>
        <div
          class="d-flex align-items-center gap-2"
          style="margin-bottom: 10px"
        >
          <div class="col-">
            <FormKit
              type="switch"
              name="is_public"
              @update:model-value="
                $emit('on-planstatus-change', {
                  plan_id: id,
                  private: `${isPublic ? 'Yes' : 'No'}`,
                })
              "
              v-model="isPublic"
            />
          </div>
          <Span class="mb-3">
            Late cancellation costs (for unlimited plans only)</Span
          >

          <div style="width: 50px" class="col-1">
            <FormKit type="number" name="booking_close_nos" />
          </div>
          <Span class="mb-3">every</Span>
          <div style="width: 50px" class="col-1">
            <FormKit type="number" name="booking_close_nos" />
          </div>
          <Span class="mb-3">strike(s)</Span>
        </div>
      </div> -->

      <div class="plans__settings">
        <h2 class="content-title plans">Plans &amp; Packages</h2>
        <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit type="switch" v-model="form.allow_pause" />
          </div>
          <Span> Allow existing plans to be paused</Span>
        </div>
        <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit type="switch" v-model="form.allow_renewal_inactive" />
          </div>
          <Span>Allow renewal of inactive plans</Span>
        </div>
        <!-- <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit
              type="switch"
              name="is_public"
              @update:model-value="
                $emit('on-planstatus-change', {
                  plan_id: id,
                  private: `${isPublic ? 'Yes' : 'No'}`,
                })
              "
              v-model="isPublic"
            />
          </div>
          <Span> Allow credit sharing between Friends</Span>
        </div>
        <div class="d-flex gap-2" style="margin-bottom: 10px">
          <div class="col-">
            <FormKit
              type="switch"
              name="is_public"
              @update:model-value="
                $emit('on-planstatus-change', {
                  plan_id: id,
                  private: `${isPublic ? 'Yes' : 'No'}`,
                })
              "
              v-model="isPublic"
            />
          </div>
          <Span> Allow group/family plans</Span>
        </div> -->
      </div>
      <div class="mt-4 d-flex justify-content-center">
        <FormKit type="submit">Save</FormKit>
      </div>
    </div>
  </FormKit>
    <!-- </div> -->
  <!-- </section> -->

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { classOptions, timeTypeSelect } from "@/constants/class";
import { cleanObjectL1 } from "@/utils/dataCleaner";
import { useAuthStore } from "@/store/auth";
import { periodType, planType, paymentCategory } from "@/constants/plan";
const { $toast } = useNuxtApp();
const { generalInfo } = defineProps({
  generalInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["reload", "update:categoryData"]);
const memberInfoPending = ref(false);
const { currentUserType } = useAuthStore();
const facilityData = ref(null);
const isFeatured = ref(false);

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
  allow_leads_to_register: convertYesNoToBoolean(
    generalInfo.allow_leads_to_register
  ),
  schedule_available_to_clients: convertYesNoToBoolean(
    generalInfo.schedule_available_to_clients
  ),
  allow_pause: convertYesNoToBoolean(generalInfo.allow_pause),
  allow_renewal_inactive: convertYesNoToBoolean(
    generalInfo.allow_renewal_inactive
  ),
  foc: generalInfo.foc,
  booking_close_period: generalInfo.booking_close_period,
  booking_close_no: generalInfo.booking_close_no,
});

const submitHandler = async () => {
  const payload = { facility_id: currentUserType?.id, ...form.value };
  convertBooleanToYesNo(payload);

  try {
    const { data } = await useCustomFetch<any>("/franchise/update/facility", {
      method: "POST",
      body: cleanObjectL1(payload),
    });
    facilityData.value = data.value.facility;
    $toast("Facility General Updated");
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } finally {
    memberInfoPending.value = false; // End loading
  }
};

const SelectFacility = async () => {
  try {
    const { data } = await useCustomFetch<any>("/franchise/get/franchise", {
      method: "POST",
      body: {
        facility_id: currentUserType?.id,
      },
    });
    facilityData.value = data.value.facility;
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } finally {
    memberInfoPending.value = false; // End loading
  }
};
const getGeneralData = computed(() => {
  if (
    facilityData?.value &&
    facilityData.value[0].general &&
    facilityData.value[0].general > 0
  ) {
    return facilityData.value[0].general;
  }
});
onMounted(SelectFacility);

// Watch for changes in the facility ID
watch(
  () => currentUserType.value?.id,
  async (facilityId) => {
    if (facilityId) {
      memberInfoPending.value = true;

      try {
        const { data } = await useCustomFetch<any>("/franchise/get/franchise", {
          method: "POST",
          body: { facility_id: facilityId },
        });
        facilityData.value = data;
      } catch (err) {
        console.error("Error fetching facility data:", err);
      } finally {
        memberInfoPending.value = false; // End loading
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
element.style {
}

.content__title-box {
  margin-bottom: 20px;
  margin-top: 20px;
}
.general__settings {
  margin-top: 100px;
}
.plans__settings {
  margin-top: 60px;
}
.plans {
  margin-bottom: 30px;
}
.booking__settings {
  // margin: 100px 0px 1000px 0px;
}
.scheduler-week-class-form {
  .formkit-messages {
    display: none;
  }
}
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
  .content-box {
  position: relative;
  width: 70vw;
  max-width: 950px;
  margin: unset;
  height: fit-content;
  min-height: calc(100vh - 129px);
  margin-bottom: 50px;
}
}
</style>
