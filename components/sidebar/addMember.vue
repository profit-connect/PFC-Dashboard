<template>
  <div class="sidebar-box">
    <FormKit
      class="formCreateMember"
      type="form"
      @submit="addMember"
      :actions="false"
    >
      <FormKit
        type="uppy"
        label="Upload Image"
        name="image"
        :targetHeight="100"
        :targetWidth="100"
        :hideUploadButton="true"
        help="Max image size: 960x540px, 1MB. Format: .jpg or .png"
      />
      <div  style="height: 74px;" >
      <FormKit
        type="text"
        name="firstname"
        placeholder="Please enter first name"
        validation="required"
        :validation-messages="{
                  required: 'First name is required',
                }"
      />
    </div>
    <div  style="height: 74px;" >
      <FormKit
        type="text"
        name="lastname"
        placeholder="Please enter last name"
        validation="required"
        :validation-messages="{
                  required: 'Last name is required',
                }"
      />
    </div>
      <h3 class="small-title-bold">Personal</h3>
      <div  style="height: 74px;" >
        <div class="custom-multiselect-gender">
            <FormKit type="multiselect"  
           mode="single"
           placeholder="Please select gender"
            name="gender" 
            :options="['Female', 'Male', 'Prefer not to say']"
             />
        </div>
       </div>
       <div  style="height: 80px;" >
      <FormKit
        type="date"
        name="dob"
        placeholder="Please enter first name"
        label="Birthday"
        validation-visibility="live"
        validation="required"
        :validation-messages="{
                  required: 'Date of birth is required',
                }"
      />
    </div>
      <div class="row g-2"  style="height: 94px;">
        <div class="col-6">
          <FormKit
            type="multiselect"
            label="select Country"
            placeholder="Country code"
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
            placeholder="Enter phone number"
            validation="required|number|"
            :validation-messages="{
              required: 'Phone number is required.',
              number: 'Phone number must be numeric.',
            }"
          />
        </div>
      </div>
      <div  style="height: 80px;" >
      <FormKit
        type="email"
        name="email"
        validation="required|email|"
        validation-visibility="live"
        placeholder="Please enter email"
      />
         </div>
         <div  style="height: 100px;" >
      <FormKit
        style="border-radius: 0px 0px 0px 0px"
        type="password"
        name="password"
        label="password"
        placeholder="Please enter password"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        :validation-rules="{
          passwordValidation,
        }"
        validation="required|passwordValidation|length:8"
        :validation-messages="{
          passwordValidation:
            'Please enter password. Password must contain at least 1 of the following: upper case letter, lower case letter, number and special character',
        }"
      
      />
           </div>
      <h3 class="small-title-bold">Social</h3>
      <FormKit type="text" placeholder="Please enter Facebook handle. This is not a mandatory field." name="facebook" />
      <FormKit type="text" placeholder="Instagram" name="instagram" />
      <FormKit type="text" placeholder="Linkedin" name="linkedin" />
      <h3 class="small-title-bold">Tags</h3>
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
      <FormKit type="submit" label="Save" class="EditSave" />
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { IAddMember } from "@/types/api/member/info";
import { useCountryStore } from "@/store/countrycode";
import { useAuthStore } from "@/store/auth";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
const { $toast } = useNuxtApp();

interface NodeProps {
  suffixIcon: string;
  type: string;
}

const handleIconClick = (node: { props: NodeProps }, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const { currentUserType } = useAuthStore();
const { tags } = storeToRefs(useTagStore());
const emit = defineEmits(["reload", "close-sidebar"]);
const { CountryCodes } = useCountryStore();

const passwordValidation = ({ value }) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

  return passwordRegex.test(value);
};


const addMember = async (addNewMember: IAddMember) => {
  try {
    const { data } = await useCustomFetch<any>("/members/add/member", {
      method: "POST",
      body: {
        ...addNewMember,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast.success("Member Added successfully!");
      emit("close-sidebar");
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/Member/add", err);
  }
};

const computedTags = computed(() => {
  return tags.value
    ? tags.value.map((item: any) => ({ label: item.name, value: item.id }))
    : [];
});

</script>
<style lang="scss" scoped>
.sidebar-box {
  max-width: 400px;
  width: 30vw;
  margin-left: 20px;
  padding: 20px;
  min-height: calc(100vh - 129px);
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.0784313725);
  border-radius: 10px;
}
</style>
