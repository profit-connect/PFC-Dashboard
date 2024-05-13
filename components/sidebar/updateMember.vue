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
            class="hover-info__link tooltips"
            @click="
              router.push({
                path: '/members/details/membership-overview',
                query: { id: getMemberInfo.id },
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
            <span class="tooltiptext">Profile</span>
          </a>
          <a class="hover-info__link-1 tooltips">
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
            <span class="tooltiptext">Chat</span>
          </a>
          <div href="" class="hover-info__link-1 tooltips">
            <img
              src="~/assets/images/svg/schedule-cancel-white-outline.svg"
              alt="Cancel icon"
              class="img-normal"
            />
            <!-- <img src="~/assets/images/svg/schedule-cancel-blue.svg" alt="Cancel icon" class="img-hover" /> -->
            <span class="tooltiptext">Cancel</span>
          </div>
        </div>
        <a
          @click="
            router.push({
              path: '/members/details/membership-overview',
              query: { id: getMemberInfo.id },
            })
          "
          class="sidebar-box__title text-center"
          title="View membership"
        >
          <div v-if="memberInfoData">
            <img
              v-if="!imageError && getMemberImage.image"
              :src="getImageUrl(getMemberImage.image)"
              @error="imageError = true"
              v-show="!imageError"
            />

            <div
              style="position: relative; left: 35%"
              v-else
              class="avatar-initials content-title-bold"
            >
              {{ formatName(getMemberInfo.firstname.charAt(0))
              }}{{ formatName(getMemberInfo.lastname.charAt(0)) }}
            </div>
          </div>
          <h2 class="content-title-bold editUserName">
            {{ formatName(getMemberInfo.firstname) }}
            {{ formatName(getMemberInfo.lastname) }}
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
          Reset Fitness
        </p>
      </div>
    </div>
    <div class="update-member" style="margin-top: 50px">
      <FormKit
        class="formEditMember"
        type="form"
        :modelValue="getMemberInfo"
        @submit="editMember"
        :actions="false"
        incomplete-message="-"
      >
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
              src="~assets/images/svg/edit-icon-grey.svg"
              alt="Edit icon"
            />
          </h3>
          <div>
            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/female.svg"
                alt="Female icon"
              />
              <span class="showUserGender">{{ getMemberInfo.gender }} </span>
            </div>

            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/birthday.svg"
                alt="Birthday icon"
              />
              <span class="showUserBirthday">{{ getMemberInfo.dob }}</span>
            </div>

            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/phone.svg"
                alt="Phone icon"
              />
              <span class="showPhoneNumber"
                >{{ getMemberInfo.country_code }}
                {{ getMemberInfo.contactno }}</span
              >
            </div>

            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/email.svg"
                alt="Email icon"
              />
              <span class="showUserEmail">{{ getMemberInfo.email }}</span>
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
            :targetHeight="500"
            :targetWidth="500"
            :hideUploadButton="true"
            help="Max image size: 500x500px, 1MB. Format: .jpg or .png"
          />
          <div class="custom-multiselect-gender">
            <FormKit
              type="multiselect"
              mode="single"
              placeholder="Please select a gender"
              name="gender"
              :options="['Female', 'Male', 'Prefer not to say']"
            />
          </div>

          <FormKit
            type="date"
            name="dob"
            label="Birthday"
            validation="required"
            validation-visibility="live"
          />

          <div class="row g-2" style="height: 94px">
            <div class="col-6">
              <FormKit
                type="multiselect"
                name="country_code"
                :options="CountryCodes"
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
          <FormKit
            type="email"
            name="email"
            validation="required|email|"
            validation-visibility="live"
            placeholder="Email"
          />
          <!-- <div class="input-label-box d-none">
            <input
              type="password"
              class="passwordInput"
              placeholder="Password"
            />
          </div> -->
        </div>

        <div
          v-show="!toggleStates.isSocialEditMode.value"
          class="social-show data-block-show"
        >
          <h3 class="small-title-bold">
            Social
            <img
              @click="() => startEdit('isSocialEditMode')"
              class="editgetMemberInfo"
              data-edit="social-edit"
              src="~assets/images/svg/edit-icon-grey.svg"
              alt="Edit icon"
            />
          </h3>

          <div class="social-show__icons">
            <a
              :href="getMemberInfo.facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/facebook.svg"
                  alt="Phone icon"
                />
                Facebook
              </div>
            </a>
            <a
              :href="getMemberInfo.instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/instagram.svg"
                  alt="Instagram icon"
                />
                Instagram
              </div>
            </a>
            <a
              :href="getMemberInfo.linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
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
          <FormKit
            type="text"
            placeholder="Facebook"
            name="facebook"
            v-tooltip="
              'Please enter Facebook handle. This is not a mandatory field.'
            "
          />
          <FormKit
            type="text"
            placeholder="Instagram"
            name="instagram"
            v-tooltip="
              'Please enter Instagram handle. This is not a mandatory field.'
            "
          />
          <FormKit
            type="text"
            placeholder="Linkedin"
            name="linkedin"
            v-tooltip="
              'Please enter Linkedin handle. This is not a mandatory field.'
            "
          />
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
              src="~assets/images/svg/edit-icon-grey.svg"
              alt="Edit icon"
            />
          </h3>
          {{ getMemberInfo.about }}
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
              src="~assets/images/svg/edit-icon-grey.svg"
              alt="Edit icon"
            />
          </h3>
          <div class="d-flex items-align-center justify-content-between">
            <div style="width: 150px">
              {{ getMemberInfo.emergency_contact_name }}
            </div>
            <div>
              <span style="">
                {{ getMemberInfo.emergency_country_code }}
                {{ getMemberInfo.emergency_contact_no }}</span
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
          <div style="height: 77px">
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
          </div>
          <div class="row g-2">
            <div class="col-6">
              <FormKit
                type="multiselect"
                name="emergency_country_code"
                :options="CountryCodes"
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

        <div
          v-show="!toggleStates.isTagsEditMode.value"
          class="tags-show data-block-show"
        >
          <h3 class="small-title-bold mt-4">
            Tags
            <img
              @click="() => startEdit('isTagsEditMode')"
              class="editgetMemberInfo"
              data-edit="tags-edit"
              src="~assets/images/svg/edit-icon-grey.svg"
              alt="Edit icon"
            />
          </h3>
          <div>
            <span
              v-for="tag in tagObjects(getMemberInfo.tags)"
              :key="tag.value"
              class="tags"
            >
              {{ tag.label }}
            </span>
          </div>
        </div>

        <div
          v-show="toggleStates.isTagsEditMode.value"
          class="tags-edit data-block-edit"
        >
          <h3 class="small-title-bold">
            Tags
            <div
              class="goBackShowMode"
              data-show="tags-show"
              @click="() => cancelEdit('isTagsEditMode')"
            >
              Cancel
            </div>
          </h3>
          <div class="custom-multiselect-member-tags">
            <span
              style="
                position: relative;
                bottom: -39.1px;
                left: 15px;
                z-index: 90;
                font-size: 16px;
              "
              >Add Tags</span
            >
            <FormKit
              type="multiselect"
              name="tags"
              mode="tags"
              openDirection="top"
              :options="computedTags"
            />
          </div>
        </div >
        <FormKit style="margin-top: 140px;" type="submit" label="Save" v-show="isAnyEditModeActive" />
      </FormKit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useTagStore } from "@/store/tag";
import { useCountryStore } from "@/store/countrycode";
import { storeToRefs } from "pinia";
const { $toast } = useNuxtApp();
const router = useRouter();
const emit = defineEmits(["reload", "update:categoryData", "close-sidebar"]);
import type { ITag } from "@/types/api/member/info";
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});
const route = useRoute();

