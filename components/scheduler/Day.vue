<template>
  <div class="schedule-day" v-if="schedule">
    <div class="header d-flex align-items-center gap-4 py-2 mb-2">
      <div
        style="
          min-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >
        {{ isToday(dates.start) }} | {{ schedule.start_time }} -
        {{ schedule.end_time }}
        <h2
          style="
            margin-top: 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ schedule.class_name }} | {{ getLabelById(schedule.discipline_id) }}
        </h2>
      </div>
      <div class="coaches d-flex align-items-center w-full">
        <div
          class="d-flex align-items-center gap-2"
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
            style="margin-bottom: 10px"
            v-if="schedule.coach.length === 1"
            label="Add Coach"
            @click="showCoach = true"
            size="lg"
            :disabled="isBookingDisabled(schedule.start_time)"
          />
        </div>
      </div>
      <ul class="info">
        <li>
          <h3>{{ schedule.injured }}</h3>
          Need Attention
        </li>
        <li>
          <h3>{{ schedule.first_timer }}</h3>
          First Timer
        </li>
        <li>
          <h3>{{ schedule.cancelled }}</h3>
          Canceled
        </li>
        <li class="flex-column" style="margin-right: 20px">
          Booked<br />
          <div class="d-flex alig-items-center" style="line-height: 38px"> 
            <h3>{{ schedule.nonNullMemberCount }}/</h3>
            {{}}
            <span class="fs-6">{{ schedule.capacity }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="many-coaches" v-if="schedule.coach.length > 1">
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
          v-if="!isBookingDisabled(schedule.start_time)"
          label="Add Coach"
          @click="showCoach = true"
          size="lg"
        />
      </div>
    </div>

    <div class="memebers d-flex flex-wrap">
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
          <NuxtImg class="profile-image" :src="getImageUrl(member.img_src)" />
          <div class="hover-wrapper">
        <div
          class="hover-info"
          :class="{ 'is-visible': isHovering }"
          @mouseover="isHovering = true"
          @mouseleave="isHovering = false"
        >
      <a   :href="`/members/${member.id}/membership-overview`" class="hover-info__link">
        <img src="~/assets/images/svg/schedule-profile-white.svg" alt="Profile icon" class="img-normal"/>
        <img src="~/assets/images/svg/schedule-profile-blue.svg" alt="Profile icon" class="img-hover" />
      </a>
      <a href="/" class="hover-info__link">
        <img src="~/assets/images/svg/schedule-chat-white.svg" alt="Chat icon" class="img-normal"/>
        <img src="~/assets/images/svg/schedule-chat-blue.svg" alt="Chat icon" class="img-hover" />
      </a>
      <div @click="cancelMember(member.id, schedule.id)"  class="hover-info__link">
        <img src="~/assets/images/svg/schedule-cancel-white.svg" alt="Cancel icon" class="img-normal"/>
        <img src="~/assets/images/svg/schedule-cancel-blue.svg" alt="Cancel icon" class="img-hover" />
      </div>
    </div>
  </div>

          <div
            v-if="member.type === 'normal'"
            ty
            class="d-flex flex-column gap-0"
            style="width: 200px"
          >
            <div class="text-white fw-bold" v-if="member.firsttimer === 'Yes'">
              First Timer
            </div>
            <div class="fs-4 fw-semibold">
              {{ formatName(member.firstname) }}
              {{ formatName(member.lastname) }}
            </div>
            <div>
              {{ member.days_left }}
            </div>
          </div>
          <div v-else class="d-flex flex-column gap-0" style="width: 298px">
            <div class="text-white fw-bold" v-if="member.firsttimer === 'Yes'">
              First Timer
            </div>
            <div class="fs-4 fw-semibold">
              {{ formatName(member.firstname) }} 
              {{ formatName(member.lastname) }}
            </div>
            <div>
              {{ member.days_left }}
            </div>
          </div>
        </div>
      </div>
      <MixButton
        v-if="
          !isBookingDisabled(schedule.start_time) &&
          !isCapacityReached(schedule.nonNullMemberCount, schedule.capacity)
        "
        size="lg"
        @click="showMemberModal('member')"
        label="Book Member"
      />
      <!-- <MixButton size="lg" @click="showMemberModal('member')" label="Book Member"
       :disabled="isBookingDisabled(schedule.start_time) || isCapacityReached ( schedule.nonNullMemberCount ,schedule.capacity)" /> -->
    </div>
    <ModalExpandable
      v-model="showMember"
      id="day-member-modal"
      v-model:showSubModal="isAddNewMember"
    >
      <template #sub-modal>
        <SchedulerAddMember @close-sidebar="isAddNewMember = false" />
      </template>
      <template #title>
        <div class="d-flex justify-content-between">
          Member Search<MixBtnGroup
            style="font-size: 11px"
            v-model="memberSort"
            :labels="['A-Z', 'Z-A']"
          />
        </div>
        <FormKit
          type="text"
          v-model="memberText"
          placeholder="Search member or Tags"
        />
        <!-- <MixButton
          label="Add New"
          size="lg"
          style="font-size: 22px; margin-left: -22px"
          @click="isAddNewMember = true"
        /> -->
        <div class="addNewMember" @click="isAddNewMember = true">
          <img
            class="plusIcon"
            src="~/assets/images/svg/plus-icon.svg"
            alt="Plus icon"
          />
          Add New
        </div>
       <p style="font-size: 14px; color: red;">{{ capacityMessage }}</p> 
      </template>
      <div>
            <SchedulerMemberCard
      v-for="member in membersData.members
        .filter(member => member.membership_status === 'Active')
        .filter(member => {
          const searchTermLower = memberText.toLowerCase(); // Replicate the working logic
          const matchesName = member.firstname?.toLowerCase().includes(searchTermLower) ||
                              member.lastname?.toLowerCase().includes(searchTermLower);
          const matchesTag = member.tags?.some(tagId => { 
            const tag = tags?.find(t => t.id === tagId); 
            return tag ? tag.name.toLowerCase().includes(searchTermLower) : false;
          }) || false; // Default to false if no tags
          console.log(matchesTag)
          return matchesName || matchesTag;
        })
        .sort((a, b) => {
          return memberSort === 1 
            ? a.firstname.localeCompare(b.firstname) 
            : b.firstname.localeCompare(a.firstname);
        })"
      :key="member.id"
      :member="member"
      @click.prevent="onSelectMember(member.id)"
      :class="{ active: selectedMember.includes(member.id) }"
    />
      </div>
      <template #footer>
        <div class="d-flex justify-content-center">
          <MixButton
            label="Save"
            style="border: 1px solid #84ceff; width: 300px"
            :disableIcon="true"
            @click="bookMember"
          />
        </div>
      </template>
    </ModalExpandable>
    <ModalExpandable v-model="showCoach" id="day-coach-modal">
      <template #title>
        <div class="d-flex justify-content-between">
          Coach Search<MixBtnGroup
            style="font-size: 11px"
            v-model="coachSort"
            :labels="['A-Z', 'Z-A']"
          />
        </div>
        <FormKit type="text" v-model="coachText" placeholder="Search coach" />
      </template>
      <div v-if="coachData && coachData.coaches">
        <SchedulerMemberCard
          :member="coach"
          v-for="coach in coachData.coaches
            .filter((item) => item)
            .filter((item) => item.status === 'Available')
            .filter(
              (coach) =>
                coach.firstname
                  .toLowerCase()
                  .includes(memberText.toLowerCase()) ||
                coach.lastname.toLowerCase().includes(coachText.toLowerCase())
            )
            .sort((a, b) =>
              coachSort === 1
                ? a.firstname.localeCompare(b.firstname)
                : b.firstname.localeCompare(a.firstname)
            )"
          :key="coach.id"
          @click="onSelectCoach(coach.id)"
          :class="{ active: selectedCoach === coach.id }"
        />
      </div>
      <template #footer>
        <div class="d-flex justify-content-center">
          <MixButton
            label="Save"
            style="border: 1px solid #84ceff; width: 300px"
            :disableIcon="true"
            @click="assignCoach"
          />
        </div>
      </template>
    </ModalExpandable>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useEventBus } from "@vueuse/core";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";

