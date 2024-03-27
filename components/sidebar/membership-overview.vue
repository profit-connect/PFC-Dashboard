Membership-overview without chart
<template>
  <SidebarUpdateMember v-model:member-id="props.memberId" />
  <div
    class="content-main-box"
    v-if="
      membersData &&
      membersData.member &&
      membersData.member.data &&
      membersData.member.data.length > 0
    "
  >
    <div class="content-box1 mb-3">
      <div class="content__title-box">
        <h1 class="content-title">Membership Overview</h1>
      </div>
      <div class="pre-text activePlanName"></div>

      <div class="joined-title">
        <b>Joining Date -</b>
        {{ formatDate(membersData.member.data[0].start_date) }}
      </div>

      <!-- <div v-if="sortedPlans" class="membership-graph">

  <div v-for="(plan, index) in sortedPlans" :key="plan.id" class="membership-graph__row1">
    <div 
      v-if="plan.plan_type === 'credits' || plan.plan_type === 'unlimited'" 
      class="graph-box"
      :style="{
        minWidth: '75px',
        width: calculateWidth(plan.start_date, plan.end_date),
        marginLeft: calculateMargin(plan, index, sortedPlans)
      }"
    >
      {{ plan.plan_name }} 
      <div class="end-date-text1">{{ formatDate(plan.start_date) }}</div>
      <div class="end-date-text">{{ formatDate(plan.end_date) }}</div>
    </div>

   

    <div style="margin-top: 30px;"
      v-if="plan.plan_type === 'add-on'" 
      class="graph-box"
      :style="{
        minWidth: '75px',
        width: calculateWidth(plan.start_date, plan.end_date),
        marginLeft: calculateMargin(plan, index, sortedPlans)
      }"
    >
      {{ plan.plan_name }} 
      <div class="end-date-text1">{{ formatDate(plan.start_date) }}</div>
      <div class="end-date-text">{{ formatDate(plan.end_date) }}</div>
    </div>
  </div> -->

      <!-- <div class="today-line-box" style="margin-left: 367px;">
    <div class="text">Today</div>
    <div class="line"></div>
    <div class="text todayDatePreview">December 1</div> 
  </div> -->
      <!-- </div> -->
      <ChartSubscribedPackage :plans="actualPlans"  />
    </div>
    <div class="content-box1">
      <div class="content__title-box">
        <h1 class="content-title">Membership Packages</h1>
        <div class="filter-box packagesByStatus">
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'All' }"
            @click.prevent="selectFilter('All')"
            >All</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'unlimited' }"
            @click.prevent="selectFilter('unlimited')"
            >Unlimited</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'credits' }"
            @click.prevent="selectFilter('credits')"
            >Credits</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'add-on' }"
            @click.prevent="selectFilter('add-on')"
            >Add-on</a
          >
        </div>
      </div>
      <div class="membership-packages">
        <div
          class="mm-package purchaseBoxBtn"
          v-for="(plan, index) in computedPlanDetails"
          :key="index"
          @click="selectPlan(plan.id)"
        >
          <div class="mmPackageAdd" @click="showCatrgoryForm = true">
            <img src="~/assets/images/svg/plus-icon.svg" />
          </div>
          <div class="mm-package__title">{{ plan.name }}</div>
          <div class="mm-package__data">
            <img src="~/assets/images/svg/tag-icon.svg" />
            <span v-if="plan.promotionPrice > 0">
              AED {{ formatPrice(plan.promotionPrice) }}</span
            >
            <span v-else> AED {{ formatPrice(plan.price) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-model="showPurchaseForm" id="purchase-modal">
    <FormMemberAddplan
      :member-info="membersData"
      :selected-plan-id="selectedPlanDetails"
      :package-dates="packageDatesBySelectedPlan"
      @reload="refreshData"
      @close-canvas="showPurchaseForm = false"
    />
  </Modal>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { useBreadcrumbStore } from "~/store/breadcrumb";
const { currentUserType } = useAuthStore();
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});
const { memberId } = toRefs(props);
const route = useRoute();
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

