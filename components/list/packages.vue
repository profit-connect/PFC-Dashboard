<template>
  <div class="content-packages"> 
    <div
      v-for="data in filteredPackages"
      :key="data.id"
      :class="data.status === 'Active' ? 'Active' : ''"
      class="package-row pb-4"
      :data-status="data.status === 'Active' ? 'Active' : 'Inactive'"
    >
      <div class="package-row__status">
        <div class="title editPackageBtn" @click= "$emit('on-package-select', data)">
          {{ data.name }}
        </div>

        <MixPackageToggle
          v-model="data.status"
          left-color="#0f2"
          right-color="red"
          left="Active"
          right="Inactive"
          @update:model-value="$emit('on-change-package-status', data)"
        />
      </div>
      <!-- <div class="row g-3 w-100"> -->
      <div class="card-flex">
        <!-- <div class="col-4"  -->
        <div class="" 
     v-for="plan in (data?.plans || []).filter(plan => plan !== null)" 
     :key="plan.id">
    <CardPackage
      v-bind="plan"
      @onPlanstatusChange="$emit('on-planstatus-change', $event)"
      @onFeaturedChange="$emit('on-featured-change', $event)"
      @onPlanSelect="$emit('on-plan-select', plan)"
      :status="data.status"
    />
</div>

        <!-- <div v-if="data.plans && data.plans.length > 0" class="col-3 d-flex justify-content-center"> -->
          <div v-if="data.plans && data.plans.length > 0" class="d-flex justify-content-center" style="width: 250px;">
            <div 
            class="d-flex gap-3 add-button"
            @click="
              $emit('on-add-plan', {
                package_id: data.id,
                package_name: data.name,
                start_date: data.start_date,
                end_date :  data.end_date,
              })
            "
          >
            <img style=" height:50px; width:50px;"
              src="~/assets/images/svg/plus-icon.svg?timestamp=1701243704100"
              alt="Add plan icon"
            />
            <div  style="font-size: 22px;" >Add Plan</div>
          </div>
     
        
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits([
  "on-package-select",
  "on-change-package-status",
  "on-planstatus-change",
  "on-add-plan",
  "on-featured-change",
  "on-plan-select",
]);
const props = defineProps({
  packages: {
    type: Array<any>,
    default: () => [],
  },
});

// const filteredPackages = computed(() => {
//   // Verify that `packages` is an array
//   if (!Array.isArray(props.packages) || props.packages.length === 0) {
//     return []; // Return an empty array if `packages` is not an array or is empty
//   }

//   const now = new Date(); // Get the current time

//   return props.packages.map(packageItem => {
//     // Ensure `packageItem` is an object and `plans` is an array before filtering
//     let plans = Array.isArray(packageItem.plans) ? packageItem.plans.filter(plan => plan !== null) : [];

//     // Convert package start and end dates to Date objects
//     const startDate = new Date(packageItem.start_date);
//     const endDate = new Date(packageItem.end_date);

//     // Check if the current time is within the package's active range
//     const isActive = now >= startDate && now <= endDate;

//     // Update package status based on the time check, but keep original status if package is already inactive
//     const status = packageItem.status === 'Active' && !isActive ? 'Inactive' : packageItem.status;

  
//     console.log(plans)
//     return {
//       ...packageItem,
//       status, // Update status based on the time check
//     };
//   });
// });
const filteredPackages = computed(() => {
  // Verify that `packages` is an array
  if (!Array.isArray(props.packages) || props.packages.length === 0) {
    return []; // Return an empty array if `packages` is not an array or is empty
  }

  const now = new Date(); // Get the current time

  return props.packages.map(packageItem => {
    if (!packageItem) return null; // Skip if the packageItem is null or undefined

    // Ensure `packageItem.plans` is an array before filtering
    let plans = Array.isArray(packageItem.plans) ? packageItem.plans.filter(plan => plan !== null) : [];

    // Convert package start and end dates to Date objects
    const startDate = new Date(packageItem.start_date);
    const endDate = new Date(packageItem.end_date);

    // Check if the current time is within the package's active range
    const isActive = now >= startDate && now <= endDate;

    // Update package status based on the time check, but keep original status if package is already inactive
    const status = packageItem.status === 'Active' && !isActive ? 'Inactive' : packageItem.status;

    return {
      ...packageItem,
      status, // Update status based on the time check
    };
  }).filter(item => item !== null); // Filter out any null values resulting from missing packageItems
});

</script>

<style lang="scss" scoped>
.content-packages {
  display: flex;
  flex-flow: column;
  .add-button{
    cursor: pointer;
    height: 134px;
    align-items: center;
    font-weight: 800;
    font-size: 18px;
    img{
      height: 28px;
      width: 28px;
    }
  }
}

.content-packages.is-reverse {
  flex-flow: column-reverse;
}

.content-packages .package-row {
  display: flex;
  margin-bottom: 25px;
}

.content-packages .package-row__status {
  min-width: 260px;
  width: 260px;
  margin-right: 10px;
}

.content-packages .package-row__status .title {
  font: 22px "Poppins Medium", sans-serif, Arial;
  cursor: pointer;
  transition: 0.35s;
}

.content-packages .package-row__status .title:hover {
  color: #84ceff;
}

.featured-status {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  background: url(assets/images/svg/star-grey.svg) no-repeat;
  background-size: cover;
  transition: 0.4s;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1215686275));
}

.featured-status:hover {
  transform: scale(1.3);
}

.featured-status.featured {
  background: url(assets/images/svg/star-yellow.svg) no-repeat;
}
.add-plan {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  margin-left: 30px;
  font: 22px "Poppins Medium", sans-serif, Arial;
  cursor: pointer;
  min-width: 160px;
  margin-bottom: 15px;
}

.add-plan img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.card-flex{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
