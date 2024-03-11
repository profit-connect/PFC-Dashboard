<template>
  <div class="replies group-hover">
    <FormKit
      type="form"
      :modelValue="selectedPackage"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div>
        <div class="d-flex align-items-center">
          <h3 style="font-size: 14px; font-weight: bold" class="mb-1">
            {{ reply.user_name }} &nbsp;
          </h3>
          <span style="font-size: 10px">{{
            calculateTimeSince(reply.updated_date, reply.updated_time)
          }}</span>
        </div>
        <div
          class="d-flex align-items-center justify-content-between gap-4"
          v-if="!isActivated"
        >
          <div class="description">
            <span style="font-size: 14px"> {{ reply.reply }}</span>
          </div>
          <img
            v-if="
              [loggedUser.firstname, loggedUser.lastname].includes(
                reply.user_name
              )
            "
            @click="setEditId(reply.id)"
            class="editgetMemberInfo hover-show"
            role="button"
            src="~assets/images/svg/edit-icon.svg"
          />
        </div>
        <div
          class="d-flex align-items-center justify-content-between gap-4"
          v-else
        >
          <FormKit
            type="text"
            placeholder="Edit a note reply "
            v-model="form.reply"
            input-class="bg-white "
            :classes="{
              outer: 'flex-grow-1',
            }"
            class="custom-input flex-grow-1"
          />

          <div class="d-flex gap-2 align-items-center">
            <FormKit
              style="
                background-color: transparent;
                font-size: 14px;
                border: 2px;
                border-style: solid;
                border-color: #84ceff;
                margin: 0px;
                width: 120px;
                height: 37px;
              "
              label="Update"
              type="submit"
            />
            <MixButton
              style="
                background-color: transparent;
                font-size: 16px;
                height: 36px;
              "
              disableIcon
              variant="bg-secondary text-white mb-3"
              @click="closeEditMode"
              size="sm"
              label="Cancel"
            />
          </div>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
const { $toast } = useNuxtApp();
const props = defineProps({
  reply: {
    type: Object,
    required: true,
  },
});

const form = ref({
  reply: props.reply.reply,
});
const { isActivated, closeEditMode, setEditId } = useEditMode();
const { calculateTimeSince } = useTimeSince();
const { loggedUser, currentUserType } = useAuthStore();
const emit = defineEmits();
const submitHandler = async () => {
  try {
    const { data } = await useCustomFetch<any>("/members/update/notesreply", {
      method: "POST",
      body: {
        ...form.value,
        notes_reply_id: props.reply.id,
        facility_id: currentUserType?.id,
      },
    });

    $toast(data.value.message);
    await emit("reload");
    closeEditMode();
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};
</script>

<style scoped>
.replies {
  border-left: 5px solid#84ceff;
  padding: 10px;
  box-sizing: border-box;
}
.goBackShowMode {
  font: 14px "Poppins Regular", sans-serif, Arial;
  cursor: pointer;
  padding: 5px 12px;
  border: 1.5px solid #84ceff;
  border-radius: 5px;
  background: 0 0;
  transition: 0.35s;
  width: 80px;
}
</style>
