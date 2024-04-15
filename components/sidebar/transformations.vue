<template>
  <div class="content-main-box">
    <div class="content-box mb-3">
      <div class="member-attendance">
        <div class="d-flex justify-content-between gap-4">
          <h1 style="font-size: 22px; margin-top: 5px">Transformation</h1>

          <div class="d-flex gap-3">
            <div class="py-2 fw-bold">99 Days</div>
            <FormKit type="date" v-model="startDate" style="height: 43px" />
            <FormKit type="date" v-model="endDate" style="height: 43px" />
          </div>
        </div>
        <div>
          <div class="d-flex justify-content-between">
            <MemberInfo>
              <template #number>11 </template>
              <template #label>
                Weight <br />
                Loss (kg)
              </template>
              <template #value>
                <span class="positive">-16%</span>
              </template>
            </MemberInfo>
            <MemberInfo>
              <template #number>12 </template>
              <template #label>
                Fat <br />
                Loss (kg)
              </template>
              <template #value>
                <span class="positive">-34%</span>
              </template>
            </MemberInfo>
            <MemberInfo>
              <template #number>4 </template>
              <template #label> Muscle <br />Gain (kg) </template>
              <template #value>
                <span class="negative">-17%</span>
              </template>
            </MemberInfo>
          </div>
          <MemberTransformationBeforeAfter />
          <div class="row my-4">
            <div class="col-7">
              <MemberCommonPerCategory />
            </div>
            <div class="col-5">
              <MemberCommonInfoCard
                class="mb-2"
                title="Caloric Intake"
                titleValue="Target 2000 kcal"
                :items="[
                  { label: 'Overall Average', value: '1450 kcal' },
                  { label: 'Average This Week', value: '1620 kcal' },
                  { label: 'Average Last Week', value: '1515 kcal' },
                ]"
              />
              <MemberCommonInfoCard
                title="Hydration"
                titleValue="Target 3000 ml"
                :items="[
                  { label: 'Overall Average', value: '2850 ml' },
                  { label: 'Average This Week', value: '2705 ml' },
                  { label: 'Average Last Week', value: '3105 ml' },
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
    { label: "Transformation", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "-20px",
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