// setBreadcrumb({
//   items: [
//     { label: "Control Panel", link: "/" },
//     { label: "Profiles", link: "/" },
//   ],
// });
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Profiles", link: "" },
    { label: "Membership ", link: "" },
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

const showPurchaseForm = ref(false);
const selectedPlanId = ref("");
const selectedPlanDetails = ref(null);
const selectedFilter = ref("All");

function formatName(string) {
  if (!string) return "";
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(" ");
}

defineEmits(["edit"]);

const {
  data: membersData,
  refresh: refreshMembers,
  pending: membersPending,
} = await useCustomFetch<any>("/members/get/memberinfo", {
  method: "POST",
  body: JSON.stringify({
    facility_id: currentUserType?.id,
    member_id: props.memberId,
  }),
});

const { data, pending, refresh } = await useCustomFetch<any>(
  "/packages/get/packages",
  {
    method: "POST",
    body: JSON.stringify({
      facility_id: currentUserType?.id,
    }),
  }
);

const ComputedPackage = computed(() => {
  const now = new Date();
  if (data.value && Array.isArray(data.value.packages)) {
    return data.value.packages
      .filter((pkg) => pkg && pkg.status === "Active") // Ensure pkg is not null before accessing status
      .filter((pkg) => {
        const startDate = new Date(pkg.start_date);
        const endDate = new Date(pkg.end_date);
        return now >= startDate && now <= endDate; // Check if current time is within the package's active range
      })
      .filter((pkg) => Array.isArray(pkg.plans) && pkg.plans.length > 0) // Ensure there are plans
      .flatMap((pkg) =>
        pkg.plans.map((plan) => ({
          ...plan,
          // Any additional transformation based on package data can go here
        }))
      );
  }
  return [];
});

const computedPlanDetails = computed(() => {
  // Check if `ComputedPackage.value` is truthy and is an array before calling reduce
  if (Array.isArray(ComputedPackage.value)) {
    return ComputedPackage.value.reduce((acc, plan) => {
      // if (
      //   plan !== null &&
      //   (selectedFilter.value === "All" ||
      //     plan.type === selectedFilter.value) &&
      //   plan.private === "No"
      // ) 
      if (
        plan !== null &&
        (selectedFilter.value === "All" ||
          plan.type === selectedFilter.value) 
      ){
        acc.push({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          private: plan.private,
          price: plan.price,
          card: plan.pay_with_card,
          gift: plan.pay_with_gift_card,
          type: plan.type,
          duration: plan.duration,
          period: plan.period,
          category: plan.category,
          creditCount: plan.creditCount,
          paymentDuration: plan.payment_duration,
          paymentPeriod: plan.payment_period,
          paymentCycle: plan.payment_cycle,
          chargeOnFirst: plan.charge_on_first,
          autoRenew: plan.auto_renew,
          firstClassFree: plan.first_class_free,
          updatedDate: plan.updatedDate,
          promotionPrice: plan.promotion_price,
          displayOriginalPrice: plan.displayOriginalPrice,
          promotionStart: plan.promotion_start,
          promotionEnd: plan.promotion_end,
          joiningFee: plan.joining_fee,
          featured: plan.featured,
          classes: plan.classes,
          room: plan.room,
          availableTags: plan.availableTags,
          exceptTags: plan.exceptTags,
        });
      }
      return acc;
    }, []);
  } else {
    // Return an empty array if `ComputedPackage.value` is not an array
    return [];
  }
});

const refreshData = () => {
  refreshMembers();
};