const { getUrl: getImageUrl } = useBoImage();
const bus = useEventBus<boolean>("reload-days");

const { currentUserType } = useAuthStore();
const { $toast } = useNuxtApp();
const showMember = ref(false);
const showCoach = ref(false);
const { tags } = storeToRefs(useTagStore());

const selectedMember = ref([]);
const selectedCoach = ref();
const memberSort = ref(1);
const coachSort = ref(1);
const memberText = ref("");
const coachText = ref("");
const isAddNewMember = ref(false);
const isHovering = ref(false)
const capacityMessage = ref('');
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
        'Content-Type': 'application/json',
      },
    });
    bus.emit(true)
    if (data.value.success) { 
      $toast("Membership cancellation successful!");
      
    } else {
      $toast(data.value.message); // Show error message from API
    }
  } catch (err) {
    console.error("Error:/api/cancel/member", err);
    $toast("An error occurred while cancelling the membership.");
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

  return isToday ? "Today" : dateString;
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
    capacityMessage.value = ''; // Clear message when a member is deselected
  } else {
    if (selectedMember.value.length < props.schedule.capacity - props.schedule.nonNullMemberCount) {
      selectedMember.value.push(id);
      capacityMessage.value = ''; // Clear message when a member is successfully added
    } else {
      capacityMessage.value = 'Capacity has been reached. Cannot add more members.'; // Set the message when capacity is reached
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

const bookMember = async () => {
  // Calculate the total expected member count after booking the selected members
  // const totalExpectedMemberCount = props.schedule.nonNullMemberCount -selectedMember.value.length;
  const totalExpectedMemberCount = props.schedule.nonNullMemberCount - props.schedule.capacity;

  // Check if the total expected count exceeds the capacity
  if (selectedMember.value.length && totalExpectedMemberCount <= props.schedule.capacity) {
    console.log(selectedMember.value.length, props.schedule.nonNullMemberCount, props.schedule.capacity);
    try {
      const { data } = await useCustomFetch<any>("/calendar/book/member", {
        method: "POST",
        body: JSON.stringify({ // Ensure to stringify the body and set the correct headers if not handled inside `useCustomFetch`
          facility_id: currentUserType?.id,
          member_id: selectedMember.value,
          calendar_schedule_id: props.schedule.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!data.value.return) {
        $toast.error(data.value.message);
      } else {
        $toast("Member added successfully!");
        showMember.value = false;
        selectedMember.value = [];
        bus.emit(true); // Assuming this refreshes the member list or similar
      }
    } catch (error) {
      console.error("Error booking member:", error);
      $toast("Member is not added!");
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
        $toast.error(data.value.message);
      } else {
        $toast("Coach added successfully!");
        selectedCoach.value = undefined;
        showCoach.value = false;
        bus.emit(true);
      }
    } catch {
      $toast("Coach is not added!");
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

watch(showMember, (val) => {
  isAddNewMember.value = false;
});
watch(() => showMember.value, (newVal, oldVal) => {
  // If the modal is being opened (showMember becomes true)
  if (newVal === false) {
    // Clear the selected members
    selectedMember.value = [];
    capacityMessage.value = "";
    
  }
});
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
    gap: 8px;
    align-items: center;
    gap: 18px;
    li {
      display: flex;
      align-items: center;
      max-width: 64px;
      font-size: 11px;
      line-height: 12px;
      gap: 8px;
      h3 {
        margin: 0px;
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
    box-shadow: 0 10px 20px rgba(0,0,0,.16);
    background-color: #fff;
    border-radius: 50%;
    transition: .35s;
    position: relative;
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
    display: block; /* Show blue images on hover */
}


}
.card {
  height: 131px;
  width: 398px;
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

</style>