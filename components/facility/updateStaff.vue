<template>
  <div class="sidebar-box">
    <div
      class="image-box"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <div class="hover-wrapper">
        <div class="hover-info">
          <a
            class="hover-info__link"
            @click="
              router.push({
                path: '/members/details/membership-overview',
                query: { id: getMemberImage.id },
              })
            "
          >
            <img
              src="~/assets/images/svg/schedule-profile-white-outline.svg"
              alt="Profile icon"
              class="img-normal"
            />
            <img
              src="~/assets/images/svg/schedule-profile-blue.svg"
              alt="Profile icon"
              class="img-hover"
            />
          </a>
          <a class="hover-info__link-1">
            <img
              src="~/assets/images/svg/schedule-chat-white-outline.svg"
              alt="Chat icon"
              class="img-normal"
            />
            <img
              src="~/assets/images/svg/schedule-chat-blue.svg"
              alt="Chat icon"
              class="img-hover"
            />
          </a>
          <div href="" class="hover-info__link-1">
            <img
              src="~/assets/images/svg/schedule-cancel-white-outline.svg"
              alt="Cancel icon"
              class="img-normal"
            />
            <!-- <img src="~/assets/images/svg/schedule-cancel-blue.svg" alt="Cancel icon" class="img-hover" /> -->
          </div>
        </div>

        <a class="sidebar-box__title text-center" title="View membership">
          <div class="d-flex justify-content-center">
            <!-- <img v-if=" getStaffInfo.image"
           :src="getImageUrl(getStaffInfo.image )"
           /> -->
            <div v-if="staffInfoData">
              <img
                v-if="!imageError && getStaffImage.image"
                :src="getImageUrl(getStaffImage.image)"
                @error="imageError = true"
                v-show="!imageError"
              />

              <div v-else class="avatar-initials content-title-bold">
                {{ formatName(getStaffInfo?.firstname?.charAt(0))
                }}{{ formatName(getStaffInfo?.lastname?.charAt(0)) }}
              </div>
            </div>
          </div>
          <h2 class="content-title-bold editUserName">
            {{ formatName(getStaffInfo.firstname) }}
            {{ formatName(getStaffInfo.lastname) }}
          </h2>
        </a>
        <p
          style="
            font-size: 14px;
            text-align: center;
            position: relative;
            bottom: 25px;
            margin-bottom: 10px;
          "
        >
          {{ getStaffInfo.role }} - Reset Fitness JIP
        </p>
      </div>
    </div>

    <div class="update-member" style="margin-top: 50px">
      <FormKit
        class="formEditMember"
        type="form"
        :modelValue="getStaffInfo"
        @submit="editStaff"
        :actions="false"
      >
        <div class="row">
          <div class="col-2 small-title-bold" style="margin-top: -10px">
            <B>Role</B>
          </div>
          <div
            @click="() => startEdit('isSelectEditMode')"
            class="col-10 custom-multiselect-container mt-2 mb-4"
            style="height: 40px"
          >
            <FormKit
              type="multiselect"
              label="roles"
              name="role_id"
              placeholder="Roles"
              openDirection="bottom"
              validation="required"
              :options="staffRoles"
            />
          </div>
        </div>
        <div
          v-show="!toggleStates.isPersonalEditMode.value"
          class="personal-show data-block-show"
        >
          <h3 class="small-title-bold">
            Personal
            <img
              @click="() => startEdit('isPersonalEditMode')"
              class="editgetMemberInfo"
              data-edit="personal-edit"
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>
          <div>
            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/female.svg"
                alt="Female icon"
              />
              <span class="showUserGender">{{ getStaffInfo.gender }} </span>
            </div>

            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/birthday.svg"
                alt="Birthday icon"
              />
              <span class="showUserBirthday">{{ getStaffInfo.dob }}</span>
            </div>

            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/phone.svg"
                alt="Phone icon"
              />
              <span class="showPhoneNumber"
                >{{ getStaffInfo.country_code }}
                {{ getStaffInfo.contactno }}</span
              >
            </div>

            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/email.svg"
                alt="Email icon"
              />
              <span class="showUserEmail">{{ getStaffInfo.email }}</span>
            </div>
          </div>
        </div>

        <div
          v-show="toggleStates.isPersonalEditMode.value"
          class="personal-edit data-block-edit"
        >
          <h3 class="small-title-bold">
            Personal
            <div
              class="goBackShowMode"
              data-show="personal-show"
              @click="() => cancelEdit('isPersonalEditMode')"
            >
              Cancel
            </div>
          </h3>
          <FormKit
            type="uppy"
            label="Upload Image"
            name="image"
            :targetHeight="100"
            :targetWidth="100"
            :hideUploadButton="true"
            help="Max image size: 960x540px, 1MB. Format: .jpg or .png"
          />
          <div style="height: 74px" class="custom-multiselect-gender">
            <FormKit
              type="multiselect"
              mode="single"
              placeholder="Please select  gender"
              name="gender"
              :options="['Female', 'Male', 'Prefer not to say']"
              validation="required"
              :validation-messages="{
                required: 'Gender is required',
              }"
            />
          </div>

          <FormKit
            type="date"
            name="dob"
            label="Birthday"
            validation="required"
            validation-visibility="live"
            :validation-messages="{
              required: 'Date of Birth is required',
            }"
          />

          <div class="row g-2" style="height: 94px">
            <div class="col-6">
              <FormKit
                type="multiselect"
                name="country_code"
                :options="CountryCodes"
                placeholder="Country code"
                validation="required"
                :validation-messages="{
                  required: 'Country code is required',
                }"
              />
            </div>
            <div class="col-6">
              <FormKit
                type="tel"
                name="contactno"
                placeholder="Phone number"
                validation="required|number|"
                :validation-messages="{
                  required: 'Phone number is required.',
                  number: 'Phone number must be numeric.',
                }"
              />
            </div>
          </div>
          <div style="height: 74px">
            <FormKit
              type="email"
              name="email"
              validation="required|email|"
              validation-visibility="live"
              placeholder="Email"
              :validation-messages="{
                required: 'Email is required',
              }"
            />
          </div>
        </div>

        <div
          v-show="!toggleStates.isSocialEditMode.value"
          class="social-show data-block-show"
        >
          <h3 class="small-title-bold mt-2">
            Social
            <img
              @click="() => startEdit('isSocialEditMode')"
              class="editgetMemberInfo"
              data-edit="social-edit"
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>

          <div class="social-show__icons">
            <a :href="getStaffInfo.facebook">
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/facebook.svg"
                  alt="Phone icon"
                />
                Facebook
              </div>
            </a>
            <a :href="getStaffInfo.instagram">
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/instagram.svg"
                  alt="Instagram icon"
                />
                Instagram
              </div>
            </a>
            <a :href="getStaffInfo.linkedin">
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/linkedin.svg"
                  alt="Linkedin icon"
                />
                Linkedin
              </div>
            </a>
          </div>
        </div>

        <div
          v-show="toggleStates.isSocialEditMode.value"
          class="social-edit data-block-edit"
        >
          <h3 class="small-title-bold">
            Social
            <div
              class="goBackShowMode"
              data-show="social-show"
              @click="() => cancelEdit('isSocialEditMode')"
            >
              Cancel
            </div>
          </h3>
          <FormKit type="text" placeholder="Facebook" name="facebook" />
          <FormKit type="text" placeholder="instagram" name="instagram" />
          <FormKit type="text" placeholder="Linkedin" name="linkedin" />
        </div>

        <div
          v-show="!toggleStates.isAboutEditMode.value"
          class="about-show data-block-show"
        >
          <h3 class="small-title-bold">
            About
            <img
              @click="() => startEdit('isAboutEditMode')"
              class="editgetMemberInfo"
              data-edit="about-edit"
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>
          {{ getStaffInfo.about }}
          <div class="icon-text showMemberAbout"></div>
        </div>

        <div
          v-show="toggleStates.isAboutEditMode.value"
          class="about-edit member-edit-box data-block-edit"
        >
          <h3 class="small-title-bold">
            About
            <div
              class="goBackShowMode"
              data-show="about-show"
              @click="() => cancelEdit('isAboutEditMode')"
            >
              Cancel
            </div>
          </h3>

          <FormKit type="text" placeholder="About" name="about" />
        </div>

        <div
          v-show="!toggleStates.isEmergencyEditMode.value"
          class="emergency-show data-block-show"
        >
          <h3 class="small-title-bold">
            Emergency
            <img
              @click="() => startEdit('isEmergencyEditMode')"
              class="editgetMemberInfo"
              data-edit="emergency-edit"
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>
          <div class="d-flex items-align-center justify-content-between">
            <div style="width: 150px">
              {{ getStaffInfo.emergency_contact_name }}
            </div>
            <div>
              <span style="">
                {{ getStaffInfo.emergency_country_code }}
                {{ getStaffInfo.emergency_contact_no }}</span
              >
            </div>
          </div>
          <div class="icon-text showMemberemergeny"></div>
        </div>

        <div
          v-show="toggleStates.isEmergencyEditMode.value"
          class="emergency-edit member-edit-box data-block-edit"
        >
          <h3 class="small-title-bold">
            Emergency
            <div
              class="goBackShowMode"
              data-show="emergency-show"
              @click="() => cancelEdit('isEmergencyEditMode')"
            >
              Cancel
            </div>
          </h3>
          <FormKit
            type="text"
            placeholder="Emergency contact name"
            name="emergency_contact_name"
            v-model="emergencyContactName"
              :validation="
                emergencyCountryCode || emergencyContactNo ? 'required' : ''
              "
              :validation-messages="{
                required: 'Emergency contact name is required',
              }"
          />

          <div class="row g-2">
            <div class="col-6">
              <FormKit
                type="multiselect"
                name="emergency_country_code"
                :options="CountryCodes"
                placeholder="Country code"
                v-model="emergencyCountryCode"
                :validation="
                  emergencyContactName || emergencyContactNo ? 'required' : ''
                "
                :validation-messages="{
                  required: 'Emergency country code is required',
                }"
              />
            </div>
            <div class="col-6">
              <FormKit
                type="tel"
                placeholder="Contact Number"
                name="emergency_contact_no"
                v-model="emergencyContactNo"
                :validation="
                  emergencyContactName || emergencyCountryCode ? 'required' : ''
                "
                :validation-messages="{
                  required: 'Emergency contact number is required',
                }"
              />
            </div>
          </div>
        </div>

        <FormKit type="submit" label="Save" v-show="isAnyEditModeActive" />
      </FormKit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useTagStore } from "@/store/tag";
