<template>
  <div class="sidebar-box">
    <div class="image-box">
      <a
        @click="
          router.push({
            path: '/members/details/membership-overview',
            query: { id: getMemberImage.id },
          })
        "
        class="sidebar-box__title text-center"
        title="View membership"
      >
      <div v-if="memberInfoData">
        <img v-if="!imageError && memberInfoData.member.data[0].img_src"
            :src="getImageUrl(memberInfoData.member.data[0].img_src)"
            @error="imageError = true"
            v-show="!imageError" />

        <div style="position: relative; left: 35%;" v-else class="avatar-initials content-title-bold ">
          {{ memberInfoData.member.data[0].firstname.charAt(0) }}{{ memberInfoData.member.data[0].lastname.charAt(0) }} 
        </div>
      </div>
        <h2 class="content-title-bold editUserName">
          {{ formatName(getMemberInfo.firstname) }} {{ formatName(getMemberInfo.lastname) }} 
        </h2>
      </a>
      <p
        style="
          font-size: 14px;
          text-align: center;
          position: relative;
          bottom: 25px;
        "
      >
        Reset Fitness
      </p>
    </div>

    <div class="update-member">
      <FormKit
        class="formEditMember"
        type="form"
        :modelValue="getMemberInfo"
        @submit="editMember"
        :actions="false"
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
           :targetHeight="100"
           :targetWidth="100"
            :hideUploadButton="true"
            help="Max image upload: 960x540px, 1MB, in .jpg and .png."
          />
          <div class="custom-multiselect-gender">
            <FormKit type="multiselect"  
           mode="single"
            name="gender" 
            :options="['Male', 'Female']"
             />
        </div>
          
          <FormKit
            type="date"
            name="dob"
            label="Birthday"
            validation="required"
            validation-visibility="live"
          />

          <div class="row g-2">
            <div class="col-6">
              <FormKit
                type="multiselect"
                name="country_code"
                :options="CountryCodes"
                validation="required"
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
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>

          <div class="social-show__icons">
            <a :href="getMemberInfo.facebook">
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/facebook.svg"
                  alt="Phone icon"
                />
                Facebook
              </div>
            </a>
            <a :href="getMemberInfo.instagram">
              <div class="icon-text">
                <img
                  src="~assets/images/svg/social/instagram.svg"
                  alt="Instagram icon"
                />
                Instagram
              </div>
            </a>
            <a :href="getMemberInfo.linkedin">
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
              src="~assets/images/svg/edit-icon-black.svg"
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
          <FormKit
            type="text"
            placeholder="Emergency contact name"
            name="emergency_contact_name"
            v-model="getMemberInfo.emergency_contact_name"
            @blur="setEmergencyContactNameTouched"
            :validation="isEmergencyContactFieldRequired"
            :validation-messages="{
              required: 'Emergency contact name is required.',
            }"
          />

          <div class="row g-2">
            <div class="col-6">
              <FormKit
                type="select"
                name="emergency_country_code"
                :options="CountryCodes"
                v-model="getMemberInfo.emergency_country_code"
                @blur="setEmergencyCountryCodeTouched"
                :validation="isEmergencyContactFieldRequired"
                :validation-messages="{
                  required: 'Emergency country code is required.',
                }"
              />
            </div>
            <div class="col-6">
              <FormKit
                type="tel"
                placeholder="Contact Number"
                name="emergency_contact_no"
                v-model="getMemberInfo.emergency_contact_no"
                @blur="setEmergencyContactNoTouched"
                :validation="isEmergencyContactFieldRequired"
                :validation-messages="{
                  required: 'Emergency contact number is required.',
                }"
              />
            </div>
          </div>
        </div>

        <div
          v-show="!toggleStates.isTagsEditMode.value"
          class="tags-show data-block-show"
        >
          <h3 class="small-title-bold">
            Tags
            <img
              @click="() => startEdit('isTagsEditMode')"
              class="editgetMemberInfo"
              data-edit="tags-edit"
              src="~assets/images/svg/edit-icon-black.svg"
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
const emergencyContactNameTouched = ref(false);
const emergencyCountryCodeTouched = ref(false);
const emergencyContactNoTouched = ref(false);

