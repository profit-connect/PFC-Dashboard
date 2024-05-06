<template>
  <div class="login-form">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <div  style="height: 60px;" >
      <FormKit
        type="multiselect"
        label="Franchise/Facility"
        name="franchise_or_facility_name"
        placeholder="Please select Franchise or Facility"
        validation="required"
        :options="combinedNames"
        :searchable="true"
        :validation-messages="{
                  required: 'Franchise/Facility is required ',
                }"
      />
    </div>
    <div  style="height: 60px;" >
      <FormKit
        type="text"
        name="username"
        label="username"
        placeholder="Please enter username"
        validation="required"
        :validation-messages="{
                  required: 'Username is required',
                }"
      />
    </div>
    <div  style="height: 60px;" >
      <FormKit
        style="border-radius: 10px 0px 0px 10px;"
        type="password"
        name="password"
        label="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        validation="required"
        placeholder="Please enter password"
        :validation-messages="{
                  required: 'Password is required',
                }"
        
      />
    </div>
      <button class="sign-in" type="submit" label="Sign In" >Sign In </button>
      <div class="bottom-link-action d-flex justify-content-between">
        <FormKit
          type="checkbox"
          label="Remember me"
          name="remember_me"
          :value="true"
        />

        <NuxtLink to="/auth/forget-password"> Forgot password </NuxtLink>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFranchiseStore } from "~/store/franchise";
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

const submitted = ref(false);
const { getCurrentFranchiseOrCurrentFacility } = useFranchiseStore();
const { initClientAuthSetup } = useAuthStore();
const { franchise } = storeToRefs(useFranchiseStore());
const { $toast } = useNuxtApp();
// test
const combinedNames = computed(() => {
  try {
    const franchises = franchise.value?.franchise || [];
    return useSortBy(franchises, [
      function (o) {
        return o.name;
      },
    ]).flatMap((franchise) => [
      franchise.name,
      ...useSortBy(franchise.facility, [
        function (o) {
          return o.name;
        },
      ]).map((facility) => `\u00A0\u00A0${facility.name}`),
    ]);
  } catch (error) {
    console.error("Error getting combined names:", error);
    return [];
  }
});

function sanitizeSelectedName(name) {
  // Remove leading non-breaking spaces from the name
  return name.replace(/^\u00A0+/g, "");
}
const submitHandler = async (event) => {
  const sanitizedFranchiseOrFacilityName = sanitizeSelectedName(
    event.franchise_or_facility_name
  );
  const authData = {
    username: event.username,
    password: event.password,
    facility_id: "",
    franchise_id: "",
  };
  const userTypeData = getCurrentFranchiseOrCurrentFacility(
    sanitizedFranchiseOrFacilityName
  );
  if (userTypeData) {
    userTypeData.type === "franchise"
      ? (authData.franchise_id = userTypeData.id)
      : (authData.facility_id = userTypeData.id);
    try {
      const { data } = await useCustomFetch("/franchise/get/login", {
        method: "POST",
        body: {
          ...authData,
        },
      });
      if (data.value.return) {
        initClientAuthSetup(data, userTypeData);
        $toast("Successful login");
      } else {
        // $toast.error(data.value.message);
        $toast.error("Username or password is incorrect")
      }
    } catch (err) {
      console.log("Error:/franchise/get/login", err);
    }
  }
  submitted.value = true;
};

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>

<style scoped lang="scss">
.login-form {
  height: 310px;
  .bottom-link-action {
    .formkit-label {
      display: block !important;
      color: #000;
      font-size: 14px;
    }
    a {
      color: #000;
      text-decoration: none;
      font-size: 14px;
    }
  }
  ::v-deep .formkit-outer .formkit-icon svg {
    width: 100%;
    margin: auto;
    max-height: 2em;
    max-width: 2em;
    margin-left: 0px;
    color: #002E4B;
    // Uncomment and use the correct path if you need to use a background image:
    // background: url("~/assets/images/svg/select-dropdown.svg");
  }
}
.sign-in {
    background: var(--fk-bg-submit);
    color: var(--fk-color-submit);
    width: 368px;
    height: 50px;
    text-align: center;
    margin: 0px 0px 0px 0px;
    border: none;
    border-radius: 10px;
    font-size: 22px;
    font: 22px "Poppins Medium", sans-serif, Arial;
}
/* CSS to increase the size of the suffix icon in FormKit */

</style>