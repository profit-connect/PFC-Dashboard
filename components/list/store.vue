<!-- <template>
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
</template> -->
<template>
    <div class="scheduler-member-card">
      <div class="d-flex align-items-center gap-4">
        <!-- Conditional rendering based on imageError -->
        <div v-if="!member.imageError" class="avatar-container">
          <img :src="getImageUrl(member.img_src)" @error="member.imageError = true" alt="Member Avatar" />
        </div>
        <div v-else class="avatar-initials">
          {{ formatName(member.firstname.charAt(0)) }}{{ formatName(member.lastname.charAt(0)) }}
        </div>
        <div class="d-flex flex-column">
          <span class="small-title-medium" style="font-size: 22px">
            {{ formatName(member.firstname) }} {{ formatName(member.lastname) }}
          </span>
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
  // const getDaysLeft = (endDate: string) => {
  //   const today = new Date();
  //   const end = new Date(endDate);
  
  //   if (end > today) {
  //     const diffTime = end - today;
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     return `${diffDays} days left`;
  //   }
  //   return "";
  // };
  const getDaysLeft = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);

  if (isNaN(end)) {
    return "Invalid end date"; // Check if the end date is valid
  }

  if (end > today) {
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days left`;
  }
  return 'Last day'; // Provide a message if the date is not in the future
};
  function formatName(string) {
    if (!string) return "";
    const words = string.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return capitalizedWords.join(" ");
  }
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
  .avatar-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px; /* Adjust size as needed */
    height: 60px; /* Adjust size as needed */
    border-radius: 50%;
    background-color: #84ceff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    /* Add other styling as needed */
  }
  
  </style>
  