import { useCountryStore } from "@/store/countrycode";
import { useRoleStore } from "@/store/roles";
import { storeToRefs } from "pinia";
const { $toast } = useNuxtApp();
const router = useRouter();
const emit = defineEmits(["reload", "update:categoryData", "close-sidebar"]);
const props = defineProps({
  staffId: {
    type: String,
    default: "1",
  },
});

const { staffId } = toRefs(props);
const staffInfoPending = ref(false);
const staffInfoData = ref(1);
const StaffId = ref("1");
const { tags } = storeToRefs(useTagStore());
const { currentUserType } = useAuthStore();
const { getUrl: getImageUrl } = useBoImage();
const { CountryCodes } = useCountryStore();
const { staffRoles } = useRoleStore();
const imageError = ref(false);

// New Variables
const emergencyContactName = ref();
const emergencyCountryCode = ref();
const emergencyContactNo = ref();

type ToggleStates = {
  isSelectEditMode: Ref<boolean>;
  isImageEditMode: Ref<boolean>;
  isPersonalEditMode: Ref<boolean>;
  isSocialEditMode: Ref<boolean>;
  isAboutEditMode: Ref<boolean>;
  isEmergencyEditMode: Ref<boolean>;
  isTagsEditMode: Ref<boolean>;
};

const toggleStates: ToggleStates = {
  isSelectEditMode: ref(false),
  isImageEditMode: ref(false),
  isPersonalEditMode: ref(false),
  isSocialEditMode: ref(false),
  isAboutEditMode: ref(false),
  isEmergencyEditMode: ref(false),
  isTagsEditMode: ref(false),
};

