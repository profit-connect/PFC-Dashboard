
<template>
  <div class="container bg-white h-full p-4">
    <div class="content__title-box">
      <div class="content-left">
        <div>
          <h1>Membership Packages</h1>
        </div>
        <div class="addNewBtn addNewPackage createRow" @click="onAddNewPackage">
          <div class="plus">+</div>
          <div class="text-add">Add a Package</div>
        </div>
      </div>
      <div>
        <SearchBar @on-search="onSearch" />
      </div>
    </div>
    <div class="content-filters">
      <MixToggleBtn v-model="sortingOrder" left="A-Z" right="Z-A" />
      <MixBtnGroup
        v-model="currentFilter"
        :labels="['All', 'Active', 'Inactive']"
      />
    </div>
    <ListPackages
      :packages="computedData"
      @onPackageSelect="onPackageSelect"
      @onChangePackageStatus="onChangePackageStatus"
      @onPlanstatusChange="onPlanstatusChange"
      @onAddPlan="onAddPlan"
      @onFeaturedChange="onFeaturedChange"
      @onPlanSelect="onPlanSelect"
    />

    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedPackage ? "Update" : "Create" }} a Package
      </template>
      <FormPackage
        v-if="showCatrgoryForm"
        v-model:packageData="selectedPackage"
        @reload="refresh"
        @close-canvas="showCatrgoryForm = false"
      />
    </Modal>
    <Modal v-model="showPlanForm" id="plan-modal">
      <template #title>
        {{ selectedPlan ? "Update / Create" : "Create" }} a Plan
        <h5 class="text-center mt-2">
          {{ selectedPackageForPlan?.package_name }}
        </h5>
      </template>
      <!-- @reload="refresh(), (showPlanForm = false)" -->
      <FormPackagePlan
        v-if="showPlanForm"
        v-model:planData="selectedPlan"
        :selectedPackage="selectedPackageForPlan"
        :create-dates="selectedPackageDates"
        :update-dates="packageDatesBySelectedPlan"
        @reload="refresh"
        :accessData="accessData ?? {}"
        @close-canvas="showPlanForm = false"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { stringToBoolean } from "@/utils/booleanConverter";
import { useBreadcrumbStore } from "~/store/breadcrumb";
import { computedAsync } from "@vueuse/core";

const { setBreadcrumb } = useBreadcrumb();
const { currentUserType } = useAuthStore();
const showCatrgoryForm = ref(false);
const currentFilter = ref(1);
const sortingOrder = ref("A-Z");
const selectedPackage = ref();
const showPlanForm = ref(false);
const selectedPlan = ref();
const selectedPackageForPlan = ref();
const searchTerm = ref();
const { $toast } = useNuxtApp();

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Control", link: "" },
    { label: "Membership ", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "0px",
});

const { data, pending, refresh } = await useCustomFetch<any>(
  "/packages/get/packages",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);

const accessData = computedAsync(async () => {
  const { data: api1 } = await useCustomFetch<any>("/space/get/categories", {
    method: "POST",
    body: {
      facility_id: currentUserType?.id,
    },
  });
  const { data: api2 } = await useCustomFetch<any>("/category/get/categories", {
    method: "POST",
    body: {
      facility_id: currentUserType?.id,
    },
  });
  const spaces = api1.value.categories.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
      rooms: item.room
        .filter((item: any) => item)
        .map((room: any) => {
          if (room)
            return {
              label: room.name,
              value: room.id,
            };
        }),
    };
  });
  const classes = api2.value.categories.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  return { spaces, classes };
});

// const filterPackages = (data: any) => {
//   switch (currentFilter.value) {
//     case 1:
//       return data;
//     case 2:
//       return data.filter((item: any) => item.status === "Active");
//     case 3:
//       return data.filter((item: any) => item.status === "Inactive");
//     default:
//       return data;
//   }
// };
const filterPackages = (data: any) => {
  const currentDate = new Date(); // Current date for comparison
  switch (currentFilter.value) {
    case 1:
      return data; // No filter applied
    case 2:
      // Filter for "Active" packages: status is "Active" and current date is between start and end dates
      return data.filter((item: any) => {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);
        return item.status === "Active" && currentDate >= startDate && currentDate <= endDate;
      });
    case 3:
      // Filter for "Inactive" packages: status is "Inactive" or (status is "Active" but current date is not between start and end dates)
      return data.filter((item: any) => {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);
        return item.status === "Inactive" || (item.status === "Active" && (currentDate < startDate || currentDate > endDate));
      });
    default:
      return data; // Default case returns all data if no specific filter is matched
  }
};
const onAddNewPackage = () => {
  selectedPackage.value = null; // Reset selectedPackage
  showCatrgoryForm.value = true; // Show the form for a new package
};

const onPackageSelect = async (data: any) => {
  selectedPackage.value = {
    name: data.name,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date,
    package_id: data.id,
  };
  showCatrgoryForm.value = true;
};

