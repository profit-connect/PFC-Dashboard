<template>
  <div class="schedule-day" v-if="schedule"> 
    <!-- <div class="header d-flex align-items-center justify-content-between gap-4 py-2 mb-2" > -->
      <div :class="headerClass" :style="headerStyle">
      <div
        style="
          min-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >
        <span style="position: relative; top: 10px"
          >{{ isToday(dates.start) }} | {{ schedule.start_time }} -
          {{ schedule.end_time }}</span
        >
        <p
          class="small-title-bold"
          style="
            position: relative;
            bottom: 4px;
            margin-top: 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 36px;
          "
        >
          {{ getLabelById(schedule.discipline_id) }} | {{ schedule.class_name }}
        </p>
      </div>
      <div v-if="!isSmallScreen" class="coaches d-flex align-items-center">
        <div
          class="d-flex align-items-center gap-4"
          v-if="schedule.coach.length === 1"
        >
          <NuxtImg
            :src="getImageUrl(schedule.coach[0].img_src)"
            style="height: 60px; width: 60px"
          />
          <div style="line-height: 16px">
            <strong style="font-size: 22px; margin-bottom: 2px" class="fw-bold">
              {{ formatName(schedule.coach[0].firstname) }}</strong
            >
            <br />
            <span style="font-size: 14px">
              {{ formatName(schedule.coach[0].lastname) }}</span
            >
          </div>
          <MixButton
            class="small-title-medium"
            style="margin-bottom: 10px"
            v-if="
              schedule.coach.length === 1 &&
              !isBookingDisabled(schedule.start_time)
            "
            label="Add Coach"
            @click="showCoach = true"
            size="lg"
            :disabled="isBookingDisabled(schedule.start_time)"
          />
        </div>
      </div>
      <ul class="info">
        <li>
          <p>{{ schedule.injured }}</p>
          Need Attention
        </li>
        <li>
          <p>{{ schedule.first_timer }}</p>
          First Timer
        </li>
        <li>
          <p>{{cancelledMembersCount}}</p>
          <!-- <p>{{ schedule.cancelled }}</p> -->
          Canceled
        </li>
        <li class="flex-column" style="margin-right: 20px; margin-bottom: 10px">
          Booked<br />
          <div class="d-flex alig-items-center" style="line-height: 38px">
            <p>{{ schedule.nonNullMemberCount }}/</p>
            {{}}
            <span style="font-size: 18px; margin-top: 10px">{{
              schedule.capacity
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="many-coaches"  v-if="schedule.coach.length > 1 && !isSmallScreen">
      <div class="d-flex align-items-center gap-5" style="margin-bottom: 25px">
        <div
          class="d-flex align-items-center gap-4"
          v-for="coach in schedule.coach"
          :key="coach.id"
        >
          <img
            :src="getImageUrl(coach.img_src)"
            style="height: 60px; width: 60px"
          />
          <div style="line-height: 16px">
            <strong style="font-size: 22px" class="fw-bold">
              {{ formatName(coach.firstname) }}</strong
            >
            <br />
            <div style="font-size: 14px; margin-top: 2px">
              {{ formatName(coach.lastname) }}
            </div>
          </div>
        </div>
        <!-- <MixButton label="Add Coach" @click="showCoach = true"  size="lg"
    :disabled="isBookingDisabled(schedule.start_time)" /> -->
        <MixButton
          class="small-title-medium"
          v-if="!isBookingDisabled(schedule.start_time)"
          label="Add Coach"
          @click="showCoach = true"
          size="lg"
        />
      </div>
    </div>
   
     <div class="many-coaches"  v-if="schedule.coach && isSmallScreen">
      <div class="d-flex align-items-center gap-5" style="margin-bottom: 25px">
        <div
          class="d-flex align-items-center gap-4"
          v-for="coach in schedule.coach"
          :key="coach.id"
        >
          <img
            :src="getImageUrl(coach.img_src)"
            style="height: 60px; width: 60px"
          />
          <div style="line-height: 16px">
            <strong style="font-size: 22px" class="fw-bold">
              {{ formatName(coach.firstname) }}</strong
            >
            <br />
            <div style="font-size: 14px; margin-top: 2px">
              {{ formatName(coach.lastname) }}
            </div>
          </div>
        </div>
        <MixButton
          class="small-title-medium"
          v-if="!isBookingDisabled(schedule.start_time)"
          label="Add Coach"
          @click="showCoach = true"
          size="lg"
        />
      </div>
    </div>

    <div class="members d-flex flex-wrap gap-2">
      <div
        class="card rounded px-3 py-3 m-1"
        v-for="member in schedule.members.filter((item: any) => item && item.status === 'Booked')"
        :key="member.id"
        :style="{
          backgroundColor: member.backgroundcolor,
          border: `2px solid ${member.border}`,
        }"
      >
        <div class="d-flex align-items-center gap-2">
          <div class="hover-wrapper">
            <img
              v-if="!member.imageError"
              class="profile-image"
              :src="getImageUrl(member.img_src)"
              @error="member.imageError = true"
              alt="Member Avatar"
            />
            <div v-else class="avatar-initials">
              {{ formatName(member.firstname.charAt(0))
              }}{{ formatName(member.lastname.charAt(0)) }}
            </div>

            <div class="hover-wrapper">
              <div
                class="hover-info"
                :class="{ 'is-visible': isHovering }"
                @mouseover="isHovering = true"
                @mouseleave="isHovering = false"
              >
                <!-- <a   :href="`/members/details/${member.id}/membership-overview`" class="hover-info__link"> -->
                <a
                  :href="`/members/details/membership-overview?id=${member.id}`"
                  class="hover-info__link tooltips"
                >
                  <img
                    src="~/assets/images/svg/schedule-profile-white.svg"
                    alt="Profile icon"
                    class="img-normal"
                  />
                  <img
                    src="~/assets/images/svg/schedule-profile-blue.svg"
                    alt="Profile icon"
                    class="img-hover"
                  />
                  <span class="tooltiptext">Profile</span>
                </a>
                <a href="/" class="hover-info__link tooltips">
                  <img
                    src="~/assets/images/svg/schedule-chat-white.svg"
                    alt="Chat icon"
                    class="img-normal"
                  />
                  <img
                    src="~/assets/images/svg/schedule-chat-blue.svg"
                    alt="Chat icon"
                    class="img-hover"
                  />
                  <span class="tooltiptext">Chat</span>
                </a>
                <div
                  @click="cancelMember(member.id, schedule.id)"
                  class="hover-info__link tooltips"
                >
                  <img
                    src="~/assets/images/svg/schedule-cancel-white.svg"
                    alt="Cancel icon"
                    class="img-normal"
                  />
                  <img
                    src="~/assets/images/svg/schedule-cancel-blue.svg"
                    alt="Cancel icon"
                    class="img-hover"
                  />
                  <span class="tooltiptext">Cancel</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="member.type === 'normal'"
            ty
            class="d-flex flex-column gap-0"
            style="width: 116px"
          >
            <!-- currently i have put 116 the actual width is 200 but i am adding padding 40px -->
            <div class="text-white fw-bold" v-if="member.firsttimer === 'Yes'">
              First Timer
            </div>
            <div class="fs-4 fw-semibold ml-2" style="margin-left: 20px">
              {{ formatName(member.firstname) }}
              <!-- {{ formatName(member.lastname) }} -->
            </div>
            <div style="margin-left: 20px">
              {{ member.days_left }}
            </div>
          </div>
          <div v-else class="d-flex flex-column gap-0" style="width: 256px">
            <!-- currently i have put 296 the actual width is 200 but i am adding padding 40px -->
            <div
              class="text-white fw-bold"
              style="margin-left: 20px"
              v-if="member.firsttimer === 'Yes'"
            >
              First Timer
            </div>
            <div class="fs-4 fw-semibold" style="margin-left: 20px">
              {{ formatName(member.firstname) }}
              {{ formatName(member.lastname) }}
            </div>
            <div style="margin-left: 20px">
              {{ member.days_left }}
            </div>
          </div>
        </div>
      </div>
      <div class="book_member">
        <MixButtonSchedule
          v-if="
            !isBookingDisabled(schedule.start_time) &&
            !isCapacityReached(schedule.nonNullMemberCount, schedule.capacity)
          "
          size="lg"
          @click="showMemberModal('member')"
          label="Book a &nbsp;&nbsp;Member"
        />
      </div>
      <!-- <MixButton size="lg" @click="showMemberModal('member')" label="Book Member"
       :disabled="isBookingDisabled(schedule.start_time) || isCapacityReached ( schedule.nonNullMemberCount ,schedule.capacity)" /> -->
    </div>
    <ModalExpandableSchedule
      v-model="showMember"
      id="day-member-modal"
      v-model:showSubModal="isAddNewMember"
    >
      <template #sub-modal>
        <!-- <SchedulerAddMember @close-sub-modal="isAddNewMember = false" /> -->
      </template>
      <template #title>
        <div class="d-flex justify-content-between">
          Member Search
          <!-- <MixBtnGroup
            style="font-size: 11px"
            v-model="memberSort"
            :labels="['A-Z', 'Z-A']"
          /> -->
          <MixToggleBtn
            v-model="memberSort"
            left="A-Z"
            right="Z-A"
            size="sm"
            style="font-size: 14px"
          />
        </div>
        <FormKit
          style="border-bottom-left-radius: 0px; border-top-left-radius: 0px"
          type="search"
          label="FormKit Input"
          prefix-icon="search"
          placeholder="Search member or Tags"
          v-model="memberText"
        />
        <!-- <FormKit
          type="text"
          v-model="memberText"
          placeholder="Search member or Tags"
        /> -->
        <!-- <MixButton
          label="Add New"
          size="lg"
          style="font-size: 22px; margin-left: -22px"
          @click="isAddNewMember = true"
        /> -->
        <div class="addNewMember" @click="isAddNewMember = true">
          <img
            class="plusIcon mt-2"
            src="~/assets/images/svg/plus-icon.svg"
            alt="Plus icon"
          />
          Add New
        </div>
        <p style="font-size: 14px; color: red">{{ capacityMessage }}</p>
      </template>
      <div>
        <SchedulerMemberCard
          v-for="member in membersData?.members
            .filter((member) => member && member.membership_status === 'Active')
            .filter((member) => {
              const searchTermLower = memberText.toLowerCase(); // Replicate the working logic
              const matchesName =
                member.firstname?.toLowerCase().includes(searchTermLower) ||
                member.lastname?.toLowerCase().includes(searchTermLower);
              const matchesTag =
                member.tags?.some((tagId) => {
                  const tag = tags?.find((t) => t.id === tagId);
                  return tag
                    ? tag.name.toLowerCase().includes(searchTermLower)
                    : false;
                }) || false; // Default to false if no tags
              console.log(matchesTag);
              return matchesName || matchesTag;
            })
            .sort((a, b) => {
              if (memberSort === 'A-Z') {
                return a.firstname.localeCompare(b.firstname);
              } else {
                return b.firstname.localeCompare(a.firstname);
              }
            })"
          :key="member.id"
          :member="member"
          @click.prevent="onSelectMember(member.id)"
          :class="{ active: selectedMember.includes(member.id) }"
        />
      </div>
      <template #footer>
        <div class="d-flex flex-column align-items-center justify-content-center" style="width: 910px; height: 100%; margin: auto;">
    <MixButton
        label="Save"
        style="
            background-color: #ffd500;
            width: 300px;
            margin-bottom: 0px;
            font-size: 22px;
        "
        :disableIcon="true"
        @click="bookMember"
    />
    <button @click="showMember=false" class="btn">Cancel</button>
</div>

      </template>
    </ModalExpandableSchedule>
    <ModalExpandableSchedule v-model="showCoach" id="day-coach-modal">
      <template #title>
        <div class="d-flex justify-content-between">
          Coach Search
          <!-- <MixToggleBtn
            style="font-size: 11px"
            v-model="coachSort"
            :labels="['A-Z', 'Z-A']"
          /> -->
          <MixToggleBtn
            v-model="coachSort"
            left="A-Z"
            right="Z-A"
            size="sm"
            style="font-size: 14px"
          />
        </div>
        <FormKit type="text" v-model="coachText" placeholder="Search coach" />
      </template>
      <div v-if="coachData && coachData.coaches">
        <SchedulerCoachCard
          v-for="coach in coachData?.coaches
            .filter((item) => item && item.status === 'Available')
            .filter((item) => {
              const searchTermLower = coachText.toLowerCase();
              return item.firstname?.toLowerCase().includes(searchTermLower) ||
                    item.lastname?.toLowerCase().includes(searchTermLower);
            })
            .sort((a, b) =>
              coachSort === 'A-Z' ? a.firstname.localeCompare(b.firstname)
                                  : b.firstname.localeCompare(a.firstname)
            )"
          :key="coach.id"
          @click="onSelectCoach(coach.id)"
          :class="{ active: selectedCoach === coach.id }"
          :member="coach"
      />

      </div>
      <template #footer>
        <div class="d-flex flex-column align-items-center justify-content-center" style="width: 910px; height: 100%; margin: auto;">
          <MixButton
            label="Save"
            style="
              background-color: #ffd500;
              width: 300px;
              margin-bottom: 0px;
              font-size: 22px;
            "
            :disableIcon="true"
            @click="assignCoach"
          />
          <button @click="showCoach=false" class="btn">Cancel</button>
        </div>
      </template>
    </ModalExpandableSchedule>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useEventBus } from "@vueuse/core";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";