const setEmergencyContactNameTouched = () => {
  emergencyContactNameTouched.value = true;
};

const setEmergencyCountryCodeTouched = () => {
  emergencyCountryCodeTouched.value = true;
};

const setEmergencyContactNoTouched = () => {
  emergencyContactNoTouched.value = true;
};

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
  if (!string) return '';
  const words = string.split(' ');
  const capitalizedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
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

const editMemberImage = async (getMemberImage: any) => {
  try {
    const { id, ...memberInfoWithoutId } = getMemberImage;

    const { data } = await useCustomFetch<any>("/members/update/member", {
      method: "POST",
      body: {
        member_id: getMemberImage.id,
        facility_id: currentUserType?.id,
        ...memberInfoWithoutId,
      },
    });

    if (data.value.return) {
      emit("reload");
      $toast.success("Member Image edited successfully!");
      emit("close-sidebar");
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/Member/update", err);
  }
};

const editMember = async (getMemberInfo: any) => {
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
      $toast.success("Member  edited successfully!");
      emit("close-sidebar");
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

const isEmergencyContactInfoFilled = computed(() => {
  // Check if any of the fields have a non-empty value.
  return (
    (getMemberInfo.value.emergency_contact_name &&
      getMemberInfo.value.emergency_contact_name.trim() !== "") ||
    (getMemberInfo.value.emergency_country_code &&
      getMemberInfo.value.emergency_country_code.trim() !== "") ||
    (getMemberInfo.value.emergency_contact_no &&
      getMemberInfo.value.emergency_contact_no.trim() !== "")
  );
});

const isEmergencyContactFieldRequired = computed(() => {
  // Fields are required if any emergency contact information field is filled.
  return isEmergencyContactInfoFilled.value ? "required" : null;
});

const computedTags = computed(() => {
  return tags.value
    ? tags.value.map((item: any) => ({ label: item.name, value: item.id }))
    : [];
});
const tagObjects = (tagIds) => {
  return tagIds
    ? tagIds
        .map((tagId) => {
          const foundTag = computedTags.value.find(
            (tag) => tag.value === String(tagId)
          );
          return foundTag || null; // Return the entire object or null if not found
        })
        .filter((tag) => tag !== null) // Filter out any null entries
    : [];
};
const tagname = (tagIds: number) => {
  const labels = tagIds
    ?.map((tagId: number) => {
      const foundTag = computedTags.value.find(
        (tag: any) => tag.value === String(tagId)
      );
      return foundTag ? foundTag.label : null;
    })
    .filter((label) => label !== null);
  return labels?.join(", ");
};

const getMemberImage = computed(() => {
  if (
    memberInfoData.value &&
    memberInfoData.value.member &&
    memberInfoData.value.member.data &&
    memberInfoData.value.member.data.length > 0
  ) {
    const memberData = memberInfoData.value.member.data[0];

    return {
      id: memberData.id,
      image: memberData.img_src,
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
      image: "",
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
      const { data, pending } = await useCustomFetch<any>(
        `/members/get/memberinfo`,
        {
          method: "POST",
          body: { facility_id: currentUserType?.id, member_id: memberId.value },
        }
      );
      memberInfoData.value = data.value;
      memberInfoPending.value = pending.value;
    }
  },
  { immediate: true }
);
const imageError = ref(false);
watch(
  () => memberInfoData.value?.member?.data[0]?.img_src,
  (newImgSrc) => {
    // Only reset imageError if newImgSrc is not undefined
    if (newImgSrc !== undefined) {
      imageError.value = false;
    }
  },
  { immediate: true } // This ensures the watcher is run immediately with the current value
);

// onMounted(async () => {
//   try {
//     const response = await fetch(
//       "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/CountryCodes.json"
//     );
//     if (response.ok) {
//       const data = await response.json();
//       countryCodes.value = [
//         ...countryCodes.value,
//         ...data.map((country) => ({
//           label: `${country.name} (${country.dial_code})`,
//           value: country.dial_code,
//         })),
//       ];
//     } else {
//       console.error("Failed to fetch country codes");
//     }
//   } catch (error) {
//     console.error("Error fetching country codes:", error);
//   }
// });
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

</style>