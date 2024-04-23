<template>
  <div class="sidebar-box" v-if="getMemberInfo">
    <!-- <h4 class="text-center">Reset JIP</h4> -->
    <!-- <h6>Facilty Image</h6> -->
    <img class="facility-image" :src="getImageUrl(getMemberInfo.img)" />

    <h4 class="text-center mt-2">Reset Fitness JIP</h4>
    <FormKit
      class="formEditMember"
      type="form"
      :modelValue="getMemberInfo"
      @submit="editFacility"
      :actions="false"
      #default="{ value }"
    >
      <div
        v-show="!toggleStates.isAddressEditMode.value"
        class="personal-show data-block-show"
      >
        <h3 class="small-title-bold mt-4">
          Address
          <img
            @click="() => startEdit('isAddressEditMode')"
            class="editgetMemberInfo"
            data-edit="personal-edit"
            src="~assets/images/svg/edit-icon-grey.svg"
            alt="Edit icon"
          />
        </h3>
        <div>
          <div class="icon-text">
            <img src="~assets/images/svg/location.svg" alt="Female icon" />
            <span class="showUserGender"> {{ getMemberInfo.address }} </span>
          </div>
        </div>
      </div>

      <div
        v-show="toggleStates.isAddressEditMode.value"
        class="personal-edit data-block-edit"
      >
        <div class="upload-image">
          <div id="uploadEditAvatar"></div>
        </div>
        <FormKit
          type="uppy"
          label="Upload Image"
          name="image"
          :targetHeight="540"
          :targetWidth="960"
         :hideUploadButton="true"
          help="Max image upload: 960x540px, 1MB, in .jpg and .png."
        />
        <div  style="height: 60px;" >   
        <FormKit
          type="text"
          placeholder="Location"
          validation="required"
          name="address"
        />
     </div>
        <div class="row g-2">
        </div>
        <h3 class="small-title-bold mt-4">
          Address
          <div
            class="goBackShowMode"
            @click="() => cancelEdit('isAddressEditMode')"
          >
            Cancel
          </div>
        </h3>
        <div class="input-label-box d-none">
          <input type="password" class="passwordInput" placeholder="Password" />
        </div>
      </div>
      <div
        v-show="!toggleStates.isContactEditMode.value"
        class="personal-show data-block-show"
      >
        <h3 class="small-title-bold mt-4">
          Contact
          <img
            @click="() => startEdit('isContactEditMode')"
            class="editgetMemberInfo"
            data-edit="personal-edit"
            src="~assets/images/svg/edit-icon-grey.svg"
            alt="Edit icon"
          />
        </h3>
        <div>
          <div class="icon-text">
            <img
              src="~assets/images/svg/members-info/phone.svg"
              alt="Phone icon"
            />
            <span class="showPhoneNumber"> {{ getMemberInfo.contactno }} </span>
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
        v-show="toggleStates.isContactEditMode.value"
        class="personal-edit data-block-edit"
      >
        <h3 class="small-title-bold mt-2">
          Contact
          <div
            class="goBackShowMode"
            @click="() => cancelEdit('isContactEditMode')"
          >
            Cancel
          </div>
        </h3>
        <div class="upload-image">
          <div id="uploadEditAvatar"></div>
        </div>

        <div class="row g-2" style="height: 75px;">
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
        <div  style="height: 75px;" >
        <FormKit
          type="email"
          name="email"
          validation="required|email|"
          validation-visibility="live"
          placeholder="Email"
        />
      </div>
        <div class="input-label-box d-none">
          <input type="password" class="passwordInput" placeholder="Password" />
        </div>
      </div>

      <div
        v-show="!toggleStates.isSocialEditMode.value"
        class="social-show data-block-show"
      >
        <h3 class="small-title-bold mb-4 mt-4">
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
        <FormKit type="text"  placeholder="Facebook" name="facebook" />
        <FormKit type="text" placeholder="instagram" name="instagram" />
        <FormKit type="text" placeholder="Linkedin" name="linkedin" />
      </div>

      <div
        v-show="!toggleStates.isWebsiteEditMode.value"
        class="about-show data-block-show"
      >
        <h3 class="small-title-bold">
          Website
          <img
            @click="() => startEdit('isWebsiteEditMode')"
            class="editgetMemberInfo"
            data-edit="about-edit"
            src="~assets/images/svg/edit-icon-grey.svg"
            alt="Edit icon"
          />
        </h3>
        {{ getMemberInfo.website }}
        <div class="icon-text showMemberAbout"></div>
      </div>

      <div
        v-show="toggleStates.isWebsiteEditMode.value"
        class="about-edit member-edit-box data-block-edit"
      >
        <h3 class="small-title-bold">
          Website
          <div
            class="goBackShowMode"
            data-show="about-show"
            @click="() => cancelEdit('isWebsiteEditMode')"
          >
            Cancel
          </div>
        </h3>

        <FormKit type="text" placeholder="Website" name="website" />
      </div>

      <FormKit
        type="submit"
        label="Save"
        class="EditSave"
        v-show="isAnyEditModeActive"
      />
      <!-- <pre wrap>{{ value }}</pre> -->
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
const emit = defineEmits(["reload", "update:categoryData"]);
import type { ITag } from "@/types/api/member/info";
import { getImage } from "~/utils/providers/boImage";
import { cleanObjectL1 } from "@/utils/dataCleaner";
const { $toast } = useNuxtApp();
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});

