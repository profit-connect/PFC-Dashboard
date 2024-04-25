<template>
  <section class="content-section">
    <div class="content-box"> 
      <div class="content__title-box">
        <h1>Member Search</h1>
        <div class="content-filters">
          <MixToggleBtn v-model="sortingOrder" left="A-Z" right="Z-A" />
          <MixBtnGroup
            v-model="currentFilter"
            :labels="['All', 'Active', 'Inactive']"
          />
        </div>
      </div>
      <SearchBar @on-search="onSearch" />
      <div class="addNewMember" @click="handleAddSidebar()">
        <img
          
          class="plusIcon"
          src="~/assets/images/svg/plus-icon.svg"
          alt="Plus icon"
        />
        Add New
      </div>
      <ListMembers
        :items="getMembers"
        @add="handleAddSidebar"
        @edit="handleEditSidebar"
      />
    </div>
    <SidebarAddMember
      v-if="showAddSidebar"
      @close-sidebar="showAddSidebar = false"
      @reload="refreshData"
    />
    <SidebarUpdateMember
      v-if="showEditSidebar"
      v-model:member-id="memberId"
      @reload="refreshData"
      @close-sidebar="handleCloseSidebar"
    />
  </section> 
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useBreadcrumbStore } from "~/store/breadcrumb";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
// const { setBreadcrumb } = useBreadcrumb();
// setBreadcrumb({
//   items: [
//     { label: "Control Panel", link: "/" },
//     { label: "Profiles", link: "/" },
//   ],
// });


const memberId = ref();
const showAddSidebar = ref(false);
const showEditSidebar = ref(false);
const { currentUserType } = useAuthStore();
const facility_id = currentUserType?.id;
const searchTerm = ref('');
const sortingOrder = ref("A-Z");
const currentFilter = ref(1);
const breadcrumbStore = useBreadcrumbStore();
const { tags } = storeToRefs(useTagStore());

const taggs = ref();

const getBreadcrumbMargin = computed(() => {
  if (showAddSidebar.value || showEditSidebar.value) {
    return "0px"; // Adjust margin when either sidebar is active
  } else {
    return "-220px"; // Default margin when both sidebars are inactive
  }
});

// Set breadcrumb and its styles
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Control Panel", link: "" },
    { label: "Profiles", link: "" }, 
  ],
});

watchEffect(() => {
  breadcrumbStore.setStyles({
    position: "relative",
    right: getBreadcrumbMargin.value,
  });
});



const {
  data: membersData,
  pending: membersPending,
  refresh: refreshMembers,
   } = await useCustomFetch<any>(
  "/members/get/members",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);



const handleAddSidebar = () => {
  showAddSidebar.value = true;
  showEditSidebar.value = false;
};

const handleEditSidebar = (tab: number) => {
  (memberId.value = tab), (showAddSidebar.value = false);
  showEditSidebar.value = true;
};
const handleCloseSidebar = () => {
  showEditSidebar.value = false;
};
const filterPackages = (data: any) => {
  switch (currentFilter.value) {
    case 1:
      return data; // No filter applied
    case 2:
      return data.filter((item: any) => item && item.membership_status === "Active");
    case 3:
      return data.filter((item: any) => item && item.membership_status === null);
    default:
      return data; 
  }
};


const getMembers = computed(() => {
  const members = membersData.value?.members ?? [];
  const searchTermLower = (searchTerm.value ?? '').toLowerCase();

  const filteredData = members.filter(member => {
    // Check against first name and last name with null safety
    const matchesName = (member?.firstname ?? '').toLowerCase().includes(searchTermLower) ||
                        (member?.lastname ?? '').toLowerCase().includes(searchTermLower);

    // Check if any member's tag matches the search term with null safety
    const matchesTag = (member?.tags ?? []).some(memberTagId => {
      const tag = (tags.value ?? []).find(tag => tag.id === memberTagId);
      return tag ? tag.name.toLowerCase().includes(searchTermLower) : false;
    });

    return matchesName || matchesTag;
  });


  let sortedData = filteredData.sort((a, b) => {
    const sortMultiplier = sortingOrder.value === "Z-A" ? -1 : 1;
    return a.firstname.localeCompare(b.firstname) * sortMultiplier;
  });

  // Apply additional filters if needed
  return filterPackages ? filterPackages(sortedData) : sortedData;
});




const refreshData = () => {
  refreshMembers();
};

const onSearch = (data: string) => {
  searchTerm.value = data;
};
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
  max-width: 950px;
  margin: unset;
  height: fit-content;
  min-height: calc(100vh - 129px);
}

.content__title-box {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.content-filters {
  display: flex;
  justify-content: right;
  gap: 20px;
  align-items: center;
  width: 80%;
  // padding-left: 50px;
}
.addNewMember {
  font: 22px $font-family-medium;
  cursor: pointer;
  margin-left: 30px;
  padding: 20px 0px;

  .plusIcon {
    width: 50px;
    height: 50px;
    margin-right: 0px;
  }
}
</style>