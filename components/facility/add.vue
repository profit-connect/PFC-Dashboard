<template>
  <div class="sidebar-box">
    <FormKit
      class="formCreateMember"
      type="form"
      #default="{ value }"
      @submit="addMember"
      :actions="false"
    >
      <h3 class="small-title-bold">Address & Information</h3>
      <FormKit
        type="uppy"
        label="Upload Image"
        name="image"
        :hideUploadButton="true"
      />
      <FormKit type="text" name="address" placeholder="Address" />

      <div class="row g-2">
        <div class="col-6">
          <FormKit
            type="select"
            label="select Country"
            name="country_code"
            :options="countryCodes"
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

      <h3 class="small-title-bold">Social</h3>
      <FormKit type="text" placeholder="Facebook" name="facebook" />
      <FormKit type="text" placeholder="Instagram" name="instagram" />
      <FormKit type="text" placeholder="Linkedin" name="linkedin" />
      <h3 class="small-title-bold">Website</h3>
      <FormKit type="text" name="website" placeholder="website" />
      <FormKit type="submit" label="Save" class="EditSave" />
      <pre>{{ value }}</pre>
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { IAddMember } from "@/types/api/member/info";
import { useAuthStore } from "@/store/auth";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
import { cleanObjectL1 } from "@/utils/dataCleaner";

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
const emit = defineEmits(["reload"]);
const countryCodes = ref([]);
const { $toast } = useNuxtApp();

const addMember = async (addNewMember: IAddMember) => {
  try {
    const { data } = await useCustomFetch<any>("/members/add/member", {
      method: "POST",
      body: cleanObjectL1({
        ...addNewMember,
        facility_id: currentUserType?.id,
      }),
    });
    if (data.value.return) {
      emit("reload");
      $toast("Fcaility Added successfully!");
    } else {
      $toast(data.value.message);
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
      countryCodes.value = data.map((country) => ({
        label: `${country.name} (${country.dial_code})`,
        value: country.dial_code,
      }));
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
  margin-right: 20px;
  padding: 20px;
  // height: fit-content;
  min-height: calc(100vh - 129px);
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.0784313725);
}
</style>