const selectFilter = (filterType) => {
  selectedFilter.value = filterType;
};
function formatPrice(value) {
  if (value === null || value === undefined) {
    return "N/A"; // or any default value you find suitable
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const selectPlan = (planId) => {
  selectedPlanId.value = planId;
  selectedPlanDetails.value = computedPlanDetails?.value.find(
    (plan) => plan.id === planId
  );
  showPurchaseForm.value = true;
};

const packageDatesBySelectedPlan = computed(() => {
  // Verify 'data.value' and 'data.value.packages' are valid
  if (!data.value || !Array.isArray(data.value.packages)) {
    return { startDate: null, endDate: null };
  }

  // Loop through all available packages
  for (const pkg of data.value.packages) {
    // Ensure 'pkg.plans' is valid and is an array before proceeding
    if (!pkg.plans || !Array.isArray(pkg.plans)) continue;

    // Attempt to find a plan that matches the selected plan, ensuring 'plan' is not null before checking its 'id'
    const foundPlan = pkg.plans.find(
      (plan) => plan !== null && plan.id === selectedPlanId.value
    );
    if (foundPlan) {
      // Return package dates if the plan is found
      return {
        startDate: pkg.start_date || null, // Provide a null fallback if 'start_date' is undefined
        endDate: pkg.end_date || null, // Provide a null fallback if 'end_date' is undefined
      };
    }
  }

  // Return null dates if no matching plan is found in any packages
  return { startDate: null, endDate: null };
});

const formatDate = (dateString) => {
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
 const actualPlans = ref( membersData.value.member.memberships);
const plans = ref([
  // Existing 'credits' and 'unlimited' plans unchanged
  {
    id: "107",
    plan_name: "6-Month Pass",
    plan_desc: "Access for 6 months",
    plan_type: "unlimited",
    plan_price: "8000",
    plan_status: "Expired",
    start_date: "2024-01-01",
    end_date: "2024-03-01",
  },
  //...
  {
    id: "115",
    plan_name: "New Year Challenge5",
    plan_desc: "Kickstart the year with a challenge",
    plan_type: "credits",
    plan_price: "2000",
    plan_status: "Active",
    start_date: "2024-05-02",
    end_date: "2024-06-01",
  },

  // Adjusted 'add-on' plans to not overlap
  // Assuming 'add-on' plans can start after the last 'credits'/'unlimited' plan
  {
    id: "108",
    plan_name: "Summer Special",
    plan_desc: "Special rates for the summer",
    plan_type: "add-on",
    plan_price: "2500",
    plan_status: "Future",
    start_date: "2024-06-02", // Starts the day after the last 'credits' plan ends
    end_date: "2024-07-02", // Assuming a 1-month duration
  },
  {
    id: "112",
    plan_name: "Couples Special",
    plan_desc: "Special plan for couples",
    plan_type: "add-on",
    plan_price: "3000",
    plan_status: "Expired",
    start_date: "2024-07-03", // Starts the day after the previous 'add-on' ends
    end_date: "2024-08-03", // Assuming a 1-month duration
  },
  {
    id: "113",
    plan_name: "New Year Challenge2",
    plan_desc: "Kickstart the year with a challenge",
    plan_type: "unlimited",
    plan_price: "2000",
    plan_status: "Future",
    start_date: "2024-08-04", // Adjusted to follow 'add-on' plans
    end_date: "2024-09-04",
  },
  {
    id: "114",
    plan_name: "New Year Challenge",
    plan_desc: "Kickstart the year with a challenge",
    plan_type: "add-on",
    plan_price: "2000",
    plan_status: "Future",
    start_date: "2024-09-05", // Adjusted to ensure no overlap
    end_date: "2024-11-05", // Assuming a 1-month duration
  },
  {
    id: "115",
    plan_name: "New Year Challenge4",
    plan_desc: "Kickstart the year with a challenge",
    plan_type: "unlimited",
    plan_price: "2000",
    plan_status: "Future",
    start_date: "2024-03-05", // Adjusted to ensure no overlap
    end_date: "2024-03-20", // Assuming a 1-month duration
  },
  // {
  //     id: "116",
  //     plan_name: "New Year Challenge5",
  //     plan_desc: "Kickstart the year with a challenge",
  //     plan_type: "add-on",
  //     plan_price: "2000",
  //     plan_status: "Future",
  //     start_date: "2024-01-01",  // Adjusted to ensure no overlap
  //     end_date: "2024-05-20",    // Assuming a 1-month duration
  // },
]);

function formatDate2(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// const sortedPlans = computed(() => {
//     return membersData.value.member.memberships.slice().sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
// });
const sortedPlans = computed(() => {
  return plans.value
    .slice()
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
});
const calculateWidth = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start) || isNaN(end)) return "50px"; // Return default width if dates are invalid
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const widthPerDay = 10;
  return Math.max(diffDays * widthPerDay, 50) + "px";
};

const calculateMargin = (currentPlan, index, sortedPlans) => {
  if (index === 0) return "0px"; // No margin for the first plan in the list

  let previousPlanEndDate = null;

  // Special handling for 'add-on' plans
  if (
    currentPlan.plan_type === "add-on" &&
    sortedPlans.slice(0, index).every((plan) => plan.plan_type !== "add-on")
  ) {
    const firstNonAddonPlan = sortedPlans.find(
      (plan) => plan.plan_type !== "add-on"
    );
    if (firstNonAddonPlan) {
      previousPlanEndDate = new Date(firstNonAddonPlan.end_date);
    }
  } else {
    // Find the previous plan of the same or equivalent type
    for (let i = index - 1; i >= 0; i--) {
      if (
        currentPlan.plan_type === sortedPlans[i].plan_type ||
        (["unlimited", "credits"].includes(currentPlan.plan_type) &&
          ["unlimited", "credits"].includes(sortedPlans[i].plan_type))
      ) {
        previousPlanEndDate = new Date(sortedPlans[i].end_date);
        break;
      }
    }
  }

  if (previousPlanEndDate) {
    const currentPlanStartDate = new Date(currentPlan.start_date);
    // Ensure diffTime is always positive
    const diffTime = Math.abs(
      currentPlanStartDate.getTime() - previousPlanEndDate.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${Math.max(0, diffDays * 10)}px`; // Ensure margin is at least 0 and adjust per day as needed
  }

  return "0px"; // No margin if no relevant previous plan
};

const currentDate = new Date();
const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const day = currentDate.getDate();
const monthIndex = currentDate.getMonth();
const year = currentDate.getFullYear();
const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
</script>
<style lang="scss" scoped>
.content-main-box .content-box1 {
  position: relative;
  width: 65vw;
  max-width: 950px;
  min-height: 800px;
  // overflow-x: auto;

}

.content-box1 {
  position: relative;
  width: 65vw;
  background: #ffffff;
  box-shadow: 0px 10px 20px #00000014;
  max-width: 950px;
  min-height: 550px;
  padding: 20px;
  margin: 0 auto;
  height: 200px;
  // margin-bottom: 50px;
  border-radius: 10px;
}
.content-main-box1 .content__title-box {
  justify-content: space-between;
  margin-bottom: 15px;
}
.content__title-box h1 {
  font-size: 22px;
  margin-bottom: 0;
}
.content-main-box .pre-text {
  margin-bottom: 20px;
}
.content-main-box .no-active-plan {
  text-align: center;
  margin-top: 180px;
}
.joined-title {
  font-family: "Poppins regular", sans-serif, Arial;
  margin-bottom: 10px;
  width: 50%;
}
.filter-box {
  display: flex;
}
.filter-box .filter-option.is-active {
  color: #000;
  border: 2px solid #84ceff;
}
.filter-box .filter-option {
  color: #ccc;
  padding: 8px 12px;
  margin-right: 10px;
  border: 2px solid #f1f2f2;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.35s;
  height: fit-content;
}
.membership-packages {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-left: 42px;
}
.mm-package {
  display: flex;
  align-items: center;
  background: #f2faff;
  min-width: 260px;
  margin: 0 7px;
  width: calc(33% - 20px);
  height: 60px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 13px;
  border-radius: 7px;
}
.mm-package .mmPackageAdd {
  padding-right: 12px;
}
.mm-package .mmPackageAdd img {
  min-width: 20px;
  width: 20px;
  height: 20px;
}
.mm-package__title {
  font: 14px "Poppins Bold", sans-serif, Arial;
  width: 200px;
  padding-right: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mm-package__data {
  display: flex;
  min-width: fit-content;
  margin-left: auto;
}
.mm-package__data img {
  margin-right: 10px;
}
</style>