const { memberId } = toRefs(props);
const memberInfoData = ref(null);
const memberInfoPending = ref(false);
const { tags } = storeToRefs(useTagStore());
const { currentUserType } = useAuthStore();
const { getUrl: getImageUrl } = useBoImage();
const countryCodes = ref([]);

type ToggleStates = {
  isAddressEditMode: Ref<boolean>;
  isContactEditMode: Ref<boolean>;
  isSocialEditMode: Ref<boolean>;
  isWebsiteEditMode: Ref<boolean>;
};

const toggleStates: ToggleStates = {
  isAddressEditMode: ref(false),
  isContactEditMode: ref(false),
  isSocialEditMode: ref(false),
  isWebsiteEditMode: ref(false),
};

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
const resetEditModes = () => {
  Object.keys(toggleStates).forEach((key) => {
    toggleStates[key].value = false;
  });
};

async function fetchFacilityInfo() {
  try {
    const { data, pending } = await useCustomFetch<any>(
      `/franchise/get/franchise`
    );
    memberInfoData.value = data.value;
    memberInfoPending.value = pending.value;
  } catch (error) {
    console.error("Failed to fetch facility info:", error);
  }
}
onMounted(fetchFacilityInfo);

const editFacility = async (getMemberInfo) => {
  const { data, error, execute } = useCustomFetch<any>("/franchise/update/facility", {
    method: "POST",
    body: JSON.stringify(cleanObjectL1({
      member_id: getMemberInfo.id,
      facility_id: currentUserType?.id,
      ...getMemberInfo,
    })),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute(); // Execute the custom fetch request

    if (data.value && data.value.return) {
      $toast("Facility Updated successfully!"); // Display success message
      resetEditModes(); // Reset any editing modes in UI
      fetchFacilityInfo(); // Refresh facility info
      emit("reload"); // Notify any parent components or listeners
    } else if (data.value) {
      $toast(data.value.message); // Show error message from response
    } 
  } catch (err) {
    console.error("Error updating facility: ", err); // Log detailed error
    $toast("Failed to update facility due to an exception."); // Show user-friendly error message
    if (error.value) {
      console.error("API Error:", error.value); // Additional API response error if exists
    }
  }
};


const computedTags = computed(() => {
  return tags.value
    ? tags.value.map((item: any) => ({ label: item.name, value: item.id }))
    : [];
});
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

const getMemberInfo = computed(() => {
  if (
    memberInfoData.value &&
    memberInfoData.value.franchise &&
    memberInfoData.value.franchise[0].facility &&
    memberInfoData.value.franchise[0].facility.length > 0
  ) {
    const facilityData = memberInfoData.value.franchise[0].facility[0];
    const socialData =
      memberInfoData.value.franchise[0].facility[0].social[0] || [];

    return {
      id: facilityData.id,
      name: facilityData.name,
      email: facilityData.email,
      img: facilityData.img_src,
      contactno: facilityData.contactno,
      address: facilityData.address,
      country_code: facilityData.country_code,
      facebook: socialData.facebook,
      instagram: socialData.instagram,
      linkedin: socialData.linkedin,
      website: socialData.website,
    };
  }

  return {};
});


watch(
  () => memberId.value, // This ensures the watcher reacts to changes in memberId
  async (newMemberId) => {
    if (newMemberId) { // Only proceed if newMemberId is truthy
      memberInfoPending.value = true; // Set loading state
      const { data, error, pending, execute } = useCustomFetch<any>(
        `/franchise/get/franchise`, {
          method: 'GET', // Specify method if required, remove if not necessary
          params: { facility_id: currentUserType?.id, member_id: newMemberId }, // Uncomment and use if needed
        });

      try {
        await execute(); // Execute the fetch operation
        memberInfoData.value = data.value; // Update member info with fetched data
      } catch (err) {
        console.error('Failed to fetch member info:', err); // Error handling
      } finally {
        memberInfoPending.value = pending.value; // Update loading state
      }
    }
  },
  { immediate: true } // Execute the effect immediately on component mount
);

</script>

<style lang="scss" scoped>
.sidebar-box {
  max-width: 400px;
  width: 30vw;
  margin-right: 20px;
  margin-left: 20px;
  padding: 20px;
  // height: fit-content;
  min-height: calc(100vh - 129px);
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.0784313725);
  padding-bottom: 30px;
  border-radius: 0px 0px 0px 0px;
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

  .icon-text {
    display: flex;
    margin-bottom: 10px;
  }
  .icon-text img {
    display: block;
    margin-right: 10px;
  }

  .social-show__icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
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
  .small-title-bold {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
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
.facility-image {
  border-radius: 10px;
}
</style>
