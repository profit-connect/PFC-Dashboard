<template>
  <div
    v-if="currentUserType && currentUserType.type === 'franchise'"
    class="user-dropdown-box openUserDropdown"
    @mouseenter="openUserDropdown = true"
    @mouseleave="openUserDropdown = false"
  >  
    <div @click="showFacility = true" class="d-flex align-items-center gap-2">
      <div class="user-open-menu">
        <div class="franchise">
          {{ franchise?.franchise[0].name }}
       
          
        </div><div class="facility">{{ selectedFacilityName }}</div>
      </div>
      <div>
        <img src="~/assets/images/facility-logo.png" />
      </div>
    </div>
    <Modal v-model="showFacility" id="facility-list">
      <div class="row mt-2">
        <!-- <template #title> -->
        <h2 class="col-10" style="text-align: left">Facilitiy Search</h2>
        <!-- </template> -->
        <MixToggleBtn
          class="col-2"
          v-model="sortingOrder"
          left="A-Z"
          right="Z-A"
        />
      </div>
      <SearchBar @on-search="onSearch" />

      <div v-for="facility in getFacilities" :key="facility.id">
        <div
          class="d-flex items-align-center"
          @click="selectFacility(facility)"
        >
          <div class="image">
            <img class="rounded" src="~/assets/images/do.jpeg" />
          </div>
          <div class="facility-name">
            <p style="font-size: 22px">
              {{ franchise?.franchise[0].name }} | {{ facility.name }}
            </p>
            <p class="address" style="font-size: 14px">
              Unit #2, Jumeirah Islands Pavilion, Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    </Modal>
    <!-- <div
        class="user-dropdown userDropdown"
        :class="openUserDropdown ? 'is-active' : ''"
      >
        <div class="name">Facilities </div>
       
  
        <ul v-for="facility in getFacilities" :key="facility.id">
          <li>
            <a href="/">
                
              <img src="/images/svg/header/schedule.svg" alt="Schedule" />
              {{facility.name}}
            </a>
          </li>
        </ul>
      </div> -->
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useFranchiseStore } from "~/store/franchise";

const { franchise } = useFranchiseStore();
const openUserDropdown = ref(false);
const { initLogout, currentUserType } = useAuthStore();
const showFacility = ref(false);
const searchTerm = ref();
const sortingOrder = ref("A-Z");

const emit = defineEmits(["facility-selected"]);
const selectedFacilityName = ref("");

onMounted(() => {
  const savedFacilityName = localStorage.getItem("selectedFacilityName");
  if (savedFacilityName) {
    selectedFacilityName.value = savedFacilityName;
  } else if (
    franchise &&
    franchise.franchise[0] &&
    franchise.franchise[0].facility.length > 0
  ) {
    const defaultFacility = franchise.franchise[0].facility[0];
    selectedFacilityName.value = defaultFacility.name;
    localStorage.setItem("selectedFacilityName", defaultFacility.name);
  }
});

const selectFacility = (facility) => {
  selectedFacilityName.value = facility.name;
  showFacility.value = false;
  emit("facility-selected", facility.id);
  localStorage.setItem("selectedFacilityName", facility.name);
};

const getFacilities = computed(() => {
  try {
    const facilities = franchise?.franchise[0]?.facility || [];

    const filteredFacilities = searchTerm.value
      ? facilities.filter((facility) =>
          facility.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      : facilities;

    // Sorting
    let sortedFacilities;
    if (sortingOrder.value === "A-Z") {
      sortedFacilities = filteredFacilities.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortingOrder.value === "Z-A") {
      sortedFacilities = filteredFacilities.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else {
      sortedFacilities = filteredFacilities;
    }

    // Map to required structure
    return sortedFacilities.map((facility) => ({
      name: facility.name,
      id: facility.id,
    }));
  } catch (error) {
    console.error("Error getting facilities:", error);
    return [];
  }
});

const onSearch = (data: string) => {
  searchTerm.value = data;
};
</script>

<style lang="scss" scoped>
.user-dropdown-box {
  display: flex;
  align-items: center;
  position: relative;

  .user-open-menu {
    // width: 100px;
    // cursor: pointer;
    color: $main-blue;
    // border-radius:5%;
    // border: 1px solid $main-blue;
    // overflow: hidden;
    // background: $main-dark-blue;
  }
  .franchise {
    position: relative;
    top: 4px;
    font-size: 12px;
    color: white;
    font-weight: 500;
  }
  .facility {
    font-size: 12px;
    color: rgb(223, 203, 203);
  }
  .user-dropdown {
    position: absolute;
    top: -4px;
    background: #ffffff;
    right: -3px;
    border-radius: 6px 20px 6px 6px;
    width: 100px;
    box-shadow: 0 0 13px #00000026;
    opacity: 0;
    transition: $transitionSpeed;
    z-index: -1;
    transform: scale(0.8);
    width: 50px;
    height: 50px;
    overflow: hidden;

    &.is-active {
      opacity: 1;
      z-index: 50;
      transform: scale(1);
      width: 200px;
      height: unset;
    }

    .name {
      font-weight: bold;
      max-width: 110px;
      line-height: 1.4;
      margin-left: 20px;
      margin-top: 10px;
    }

    ul {
      list-style: none;
      margin: 20px 0 0;
      padding: 0;

      li {
        &:last-child {
          margin: 10px 0 20px;
        }
      }

      a {
        display: block;
        padding: 10px 20px;
        background: transparent;
        text-decoration: none;
        color: #000000;
        transition: $transitionSpeed;

        &:hover {
          background: #0000000d;
        }

        img {
          margin-right: 7px;
        }
      }
    }
  }
}
.image {
  border-radius: 6px 20px 6px 6px;
  width: 100px;
  margin-right: 20px;
}
.address {
  position: relative;
  bottom: 10px;
}
</style>