const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

const { memberId } = toRefs(props);
const memberInfoData = ref(null);
const memberInfoPending = ref(false);
const { tags } = storeToRefs(useTagStore());
const { currentUserType } = useAuthStore();
const { getUrl: getImageUrl } = useBoImage();
const { CountryCodes } = useCountryStore();
const imageError = ref(false);

// New Variables
const emergencyContactName = ref();
const emergencyCountryCode = ref();
const emergencyContactNo = ref();
// const countryCodes = ref([{ label: "Select a country", value: "" }]);

watch(
  route,
  (val) => {
    if (val.path === "/members") {
      setBreadcrumb({
        items: [
          { label: "Control Panel", link: "" },
          { label: "Profiles", link: "" },
        ],
      });
    } else {
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
    }
  },
  { immediate: true }
);

type ToggleStates = {
  isImageEditMode: Ref<boolean>;
  isPersonalEditMode: Ref<boolean>;
  isSocialEditMode: Ref<boolean>;
  isAboutEditMode: Ref<boolean>;
  isEmergencyEditMode: Ref<boolean>;
  isTagsEditMode: Ref<boolean>;
};

const toggleStates: ToggleStates = {
  isImageEditMode: ref(false),
  isPersonalEditMode: ref(false),
  isSocialEditMode: ref(false),
  isAboutEditMode: ref(false),
  isEmergencyEditMode: ref(false),
  isTagsEditMode: ref(false),
};

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

