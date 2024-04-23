<template>
  <SidebarUpdateMember v-model:member-id="props.memberId" />
  <div class="content-main-box">
    <div class="content-box mb-3">
      <div class="d-flex align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-4">
          <p class="small-title-medium" style="font-size: 22px; margin-bottom: 0px">Notes</p>
          <MixButton
            style="background-color: #f2faff"
            @click="showStoreForm = true"
            size="sm"
            label="New Note"
          />
        </div>
        <div class="search">
          <SearchBar @on-search="onSearch" />
        </div>
      </div>
      <div class="filter-box packagesByStatus">
        <span>Updated </span>
        <a
          href="#"
          class="filter-option"
          :class="{
            'is-active': selectedFilter === 'recently',
            disabled: !updatedFiltersActive,
          }"
          @click.prevent="selectFilter('recently')"
          >Recently</a
        >
        <a
          href="#"
          class="filter-option"
          :class="{
            'is-active': selectedFilter === 'oldest',
            disabled: !updatedFiltersActive,
          }"
          @click.prevent="selectFilter('oldest')"
          >Oldest</a
        >

        <span>Created </span>
        <a
          href="#"
          class="filter-option"
          :class="{
            'is-active': selectedFilter === 'newest',
            disabled: !createdFiltersActive,
          }"
          @click.prevent="selectFilter('newest')"
          >Newest</a
        >
        <a
          href="#"
          class="filter-option"
          :class="{
            'is-active': selectedFilter === 'oldest1',
            disabled: !createdFiltersActive,
          }"
          @click.prevent="selectFilter('oldest1')"
          >Oldest</a
        >
      </div>
      <div
        style="margin-top: 20px"
        v-if="getMemberInfo.length === 0"
        class="no-notes"
      >
        <p
          style="
            font-size: 18px;
            font-weight: bold;
            position: absolute;
            top: 50%;
            margin-left: 150px;
          "
        >
          No notes available. Click the button below to add a new note.
        </p>
      </div>

      <div class="update-notes" v-else>
        <FormKit
          type="form"
          :modelValue="selectedPackage"
          @submit="submitHandler"
          :actions="false"
          #default="{ value }"
        >
          <div class="textarea" v-for="note in getMemberInfo" :key="note.id">
            <div
              v-show="!isEditingNote(note.id) && !isEditingReply(note.id, null)"
            >
              <div
                @click="toggleNote(note.id)"
                class="d-flex align-items-center justify-content-between gap-3"
              >
                <p class="small-title-medium"
                  style="
                    font-size: 22px;
                    margin-bottom: 10px;
                  "
                >
                  {{ formatName(note.title) }}
                </p>
                <div
                  class="d-flex align-items-center gap-2"
                  v-if="activeNote === note.id"
                >
                  <p style="font-size: 10px">
                    {{
                      note.updated_date
                        ? calculateTimeSince(
                            note.updated_date,
                            note.updated_time
                          )
                        : calculateTimeSince(note.created_date)
                    }}
                  </p>
                  <NuxtImg
                    v-if="
                      [loggedUser.firstname, loggedUser.lastname].includes(
                        note.user_name
                      )
                    "
                    @click.stop="() => startEditNote(note)"
                    class="editgetMemberInfo"
                    role="button"
                    src="/images/svg/edit-icon.svg"
                    style="margin-bottom: 15px; height: 20px"
                    provider="none"
                  />
                </div>
              </div>
            </div>
            <div v-if="activeNote === note.id">
              <div class="notes d-flex">
                <h3 style="font-size: 14px; font-weight: bold">
                  {{ note.user_name }} &nbsp;
                </h3>
                <span style="font-size: 10px; margin-top: 3px">
                  {{
                    note.updated_date
                      ? calculateTimeSince(note.updated_date, note.updated_time)
                      : calculateTimeSince(note.created_date)
                  }}</span
                >
              </div>
              <div class="description">
                <p>{{ note.description }}</p>
              </div>
              <div v-show="isEditingNote(note.id)">
                <div class="d-flex justify-content-end gap-2 mb-2">
                  <div
                    class="goBackShowMode"
                    data-show="personal-show"
                    @click="handleEdit"
                  >
                    Update
                  </div>
                  <div
                    class="goBackShowMode"
                    data-show="personal-show"
                    @click="cancelEdit"
                  >
                    Cancel
                  </div>
                </div>

                <FormKit
                  type="text"
                  placeholder="Edit a note title "
                  v-model="editingState.heading"
                  class="custom-input"
                  style="background-color: white; padding-right: 80px"
                />
                <FormKit
                  type="text"
                  placeholder="Edit a note description "
                  v-model="editingState.description"
                  class="custom-input"
                  style="background-color: white; padding-right: 80px"
                />
              </div>
              <div v-if="note.reply && note.reply.length">
                <div
                  v-show="!isEditingReply(note.id, response?.id)"
                  class="reply-container"
                >
                  <MemberCommonReply
                    class="replies group-hover"
                    v-for="reply in note.reply"
                    :reply="reply"
                    :key="reply.id"
                    @reload="refresh"
                  />
                </div>
              </div>

              <div v-show="isEditingReply(note.id, response?.id)"></div>
              <FormKit
                type="form"
                :id="`replyid-${note.id}`"
                :modelValue="selectedPackage"
                @submit="submitReplayHandler"
                :actions="false"
                #default="{ value }"
              >
                <div style="position: relative">
                  <FormKit
                    type="text"
                    name="reply"
                    placeholder="Write a reply "
                    class="custom-input"
                    :value="userReply"
                    style="background-color: white; padding-right: 80px"
                  />
                  <FormKit name="notes_id" type="hidden" :value="note.id" />
                  <FormKit
                    name="user_id"
                    type="hidden"
                    :value="loggedUser.id"
                  />
                  <button
                    type="submit"
                    style="
                      border: none;
                      background: none;
                      position: absolute;
                      right: 10px;
                      top: 50%;
                      transform: translateY(-50%);
                      z-index: 2;
                    "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                  <g id="Group_2425" data-name="Group 2425" transform="translate(-524 -493)">
                    <path id="Icon_material-send" data-name="Icon material-send" d="M3.01,21.684l20.038-8.592L3.01,4.5,3,11.183l14.32,1.909L3,15Z" transform="translate(531 499.5)" fill="#84ceff"/>
                    <rect id="Rectangle_1422" data-name="Rectangle 1422" width="40" height="40" transform="translate(524 493)" fill="#fff" opacity="0"/>
                  </g>
                </svg>
                  </button>
                </div>
              </FormKit>
            </div>
          </div>
          <div class="px-5"></div>
        </FormKit>
      </div>
      <!-- v-model="showStoreForm" -->
      <div class="add-notes">
        <Modal v-model="showStoreForm" id="store-modal">
          <template #title> New Note </template>
          <FormMemberNotes
            @reload="refresh"
            @close-canvas="showStoreForm = false"
            v-if="showStoreForm"
            :getCurrentMemberInfo="getCurrentMemberInfo"
            :loggedUser="loggedUser"
          />
        </Modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { useTimeSince } from "~/composables/useTime";
