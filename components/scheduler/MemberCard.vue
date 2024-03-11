<template>
  <div class="scheduler-member-card">
    <div class="d-flex align-items-center gap-4">
      <NuxtImg :src="getImageUrl(member.img_src)" />
      <div class="d-flex flex-column">
        <span class="fw-bold" style="font-size: 22px"
          >{{ member.firstname }} {{ member.lastname }}</span
        >
        <span style="font-size: 14px; color: skyblue">{{ daysLeft }}</span>
      </div>
    </div>
    <MixButton label="" @click="$emit('onSelect')" size="lg" />
  </div>
</template>

<script lang="ts" setup>
defineEmits(["onSelect"]);
const props = defineProps({
  member: {
    type: Object,
    default: () => {},
  },
});
const { getUrl: getImageUrl } = useBoImage();

const daysLeft = computed(() => {
  if (props.member) return getDaysLeft(props.member.end_date);
});
const getDaysLeft = (endDate: string) => {
  const today = new Date();
  const end = new Date(endDate);

  if (end > today) {
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days left`;
  }
  return "";
};
</script>

<style scoped lang="scss">
.scheduler-member-card {
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid white;
  &.active {
    border: 1px solid $main-blue;
  }
  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
}

</style>
