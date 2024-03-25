<template>
  <div class="content-main-box">
    <div class="content-box mb-3">
      <div class="member-attendance">
        <div class="d-flex justify-content-between my-4 gap-4">
          <h1 style="font-size: 22px; margin-top: 5px">Attendance</h1>
          <MixBtnGroup
            v-model="selectedDuration"
            :labels="['This Week', 'This Month', 'This Year']"
          />
          <div class="d-flex gap-2">
            <FormKit type="date" v-model="startDate" style="height: 43px" />
            <FormKit type="date" v-model="endDate" style="height: 43px" />
          </div>
        </div>
        <div>
          <MixBtnGroup
            v-model="selectedClass"
            :labels="['All', 'Cardio', 'Combat', 'Shape', 'Strength']"
          />
          <div class="d-flex justify-content-between">
            <MemberInfo>
              <template #number>18 </template>
              <template #label>
                Workouts <br />
                Completed
              </template>
              <template #value>
                <span class="negative">-7%</span> Last Month<br />
                <span class="positive">+15%</span> Last Year
              </template>
            </MemberInfo>
            <MemberInfo>
              <template #number>3 </template>
              <template #label> No Shows / <br />Cancellations </template>
              <template #value>
                <span class="negative">-25%</span> Last Month<br />
                <span class="positive">+15%</span> Last Year
              </template>
            </MemberInfo>
            <MemberInfo>
              <template #number>35 </template>
              <template #label>
                Workouts <br />
                Year-to-date
              </template>
              <template #value>
                <span class="positive">+15%</span> Last Year
              </template>
            </MemberInfo>
          </div>

          <MemberAttendanceChart />
          <div class="row my-4">
            <div class="col-7">
              <MemberCommonPerCategory />
            </div>
            <div class="col-5">
              <MemberCommonInfoCard
                class="mb-2"
                title="Preferred Time Slot"
                :items="[
                  { label: '7:30 AM', value: '55%' },
                  { label: '8:30 AM', value: '25%' },
                  { label: 'Other', value: '15%' },
                ]"
              />
              <MemberCommonInfoCard
                title="Preferred Days of the Week"
                :items="[
                  { label: 'Monday', value: '24%' },
                  { label: 'Wednesday', value: '23%' },
                  { label: 'Other', value: '15%' },
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBreadcrumbStore } from "~/store/breadcrumb";
const props = defineProps({
  memberInfo: {
    type: Object,
    default: () => {},
  },
  memberId: {
    type: String,
    default: "",
  },
});

const { memberId } = toRefs(props);
const route = useRoute();

const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Profiles", link: "" },
    { label: "Attendance", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "75px",
});
setBreadcrumbTab({
  items: [
    {
      label: "Membership",
      link: {
        path: "/members/details/membership-overview",
        query: { id: memberId.value },
      },
    },
    {
      label: "Payment",
      link: {
        path: "/members/details/payment",
        query: { id: memberId.value },
      },
    },
    {
      label: "Attendance",
      link: {
        path: "/members/details/attendance",
        query: { id: memberId.value },
      },
    },
    {
      label: "Transformation",
      link: {
        path: "/members/details/transformations",
        query: { id: memberId.value },
      },
    },
    {
      label: "Notes",
      link: {
        path: "/members/details/notes",
        query: { id: memberId.value },
      },
    },
  ],
});
definePageMeta({
  layout: "member",
});
const selectedDuration = ref(1);
const selectedClass = ref(1);
const startDate = ref("");
const endDate = ref("");
</script>

<style lang="scss" scoped>
.content-box {
  max-width: 1396px;
  /* height: calc(100vh - 129px); */
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.0784313725);
  padding: 20px;
  margin: 0 auto;
}
.content-main-box {
  position: relative;
  width: 65vw;
  max-width: 950px;
  height: 400px;

  .content-box {
    position: relative;
    width: 65vw;
    max-width: 950px;
    min-height: 900px;
  }

  .content__title-box {
    justify-content: space-between;
    margin-bottom: 7px;
  }
}
</style>