onMounted(async () => {
  await getStaff();
});

// async function fetchStaffInfo() {
//   const effectiveStaffId = staffId.value || StaffId.value; // Use staffId if it exists, otherwise fallback to StaffId
//   console.log("Fetching data for staff ID:", effectiveStaffId); // To check which ID is being used

//   try {
//     const { data, pending } = await useCustomFetch('/staff/get/staffinfo', {
//       method: 'POST',
//       body: JSON.stringify({
//         facility_id: currentUserType?.id,
//         staff_id: effectiveStaffId, // Pass the effectiveStaffId here
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     staffInfoData.value = data.value;
//   } catch (error) {
//     console.error('Error fetching staff information:', error);
//   }
// }

function formatName(string) {
  if (!string) return "";
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(" ");
}
const isAnyEditModeActive = computed(() => {
  const isActive = Object.values(toggleStates).some((state) => state.value);
  console.log("Edit Mode Active:", isActive);
  return isActive;
});

const startEdit = (toggleKey: keyof ToggleStates) => {
  toggleStates[toggleKey].value = true;
};

const cancelEdit = (toggleKey: keyof ToggleStates) => {
  toggleStates[toggleKey].value = false;
};

const editStaff = async (getStaffInfo: any) => {
  try {
    const { id, role, ...staffInfoWithoutId } = getStaffInfo;
    console.log(getStaffInfo);
    const { data } = await useCustomFetch<any>("/staff/update/staff", {
      method: "POST",
      body: {
        staff_id: getStaffInfo.id,
        facility_id: currentUserType?.id,
        ...staffInfoWithoutId,
      },
    });

    if (data.value.return) {
      emit("reload");
      getStaff();
      $toast.success("Staff  edited successfully!");
      emit("close-sidebar");
      Object.keys(toggleStates).forEach((key) => {
        toggleStates[key].value = false;
      });
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/Staff/update", err);
  }
};

const getStaff = async () => {
  const effectiveStaffId = staffId.value || StaffId.value;
  try {
    const response = await useCustomFetch(`/staff/get/staffinfo`, {
      method: "POST",
      body: { facility_id: currentUserType?.id, staff_id: effectiveStaffId },
    });
    if (response.data && response.data.value) {
      staffInfoData.value = response.data.value;
    } else {
      console.error("No data returned from fetch");
    }
  } catch (error) {
    console.error("Error refreshing member data:", error);
  }
};

const getStaffImage = computed(() => {
  if (
    staffInfoData.value &&
    staffInfoData.value.staff &&
    staffInfoData.value.staff?.data
  ) {
    const staffData = staffInfoData.value.staff?.data;
    const imageUrl = `${staffData.img_src}?timestamp=${new Date().getTime()}`;

    return {
      id: staffData.id,
      image: imageUrl,
    };
  }

  return {};
});
const getStaffInfo = computed(() => {
  // Ensure staffInfoData.value exists and has the 'staff' and 'data' properties.
  const staffData = staffInfoData.value?.staff?.data;
  const socialData = staffInfoData.value?.staff?.social || {};
  const aboutData = staffInfoData.value?.staff?.about || {};
  const emergencyContactData = staffInfoData.value?.staff
    ?.emergency_contact || {
    contact_name: "",
    contact_no: "",
    country_code: "",
  };

  // If staffData is falsy (null, undefined, etc.), return an empty object.
  if (!staffData) {
    return {};
  }

  // Construct the staff info object with available data.
  return {
    id: staffData.id || "",
    firstname: staffData.firstname || "",
    lastname: staffData.lastname || "",
    dob: staffData.dob || "",
    gender: staffData.gender || "",
    country_code: staffData.country_code || "",
    contactno: staffData.contactno || "",
    email: staffData.email || "",
    role_id: staffData.role_id || "",
    role: staffData.role || "",
    facebook: socialData.facebook || "",
    instagram: socialData.instagram || "",
    linkedin: socialData.linkedin || "",
    about: aboutData.about || "",
    emergency_contact_name: emergencyContactData.name || "",
    emergency_contact_no: emergencyContactData.contactno || "",
    emergency_country_code: emergencyContactData.country_code || "",
    // Add other properties as needed
  };
});

// watch(
// staffId,
//   async () => {
//     if (staffId.value) {
//       const { data, pending } = await useCustomFetch<any>(
//         `/staff/get/staffinfo`,
//         {
//           method: "POST",
//           body: { facility_id: currentUserType?.id, staff_id: staffId.value },
//         }
//       );
//       staffInfoData.value = data.value;
//       staffInfoPending.value = pending.value;
//     }
//   },
//   { immediate: true }
// );
watch(
  staffId,
  async () => {
    if (staffId.value) {
      await getStaff();
    }
  },
  { immediate: true }
);
watch(
  () => getStaffImage.value.image,
  (newImage) => {
    imageError.value = false; // Reset error on any new image set
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.sidebar-box {
  max-width: 400px;
  width: 30vw;
  margin-right: 20px;
  margin-left: 20px;
  padding: 20px;

  min-height: calc(100vh - 129px);
  // height: 100vh;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.0784313725);
  border-radius: 0px 0px 0px 0px;
}
.sidebar-box__title img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 50%;
}
.sidebar-box {
  //   display: none;

  &__title {
    display: block;
    text-decoration: none;
    transition: $transitionSpeed;

    .editUserOccupation {
      color: #323a45;
    }

    .editUserName {
      transition: $transitionSpeed;
    }

    &:hover {
      .editUserName {
        color: $main-blue;
      }
    }
  }

  .sidebar-box__title {
    display: block;
    text-decoration: none;
    transition: 0.35s;
    margin-bottom: 25px;
  }

  .icon-text {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }
  .icon-text img {
    display: block;
    margin-right: 10px;
  }

  .sidebar-box__title img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50%;
  }

  .sidebar-box__title .default-avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto 10px;
  }

  .social-show__icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
  }
  .social-show__icons h3 {
    width: 100%;
  }
  .social-show__icons .icon-text {
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
  }
  .social-show__icons .icon-text img {
    margin-bottom: 10px;
    margin-right: 0;
  }
  .upload-image {
    margin: 15px 0 10px;
  }
  .image-box {
    margin-bottom: 30px;
    cursor: pointer;
  }
  .small-title-bold {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .goBackShowMode {
    font: 14px "Poppins Regular", sans-serif, Arial;
    cursor: pointer;
    padding: 5px 12px;
    border: 1.5px solid #84ceff;
    border-radius: 5px;
    background: 0 0;
    transition: 0.35s;
  }
  .data-block-show {
    margin-bottom: 30px;
  }
  .editgetMemberInfo {
    opacity: 0.4;
    cursor: pointer;
    transition: 0.35s;
  }
}
.tags {
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
.avatar-initials {
  display: flex;
  align-items: center; /* Centers the initials vertically */
  justify-content: center; /* Centers the initials horizontally */
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Makes the div circular */
  background-color: #84ceff;
  color: white; /* Example text color, change as needed */
  font-size: 22px; /* Adjust based on your design */
  font-weight: bold; /* Makes the letters a bit thicker */
  margin-bottom: 10px;
}
.hover-info {
  position: relative;
  display: flex;
  top: 210px;
  gap: 15px;
  left: 107px;
  visibility: visible; /* Initially hidden */
  // opacity: 0; /* Start fully transparent */
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
  // box-shadow: 0 10px 20px rgba(0,0,0,.16);
  background-color: #fff;
  border-radius: 50%;
  transition: 0.35s;
  position: relative;
  cursor: pointer;
}
.hover-info__link-1 {
  display: block;
  width: 35px;
  height: 35px;
  // box-shadow: 0 10px 20px rgba(0,0,0,.16);
  // background-color: #fff;
  border-radius: 50%;
  // transition: .35s;
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
  // transition: transform 0.3s ease;
}

.hover-info__link:hover .img-normal {
  display: none; /* Hide white images on hover */
}

.hover-info__link:hover .img-hover {
  display: block; /* Show blue images on hover */
}
.avatar-initials {
  display: flex;
  align-items: center; /* Centers the initials vertically */
  justify-content: center; /* Centers the initials horizontally */
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Makes the div circular */
  background-color: #84ceff; /* Example background color, change as needed */
  color: white; /* Example text color, change as needed */
  font-size: 26px; /* Adjust based on your design */
  font-weight: bold; /* Makes the letters a bit thicker */
  margin-right: 15px;
}
</style>