const onChangePackageStatus = async (selectedPackage: any) => {
  try {
    const { data } = await useCustomFetch<any>(
      "/packages/update/packagestatus",
      {
        method: "POST",
        body: {
          package_id: selectedPackage.id,
          facility_id: currentUserType?.id,
          status: selectedPackage.status,
        },
      }
    );
    if (data.value.return) {
      refresh();
      $toast("Package status edited successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/packagestatus", err);
  }
};

const computedData = computed(() => {
  const newData: any = searchTerm.value
    ? data.value.packages.filter((a: any) =>
        a.name.toLowerCase().includes(searchTerm.value)
      )
    : data.value.packages;
  if (sortingOrder.value === "A-Z") {
    return filterPackages(newData);
  } else {
    return filterPackages(
      useOrderBy(newData, [(item) => item.name.toLowerCase()], ["desc"])
    );
  }
});

const onPlanstatusChange = async (newData: any) => {
  console.log(data)
  try {
    const { data } = await useCustomFetch<any>("/packages/update/planstatus", {
      method: "POST",
      body: {
        ...newData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      refresh();
      $toast("Plan status edited successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/planstatus", err);
  }
};

const onFeaturedChange = async (newData: any) => {
  try {
    const { data } = await useCustomFetch<any>(
      "/packages/update/planfeatured",
      {
        method: "POST",
        body: {
          ...newData,
          facility_id: currentUserType?.id,
        },
      }
    );
    if (data.value.return) {
      refresh();
      $toast("Plan featured status edited successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/planfeatured", err);
  }
};

// for the plan
const onAddPlan = (data: any) => {
  selectedPlan.value = {};
  console.log(data, "data");
  selectedPackageForPlan.value = data;
  showPlanForm.value = true;
};

const onPlanSelect = (plan: any) => {
  const spacesData: any = {};
  const rooms = plan.room.map((item: any) => item?.id);
  accessData.value?.spaces.forEach((item: any) => {
    const roomsInsideSpaces = item.rooms.map((ele: any) => ele.value);
    spacesData[`spaces[${item.label}]`] = [];
    rooms.forEach((ele) => {
      if (roomsInsideSpaces.includes(ele))
        spacesData[`spaces[${item.label}]`].push(ele);
    });
  });
  selectedPlan.value = {
    ...plan,
    private: stringToBoolean(plan.private),
    pay_with_card: stringToBoolean(plan.pay_with_card),
    pay_with_gift_card: stringToBoolean(plan.pay_with_gift_card),
    charge_on_first: stringToBoolean(plan.charge_on_first),
    auto_renew: stringToBoolean(plan.auto_renew),
    first_class_free: stringToBoolean(plan.first_class_free),
    display_original_price: stringToBoolean(plan.display_original_price),
    featured: stringToBoolean(plan.featured),
    promotion_price: parseFloat(plan.promotion_price) || "",
    plan_id: plan.id,
    ...spacesData,
    roomse: rooms,
    classes: plan.classes.filter(Boolean).map((item: any) => item?.id),
    available_tags: plan.available_tags
      .filter(Boolean)
      .map((item: any) => item?.id),
    except_tags: plan.except_tags.filter(Boolean).map((item: any) => item?.id),
    promotion_start: isNonZeroDate(plan.promotion_start)
      ? plan.promotion_start
      : "",
    promotion_end: isNonZeroDate(plan.promotion_start)
      ? plan.promotion_end
      : "",
  };
  showPlanForm.value = true;
};
const onSearch = (data: string) => {
  searchTerm.value = data;
};
function isNonZeroDate(dateString: string) {
  return dateString !== "0000-00-00";
}


const packageDatesBySelectedPlan = computed(() => {
  // First, ensure 'selectedPlan.value' and 'selectedPlan.value.id' are defined and not null
  if (!selectedPlan.value || typeof selectedPlan.value.id !== 'number') {
    // Return default values if 'selectedPlan.value' or 'selectedPlan.value.id' is null or undefined
    return { startDate: null, endDate: null };
  }

  // Check if 'packages' is defined and not null
  if (!data.value.packages || !Array.isArray(data.value.packages)) {
    // Return default values if 'packages' is null or undefined or not an array
    return { startDate: null, endDate: null };
  }

  // Loop through all packages since 'packages' is valid
  for (const pkg of data.value.packages) {
    // Check if this package contains the selected plan using optional chaining
    const foundPlan = pkg.plans?.find(plan => plan.id === selectedPlan.value.id);
    if (foundPlan) {
      // Return the start and end dates if the selected plan is found
      return { startDate: pkg.start_date, endDate: pkg.end_date };
    }
  }

  // Return null or default values if no package contains the selected plan
  return { startDate: null, endDate: null };
});


const selectedPackageDates = computed(() => {
  // Check if the selected package exists and has both start and end dates
  if (selectedPackageForPlan.value && selectedPackageForPlan.value.start_date && selectedPackageForPlan.value.end_date) {
    return {
      startDate: selectedPackageForPlan.value.start_date,
      endDate: selectedPackageForPlan.value.end_date
    };
  } else {
    // Return null or default values for both start and end dates if there's no selected package or if the selected package has no start or end dates
    return { startDate: null, endDate: null };
  }
});



</script>

<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}
.content-box {
  position: relative;
  width: 70vw;
  max-width: 1396px;
  margin: unset;
  height: fit-content;
}

.content__title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.content-left {
  display: flex;
  align-items: center;
}

.content-filters {
  display: flex;
  justify-content: space-between;
  align-items: left;
  width: 440px;
  margin-bottom: 30px;
}
.content__title-box .addNewBtn {
  width: 150px;
  height: 40px;
  margin-top: 0;
  margin-left: 15px;
}

.content__title-box .addNewBtn {
  width: 150px;
  height: 40px;
  margin-top: 0;
  margin-left: 15px;
}
.addNewBtn .plus {
  border: 1px solid #84ceff;
  width: 14px;
  height: 14px;
  color: #84ceff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.addNewBtn {
  display: flex;
  background: #f2faff;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  cursor: pointer;
  margin-right: 12px;
  transition: 0.35s;
}
.addNewBtn .text-add {
  margin-left: 5px;
}
</style>