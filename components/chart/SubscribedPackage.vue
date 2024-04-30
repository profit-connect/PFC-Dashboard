<template>
  <div>
   <div v-if="sortedPlans && sortedPlans.length > 0" class="membership-graph">
      <div class="membership-graph__row1">
        <div v-for="(plan, index) in sortedPlans" :key="plan.id"> 
          <div
            v-if="
              plan.plan_type === 'credits' || plan.plan_type === 'unlimited'
            "
            class="graph-box"
            :style="{
              minWidth: '140px',
              width: calculateWidth(plan.start_date, plan.end_date),
              marginLeft: calculateMarginPlan(index, sortedPlans),
            }"
          > 
           <div style="color: #002E4B; font-size: 22px;" > {{ plan.plan_name }} </div> 
           <div style="color: #002E4B; font-size: 12px;"> AED:  {{ plan.plan_price }}</div>
            
            <!-- <div class="end-date-text1">
              {{ formatDate(plan.start_date) }}
            </div> -->
            <!-- <div class="expiry-line-box">
              <div>Expiring</div>
              <div>{{ formatDate(plan.end_date) }}</div>
            </div> -->
            <div class="end-date-text"><p style="color: #002E4B;">Expiring : &nbsp;</p>  {{ formatDate(plan.end_date) }}</div>
          </div>
        </div>
      </div>

      <div class="membership-graph__row1" style="margin-top: 20px">
        <div v-for="(plan, index) in sortedPlans" :key="plan.id">
          <div
            v-if="plan.plan_type === 'add-on'"
            class="graph-box"
            :style="{
              minWidth: '75px',
              width: calculateWidth(plan.start_date, plan.end_date),
              marginLeft: calculateMarginPlan(index, sortedPlans),
            }"
          >
          <div style="color: #002E4B; font-size: 22px;" > {{ plan.plan_name }} </div> 
           <div style="color: #002E4B; font-size: 12px;"> AED:  {{ plan.plan_price }}</div>
            <!-- <div class="end-date-text1">
              {{ formatDate(plan.start_date) }}
            </div> -->
            <div class="end-date-text"><p style="color: #002E4B;">Expiring : &nbsp;</p> {{ formatDate(plan.end_date) }}</div>
          </div>
        </div>
      </div>
      <div class="today-line-box" :style="{ marginLeft: todayLineMargin }">
        <div>Today</div>
        <div>{{ dayjs().format("MMMM DD") }}</div>
      </div>
    </div>

    <div v-else class="no-active-plan">
      This member does not have a memberships
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDayjs } from "#dayjs";
const dayjs = useDayjs();

const props = defineProps({
  plans: {
    type: Array,
    default: () => [],
  },
});
const formatDate = (dateString: any) => {
  if (!dateString) {
    return "Date not available";
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const calculateMarginPlan = (index: number, sortedPlans: [any]) => {
  if (index === 0) {
    return "0px";
  } else {
    const referenceDate = dayjs(sortedPlans[0].start_date);
    const startDate = dayjs(sortedPlans[index].start_date);
    const days = startDate.diff(referenceDate, "d");
    return `${days * 4}px`;
  }
};

const todayLineMargin = computed(() => {
  if (sortedPlans.value && sortedPlans.value.length) {
    const referenceDate = dayjs(sortedPlans.value[0].start_date);
    const startDate = dayjs();
    const days = startDate.diff(referenceDate, "d");
    return `${days * 4}px`;
  }
  return "0px";
});
const sortedPlans = computed(() => {
  return props.plans
    .filter(plan => plan && plan.start_date && plan.end_date) // Filter out invalid plans or plans with invalid dates
    .slice() // Create a shallow copy
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
});
const calculateWidth = (startDate, endDate) => {
  // Check if either date is falsy (null, undefined, '', etc.) before converting to a Date object
  if (!startDate || !endDate) return "50px"; // Return default width if either date is invalid
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Continue with the rest unchanged...
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "50px"; // Check if dates are valid
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const widthPerDay = 4;
  return `${Math.max(diffDays * widthPerDay, 50)}px`; // Use template literals for clarity
};


</script>

<style scoped lang="scss">
.membership-graph {
  position: relative;
  // overflow-x: auto;
  // overflow-y: hidden;
  padding: 70px 0px 0px 0px;
  overflow-y: hidden;
  min-height: 650px;
  

/* Custom scrollbar styles: */
&::-webkit-scrollbar {
  height: 12px; /* Reduced height for a thinner scrollbar */
  background-color: #f2faff;
 
}

&::-webkit-scrollbar-thumb {
  background-color: #f2faff;
  border-radius: 4px; /* Slightly less rounded for a thinner look */
  border: 2px solid #eadfdf; /* Adjusted for the thinner scrollbar */
  cursor: pointer;
}

&::-webkit-scrollbar-track {
  background-color: #e5d9d9;
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(159, 109, 109, 0.3); /* Optional */
  position: relative;
}
}

.membership-graph .membership-graph__row1 {
  position: relative;
  height: 168px;
 
}

.membership-graph .membership-graph__row1 .graph-box {
  height: 130px;
}

.membership-graph .graph-box {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #f2faff;
  border: 1px solid #84ceff;
  border-radius: 7px;
  height: 100px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Poppins Medium", sans-serif, Arial;
  margin-left: 20px;
}


.membership-graph .end-date-text {
  display: flex;
  color: #84ceff;
  height: 23px;
  position: absolute;
  bottom: -30px;
  right: 0;
  font-size: 12px;
  font-family: "Poppins Regular", sans-serif, Arial;
  div {
    background: #fff;
    margin-left: -20px;
    width: 100px;
    color: red;
    font-weight: 800;
  }
}
.membership-graph .expiry-line-box {
  position: absolute;
  width: 10px;
  height: 500px;
  border-left: 3px solid red;
  top: -60px;
  left: 218px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    background: #fff;
    margin-left: -20px;
    width: 100px;
    color: red;
    font-weight: 800;
    
  }
}
.membership-graph .end-date-text1 {
  color: #84ceff;
  height: 23px;
  position: absolute;
  font-size: 12px;
  bottom: -30px;
  left: 0;
  font-family: "Poppins Regular", sans-serif, Arial;
}

element.style {
  margin-left: 367px;
}

.membership-graph .today-line-box {
  position: absolute;
  left: 20px;
  width: 10px;
  height: 484px;
  border-left: 1px dashed #ffd500;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  div {
    background: #fff;
    margin-left: -20px;
    width: 100px;
    color: #ffd500;
    font-weight: 800;
 
  
  }
}
</style>