import { reset } from "@formkit/core";
const { $toast } = useNuxtApp();
const { calculateTimeSince } = useTimeSince();
const { loggedUser, currentUserType } = useAuthStore();
const showStoreForm = ref(false);
const userReply = ref("");
const searchTerm = ref();
const selectedFilter = ref("recently");
const activeNote = ref(null);
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});
const { memberId } = toRefs(props);
const route = useRoute();
const { setBreadcrumbTab } = useBreadcrumb();

import { useBreadcrumbStore } from "~/store/breadcrumb";
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Profiles", link: "" },
    { label: "Notes", link: "" },
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
const {
  data: memberInfoData,
  pending: membersPending,
  refresh,
} = await useCustomFetch<any>("/members/get/memberinfo", {
  method: "POST",
  body: { facility_id: currentUserType?.id, member_id: props.memberId },
});

const getMemberInfo = computed(() => {
  if (!memberInfoData.value?.member?.notes) {
    return [];
  }

  let filteredNotes = memberInfoData.value.member.notes
    .filter((note) => note != null)
    .filter((note) => {
      if (!searchTerm.value || searchTerm.value.trim() === "") {
        return true;
      }
      return note.header.toLowerCase().includes(searchTerm.value.toLowerCase());
    });

  // Apply sorting based on the selected filter
  if (selectedFilter.value === "newest" || selectedFilter.value === "oldest1") {
    // Sort by created_date
    filteredNotes.sort((a, b) => {
      const dateA = new Date(a.created_date),
        dateB = new Date(b.created_date);
      return selectedFilter.value === "newest" ? dateB - dateA : dateA - dateB;
    });
  } else if (
    selectedFilter.value === "recently" ||
    selectedFilter.value === "oldest"
  ) {
    
    filteredNotes.sort((a, b) => {
      // Combine date and time into a single date object for comparison
      const dateTimeA = new Date(`${a.updated_date}T${a.updated_time}`);
      const dateTimeB = new Date(`${b.updated_date}T${b.updated_time}`);
      return selectedFilter.value === "recently"
        ? dateTimeB - dateTimeA
        : dateTimeA - dateTimeB;
    });
  }

  return filteredNotes.map((note) => ({
    id: note.id,
    title: note.header,
    description: note.description,
    user_id: note.user_id,
    user_name: note.user_name,
    created_date: note.created_date,
    updated_date: note.updated_date,
    updated_time: note.updated_time,
    reply: note.reply ? note.reply.filter((r) => r !== null) : [],
  }));
});