const editMember = async (getMemberInfo: any) => {
  console.log(getMemberInfo);
  try {
    const { id, ...memberInfoWithoutId } = getMemberInfo;

    const { data } = await useCustomFetch<any>("/members/update/member", {
      method: "POST",
      body: {
        member_id: getMemberInfo.id,
        facility_id: currentUserType?.id,
        ...memberInfoWithoutId,
      },
    });

    if (data.value.return) {
      emit("reload");
      $toast("Member profile updated successfully");
      getMember();
      // emit("close-sidebar");
      Object.keys(toggleStates).forEach((key) => {
        toggleStates[key].value = false;
      });
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/Member/update", err);
  }
};

const computedTags = computed(() => {
  return tags.value
    ? tags.value.map((item: any) => ({ label: item.name, value: item.id }))
    : [];
});
const tagObjects = (tagIds: any) => {
  return tagIds
    ? tagIds
        .map((tagId: any) => {
          const foundTag = computedTags.value.find(
            (tag: any) => tag.value === String(tagId)
          );
          return foundTag || null; // Return the entire object or null if not found
        })
        .filter((tag: any) => tag !== null) // Filter out any null entries
    : [];
};

const getMember = async () => {
  try {
    const response = await useCustomFetch(`/members/get/memberinfo`, {
      method: "POST",
      body: { facility_id: currentUserType?.id, member_id: memberId.value },
    });
    if (response.data && response.data.value) {
      memberInfoData.value = response.data.value;
    } else {
      console.error("No data returned from fetch");
    }
  } catch (error) {
    console.error("Error refreshing member data:", error);
  }
};

const getMemberImage = computed(() => {
  if (
    memberInfoData.value &&
    memberInfoData.value.member &&
    memberInfoData.value.member.data &&
    memberInfoData.value.member.data.length > 0
  ) {
    const memberData = memberInfoData.value.member.data[0];
    const imageUrl = `${memberData.img_src}?timestamp=${new Date().getTime()}`;

    return {
      id: memberData.id,
      image: imageUrl,
    };
  }

  return {};
});
const getMemberInfo = computed(() => {
  if (
    memberInfoData.value &&
    memberInfoData.value.member &&
    memberInfoData.value.member.data &&
    memberInfoData.value.member.data.length > 0
  ) {
    const memberData = memberInfoData.value.member.data[0];
    const socialData = memberInfoData.value.member.social || {};
    const aboutData = memberInfoData.value.member.about || {};
    const emergencyContactData =
      memberInfoData.value.member.emergency_contact || {};
    const tags = memberInfoData.value.member?.tags || [];

    return {
      id: memberData.id,
      firstname: memberData.firstname,
      lastname: memberData.lastname,
      dob: memberData.dob,
      gender: memberData.gender,
      country_code: memberData.country_code,
      contactno: memberData.contactno,
      email: memberData.email,
      // image: imageUrl,
      // membership_status: memberData.membership_status,
      facebook: socialData.facebook,
      instagram: socialData.instagram,
      linkedin: socialData.linkedin,
      about: aboutData.about,
      emergency_contact_name: emergencyContactData.name,
      emergency_contact_no: emergencyContactData.contactno,
      emergency_country_code: emergencyContactData.country_code,
      tags: tags?.map((tag: ITag) => tag?.id),
    };
  }

  return {};
});

watch(
  memberId,
  async () => {
    if (memberId.value) {
      await getMember();
    }
  },
  { immediate: true }
);

watch(
  () => getMemberImage.value.image,
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
  border-radius: 0px 0px 10px 10px;
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
.tooltips .tooltiptext {
  visibility: hidden;
  width: auto; /* Adjust width as needed */
  background-color: white;
  color: black;
  font-size: 10px;
  text-align: center;
  border-radius: 20px;
  padding: 5px 8px; /* Adjust padding as needed, adding some space on the sides */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 110%; /* Adjust this to change the vertical position of the tooltip */
  left: 50%;
  transform: translateX(-50%); /* Centers the tooltip */

  /* Fade in tooltip - Transition for smooth appearance */
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
.hover-info__link:hover .tooltiptext,
.hover-info__link-1:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.scheduler-week-class-form {
  .formkit-message {
    display: none;
  }
  [data-message-type="ui"] {
    display: block;
  }
}
</style>
