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
        :hideUploadButton="true"
        help="Max image upload: 960x540px, 1MB, in .jpg and .png."
      />

      <FormKit
        type="text"
        name="firstname"
        placeholder="First name"
        validation="required"
      />

      <FormKit
        type="text"
        name="lastname"
        placeholder="Last name"
        validation="required"
      />

      <h3 class="small-title-bold">Personal</h3>
      <FormKit type="select" name="gender" :options="['Male', 'Female']" />
      <FormKit
        type="date"
        name="dob"
        value="2011-01-01"
        label="Birthday"
        validation-visibility="live"
        validation="required"
      />
      <div class="row g-2">
        <div class="col-6">
          <FormKit
            type="multiselect"
            label="select Country"
            name="country_code"
            :options="countryCodes"
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
      <FormKit
        style="border-radius: 0px 0px 0px 0px"
        type="password"
        name="password"
        label="password"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        :validation-rules="{
          passwordValidation,
        }"
        validation="required|passwordValidation|length:8"
        :validation-messages="{
          passwordValidation:
            'Password should contain at least one symbol, number, capital, and small letter.',
        }"
        placeholder="Password"
      />
      <h3 class="small-title-bold">Social</h3>
      <FormKit type="text" placeholder="Facebook" name="facebook" />
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
const countryCodes = ref([{ label: "Select a country", value: "" }]);

const passwordValidation = ({ value }) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

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

onMounted(async () => {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/CountryCodes.json"
    );
    if (response.ok) {
      const data = await response.json();
      countryCodes.value = [
        ...countryCodes.value,
        ...data.map((country) => ({
          label: `${country.name} (${country.dial_code})`,
          value: country.dial_code,
        })),
      ];
    } else {
      console.error("Failed to fetch country codes");
    }
  } catch (error) {
    console.error("Error fetching country codes:", error);
  }
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