const getCurrentMemberInfo = computed(() => {
  if (!memberInfoData.value?.member?.data) {
    return null;
  }
  return memberInfoData.value.member.data.find(
    (member) => member.id === props.memberId
  );
});

function formatName(string) {
  if (!string) return '';
  const words = string.split(' ');
  const capitalizedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
}
const defaultValue = () => ({
  notes_id: null,
  replyId: null,
  heading: null,
  description: null,
});
const editingState = ref(defaultValue());

const startEditNote = (note) => {
  const notes_id = note.id;
  console.log(note, "note");
  editingState.value = {
    notes_id,
    heading: note.title,
    description: note.description,
  };
};

const toggleNote = (noteId) => {
  if (activeNote.value === noteId) {
    // If the note is already active, close it
    activeNote.value = null;
  } else {
    // Open the clicked note and close others
    activeNote.value = noteId;
  }
};

// Initialize the first note as active on component mount
onMounted(() => {
  if (getMemberInfo.value.length > 0) {
    activeNote.value = getMemberInfo.value[0].id; // Set the first note as active
  }
});


const cancelEdit = () => {
  editingState.value = defaultValue();
};

const isEditingNote = (notes_id) => {
  return (
    editingState.value.notes_id === notes_id && !editingState.value.replyId
  );
};

const isEditingReply = (notes_id, replyId) => {
  return (
    editingState.value.notes_id === notes_id &&
    editingState.value.replyId === replyId
  );
};

const handleEdit = async () => {
  try {
    const { data } = await useCustomFetch<any>("/members/update/notes", {
      method: "POST",
      body: {
        ...editingState.value,
        facility_id: currentUserType?.id,
      },
    });
    await refresh();
    cancelEdit();
    $toast(data.value.message);
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};

const submitReplayHandler = async (packageData) => {
  console.log(packageData);
  try {
    const { data } = await useCustomFetch<any>("/members/add/notesreply", {
      method: "POST",
      body: {
        ...packageData,
        facility_id: currentUserType?.id,
      },
    });
    await refresh();
    packageData.reply = "";
    reset(`replyid-${packageData.notes_id}`);
    $toast(data.value.message);
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};

const onSearch = (data: string) => {
  searchTerm.value = data;
};

const createdFiltersActive = ref(true);
const updatedFiltersActive = ref(true);
const selectFilter = (filterType) => {
  selectedFilter.value = filterType;

  // Determine filter group based on the selected filter
  if (["newest", "oldest1"].includes(filterType)) {
    // Created filters selected, disable Updated filters
    createdFiltersActive.value = true;
    updatedFiltersActive.value = false;
  } else if (["recently", "oldest"].includes(filterType)) {
    // Updated filters selected, disable Created filters
    updatedFiltersActive.value = true;
    createdFiltersActive.value = false;
  }
};
</script>
<style lang="scss" scoped>
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

.search {
  position: relative;
  top: 7px;
}
.content-box .FormMemberNotes {
  padding: 0;
}
.update-notes {
  margin-top: 10px;
}
.textarea {
  position: relative;
  width: 900px;
  padding: 16px;
  color: #000;
  font-size: 0.875rem;
  line-height: 1.15;
  border: 1px solid #f2faff;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  background: #f2faff;
  margin-bottom: 30px;
}
.no-notes {
  position: relative;
  width: 900px;
  height: 400px;
  padding: 16px;
  color: #000;
  font-size: 0.875rem;
  line-height: 1.15;
  border: 1px solid #f2faff;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  background: #f2faff;
  margin-bottom: 30px;
}

.content-filters {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.goBackShowMode {
  font: 14px "Poppins Regular", sans-serif, Arial;
  cursor: pointer;
  padding: 5px 12px;
  border: 1.5px solid #84ceff;
  border-radius: 5px;
  background: 0 0;
  transition: 0.35s;
  width: 80px;
}

.reply-container {
  max-height: 300px;
  overflow: auto;
  margin: 30px 0;
}
.filter-box {
  display: flex;
  justify-content: end;
  margin-top: 10px;
  align-items: center;
  gap: 10px;
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
  height: 40px;
}
</style>