const { getUrl: getImageUrl } = useBoImage();
const { getUrl: getUrl } = useUrl();
const bus = useEventBus<boolean>("reload-days");

const { currentUserType } = useAuthStore();
const { $toast } = useNuxtApp();
const showMember = ref(false);
const showCoach = ref(false);
const { tags } = storeToRefs(useTagStore());

const selectedMember = ref([]);
const selectedCoach = ref();
// const memberSort = ref(1);
const memberSort = ref("A-Z");
// const coachSort = ref(1);
const coachSort = ref("A-Z");
const memberText = ref("");
const coachText = ref("");
const isAddNewMember = ref(false);
const isHovering = ref(false);
const capacityMessage = ref("");
const props = defineProps({
  schedule: {
    type: Object,
    default: () => {},
  },
  dates: {
    type: Object,
    default: () => {},
  },
  disciplines: {
    type: Object,
    default: () => {},
  },
});

const cancelMember = async (member, calendarScheduleId) => {
  try {
    const { data } = await useCustomFetch<any>("/calendar/cancel/member", {
      method: "POST",
      body: JSON.stringify({
        facility_id: currentUserType?.id,
        calendar_schedule_id: calendarScheduleId,
        member_id: member,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    bus.emit(true);
    if (data.value.success) {
      $toast("Membership cancellation successful");
    } else {
      $toast(data.value.message); // Show error message from API
    }
  } catch (err) {
    console.error("Error:/api/cancel/member", err);
    // $toast.error("An error occurred while cancelling the membership.");
  }
};

function formatName(string) {
  if (!string) return "";
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(" ");
}

function isToday(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();

  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  return isToday ? "TODAY" : dateString;
}

const currentDate = ref(new Date());

const isBookingDisabled = (startTime) => {
  // Split the startTime into components
  const [hours, minutes, period] = startTime.split(/:| /);
  let hour = parseInt(hours);

  // Convert 12-hour clock to 24-hour clock format
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Create a Date object for the schedule time based on dates.start
  const scheduleDate = new Date(props.dates.start); // Assuming dates.start is in a compatible format
  scheduleDate.setHours(hour, parseInt(minutes), 0, 0);

  // Get the current date and time
  const now = new Date();

  // Check if the scheduleDate is in the past compared to the current date and time
  return now > scheduleDate;
};

const isCapacityReached = (currentCapacity: any, maxCapacity: any) => {
  return currentCapacity >= maxCapacity;
};

const onSelectMember = (id: number) => {
  if (selectedMember.value.includes(id)) {
    selectedMember.value = selectedMember.value.filter((item) => item !== id);
    capacityMessage.value = ""; // Clear message when a member is deselected
  } else {
    if (
      selectedMember.value.length <
      props.schedule.capacity - props.schedule.nonNullMemberCount
    ) {
      selectedMember.value.push(id);
      capacityMessage.value = ""; // Clear message when a member is successfully added
    } else {
      capacityMessage.value =
        "Capacity has been reached. Cannot add more members."; // Set the message when capacity is reached
    }
  }
};

const onSelectCoach = (id: number) => {
  if (selectedCoach.value === id) {
    selectedCoach.value = undefined;
  } else {
    selectedCoach.value = id;
  }
};

const showMemberModal = (type: string) => {
  showMember.value = true;
};

const { data: membersData } = await useCustomFetch<any>(
  "/members/get/members",
  {
    method: "POST",
    body: { facility_id: currentUserType?.id },
  }
);

const computedQueryCoach = computed(() => {
  return { facility_id: currentUserType?.id, date: props.dates?.start };
});
const { data: coachData } = await useCustomFetch<any>("/adminapp/get/coaches", {
  method: "POST",
  body: computedQueryCoach,
});
const cancelledMembersCount = computed(() => {
  // Check if schedule is defined and members is neither null nor undefined
  if (props.schedule && Array.isArray(props.schedule.members)) {
    // Filter members with status 'Cancelled' and return the count
    return props.schedule.members.filter(member => member && member.status === 'Cancelled').length;
  }
  return 0; // Return 0 if members are undefined or null
});

const bookMember = async () => {
  // Calculate the total expected member count after booking the selected members
  // const totalExpectedMemberCount = props.schedule.nonNullMemberCount -selectedMember.value.length;
  const totalExpectedMemberCount =
    props.schedule.nonNullMemberCount - props.schedule.capacity;

  // Check if the total expected count exceeds the capacity
  if (
    selectedMember.value.length &&
    totalExpectedMemberCount <= props.schedule.capacity
  ) {
    console.log(
      selectedMember.value.length,
      props.schedule.nonNullMemberCount,
      props.schedule.capacity
    );
    try {
      const { data } = await useCustomFetch<any>("/calendar/book/member", {
        method: "POST",
        body: JSON.stringify({
          // Ensure to stringify the body and set the correct headers if not handled inside `useCustomFetch`
          facility_id: currentUserType?.id,
          member_id: selectedMember.value,
          calendar_schedule_id: props.schedule.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!data.value.return) {
        // $toast.error(data.value.message);
        $toast.error("Member is already booked into this class");
      } else {
        $toast("Member added successfully");
        showMember.value = false;
        selectedMember.value = [];
        bus.emit(true); // Assuming this refreshes the member list or similar
      }
    } catch (error) {
      console.error("Error booking member:", error);
      $toast.error("Member is not added!");
    }
  } else {
    // This error message will now also cover the case where adding the selected members would exceed capacity
    $toast.error("Adding selected members would exceed capacity.");
  }
};

const assignCoach = async () => {
  if (selectedCoach.value) {
    try {
      const { data } = await useCustomFetch<any>("/adminapp/add/coach", {
        method: "POST",
        body: {
          facility_id: currentUserType?.id,
          coach_id: selectedCoach.value,
          schedule_id: props.schedule.id,
        },
      });
      if (!data.value.return) {
        // $toast.error(data.value.message);
        $toast.error("Coach is already assigned to this class");
      } else {
        $toast("Coach added successfully");
        selectedCoach.value = undefined;
        showCoach.value = false;
        bus.emit(true);
      }
    } catch {
      $toast.error("Coach is not added!");
    }

    ///
  } else {
    $toast.error("Please select a coach");
  }
};

function getLabelById(id) {
  const discipline = props.disciplines.find((item) => item.id === id);
  return discipline ? discipline.label : "Unknown Discipline";
}


const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const isSmallScreen = computed(() => screenWidth.value < 1712);

const headerClass = computed(() => ({
  'header': true,
  'd-flex': true,
  'align-items-center': true,
  'justify-content-between': true,
  'flex-wrap': true,
  'py-2': true,
  'mb-2': true,
}));

const headerStyle = computed(() => ({
  width: isSmallScreen.value ? '1300px' : 'auto',
}));

watch(showMember, (val) => {
  isAddNewMember.value = false;
});
watch(
  () => showMember.value,
  (newVal, oldVal) => {
    // If the modal is being opened (showMember becomes true)
    if (newVal === false) {
      // Clear the selected members
      selectedMember.value = [];
      capacityMessage.value = "";
    }
  }
);
</script>

<style lang="scss" scoped>
.schedule-day {
  .profile-image {
    width: 104px;
    height: 104px;

    border-radius: 50%;
    object-position: center;
  }
  .coaches,
  .many-coaches {
    img {
      height: 34px;
      width: 34px;
      border-radius: 50%;
      // margin-bottom: 30px;
    }
  }
  .info {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 58px;
    li {
      display: flex;
      align-items: center;
      max-width: 64px;
      font-size: 14px;
      line-height: 12px;
      gap: 8px;
      p {
        margin: 0px;
        font-size: 36px;
        font-family: "Poppins Bold";
      }
    }
  }

  .hover-info {
    position: absolute;
    display: flex;
    bottom: 2px;
    gap: 5px;
    left: 10px;
    visibility: visible; /* Initially hidden */
    opacity: 0; /* Start fully transparent */
    transition: visibility 0s, opacity 0.3s linear; /* Smooth transition for opacity */
  }

  .hover-wrapper:hover .hover-info {
    visibility: visible;
    opacity: 1;
  }

  .hover-info__link {
    display: block;
    width: 35px;
    height: 35px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
    background-color: #fff;
    border-radius: 50%;
    transition: 0.35s;
    position: relative;
    cursor: pointer;
  }

  .img-normal {
    width: 100%;
    transition: transform 0.3s ease;
  }

  .img-hover {
    display: none; /* Hide blue images initially */
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
  }

  .hover-info__link:hover .img-normal {
    display: none; /* Hide white images on hover */
  }

  .hover-info__link:hover .img-hover {
    display: block; 
  }
  .tooltips .tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: white;
  color: black;
  font-size: 10px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 20px;
  padding: 5px 8px;
  position: absolute;
  z-index: 1;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  
  /* Tooltip arrow */
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent transparent transparent; /* Arrow color matches tooltip background */
  }
}

.tooltips:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}


}
.card {
  height: 131px;
  border-radius: 10px !important;
  // width: 398px;
}


</style>

<style lang="scss">
#offcanvasModal-day-member-modal,
#offcanvasModal-day-coach-modal {
  &.offcanvas {
    width: 80% !important;
  }
}
.addNewMember {
  font: 22px $font-family-medium;
  width: 300px;
  display: flex;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  margin-right: 600px;
  margin-left: 25px;
  // padding: 20px 0px;

  .plusIcon {
    width: 50px;
    margin-left: -15px;
  }
}
.avatar-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background-color: #84ceff;
  color: white;
  font-size: 36px;
  font-weight: bold;
  /* Add other styling as needed */
}
.book_member {
  display: flex;
  height: 131px;
  width: 260px;
}
</style>
