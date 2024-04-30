<template>
  <TemplatesFacility>
    <div>
      <div class="d-flex align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-4">
          <h1 style="font-size: 22px; ">Tags</h1>
          <MixButton
            style="background-color: #f2faff;  margin-bottom: 10px;"
            size="sm"
            label="New tags"
            @Click="closeEditMode(), (showTagModal = true)"
          />
        </div>
        <div class="search ml-auto">
          <SearchBar @on-search="onSearch" />
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <MixToggleBtn 
        style="position: relative; top: 10px ;"
        v-model="sortingOrder" left="A-Z" right="Z-A" />
        <div class="d-flex align-items-center gap-2">
          <span>Created</span>
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'Recently' }"
            @click.prevent="selectFilter('Recently')"
            >Recently</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'Oldest' }"
            @click.prevent="selectFilter('Oldest')"
            >Oldest</a
          >
        </div>
      </div>
      <table class="tags-table w-full">
        <thead>
          <th style="position: relative; left: 15px">Name</th>
          <th style="position: relative; right: 15px;">Count</th>
          <th  style="position: relative; right: 10px;">Created by</th>
          <th  style="position: relative; right: 10px;" class="w-125px">Date created</th>
        </thead>
        <tbody>
          <!-- <tr v-for="tag in getFilteredTags"  :key="tag && tag.id" @click="tag && tag.id && setEditId(tag.id)"> -->
          <tr v-for="tag in getFilteredTags"  :key="tag && tag.id">
            <td  class="name">{{ tag ? tag.name : '-' }}</td>
            <td>{{ tag ? tag.count : '-' }}</td>
            <td>{{ tag ? tag.created_by : '-' }}</td>
            <td>{{ tag ? formatDate(tag.updated_date) : '-' }}</td>
          </tr>

        </tbody>
      </table>

      <Modal v-model="showTagModal">
        <template #title> {{ !currentTag ? "New Tag" : "Edit Tag" }}</template>

        <FormFacilityTag
          v-if="showTagModal"
          :tagData="currentTag"
          @close-canvas="showTagModal = false"
          @reload="refreshTags"
        />
      </Modal>
    </div>
  </TemplatesFacility>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useTagStore } from "~/store/tag";
// const { setBreadcrumb } = useBreadcrumb();
import { storeToRefs } from "pinia";

// setBreadcrumb({
//   items: [
//     { label: "Control Panel", link: "/" },
//     { label: "Facilities", link: "/" },
//   ],
// });
const { tags } = storeToRefs(useTagStore());
const selectedFilter = ref("Recently");

const tagStore = useTagStore(); // Accessing the tag store

// Function to refresh the tags list
const refreshTags = async () => {
  console.log("jack")
  await tagStore.getAllTags(); // Call the method that fetches tags
};

const {
  isActivated: showTagModal,
  setEditId,
  closeEditMode,
  activetedId: tagId,
} = useEditMode();
const searchTerm = ref();
const sortingOrder = ref("A-Z");
const showFacilityForm = ref(false);
const memberId = ref("");
const currentFilter = ref("Recently");
const { currentUserType } = useAuthStore();

const currentTag = computed(() => {
  if (!tagId.value) return null;
  return tags.value.find((tag) => tag.id === tagId.value);
});

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}
const getFilteredTags = computed(() => {
  if (!Array.isArray(tags.value) || tags.value.length === 0) {
    console.error("tags.value is not an array:", tags.value);
    return [];
  }

  let filteredTags = searchTerm.value
    ? tags.value.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    : tags.value;

  // First, sort by name if needed
  if (sortingOrder.value !== "None") {
    filteredTags = filteredTags.sort((a, b) =>
      sortingOrder.value === "A-Z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  // Then, sort by date
  if (selectedFilter.value === "Recently") {
    filteredTags.sort(
      (a, b) => new Date(b.updated_date) - new Date(a.updated_date)
    );
  } else if (selectedFilter.value === "Oldest") {
    filteredTags.sort(
      (a, b) => new Date(a.updated_date) - new Date(b.updated_date)
    );
  }

  return filteredTags;
});

const selectFilter = (filter) => {
  selectedFilter.value = filter;
};

const onSearch = (data: string) => {
  searchTerm.value = data;
};
</script>

<style scoped>
.w-125px {
  width: 125px;

}
.tags-table {
  margin-top: 30px;
  color: #000000;

  tr {
    transition: background-color 0.3s; /* Smooth transition for hover effect */
    border-radius: 10px;
    height: 60px;
    &:hover {
      background-color: #f2faff; 
      cursor: pointer; 
      border-radius: 10px !important; 
    }
    td {
      

    }
    th {
      /* padding: 7px 10px; */
    }

    th {
      &:first-child {
        padding-left: 42px;
      }
    }
  }

  .cardIcon {
    height: 22px;
  }

  .downloadIcon {
    height: 22px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
.filter-option.is-active {
  color: #000;
  border: 2px solid #84ceff;
}
.filter-option {
  width: 120px;
  color: #ccc;
  padding: 8px 30px;
  margin-right: 10px;
  border: 2px solid #f1f2f2;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.35s;
  height: fit-content;
}
.name {
  position: relative;
  left: 13px;

  display: inline-block;
  /* background-color: #f2faff; / */
  border: 1px solid #84ceff;
  border-radius: 5px; /* Rounded corners */
  padding: 5px 15px;
  font-size: 14px;
  text-align: center;
  margin: 2px;
  color: #000;
  white-space: nowrap;
  margin-top: 10px;
}
</style>
