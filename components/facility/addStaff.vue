<template>
  <div class="sidebar-box">
    <FormKit
      class="formCreateMember"
      type="form"
      @submit="addStaff"
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

      <div class="row" >
        <div class="col-2 small-title-bold" style="margin-top: 38px;"><B>Role</B> </div>
            <div  class="col-10  mt-4"   style="height: 50px; margin-bottom: 25px;">
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
         <div  style="height: 120px;" >
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
     
      <FormKit type="submit" label="Save" class="EditSave" />
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { IStaff } from "@/types/api/staff/info";
import { useCountryStore } from "@/store/countrycode";
import { useRoleStore } from "@/store/roles";
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
// const { tags } = storeToRefs(useTagStore());
const emit = defineEmits(["reload", "close-sidebar", "staff-added"]);
const { CountryCodes } = useCountryStore();
const { staffRoles } = useRoleStore();

const passwordValidation = ({ value }) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

  return passwordRegex.test(value);
};


const processFormData = (formData) => {
  Object.keys(formData).forEach(key => {
    if (formData[key] === undefined) {
      formData[key] = ''; // Convert undefined to empty string
    }
  });
  return formData;
};

const addStaff = async (rawFormData: any) => {
  const formData = processFormData(rawFormData); // Process form data to replace undefined with empty strings
  console.log(formData);
  try {
    const response = await useCustomFetch("/staff/add/staff", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        facility_id: currentUserType?.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = response;
    if (data.value.return) {
      $toast.success("Staff added successfully!");
      emit("reload");
      emit("close-sidebar");
      console.log(data.value.staff_id)
      emit("staff-added", data.value.staff_id); 
    } else {
      $toast.error(data.value.message);
    }
  } catch (error) {
    console.error('Error adding staff:', error);
    $toast.error("Failed to add staff.");
  }
};



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
</style>
