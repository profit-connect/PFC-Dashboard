<template>
  <div v-if="items  && items.length > 0">  
        <div class="member-scroll" v-for="(item, index) in items" 
         :key="item ? item.id : index" 
         @click="item && item.id ? onClickEdit(item.id) : null">
       <div class="member-box allMembersBox">
       
    <div v-if="item" class="member-row">
      <div class="d-flex align-items-center member-row-ava-box">
        <div>
          <!-- Only display img if img_src is truthy and imageError is not set -->
          <img v-if="item && item.img_src && !item.imageError" class="member-row__avatar avatar" :src="getImageUrl(item.img_src)" @error="() => item.imageError = true" alt="Member Avatar">
          <!-- Display initials if img is falsy or imageError is true -->
          <div v-else class="avatar-initials">
            {{ formatName(item.firstname.charAt(0)) }}{{ formatName(item.lastname.charAt(0)) }}
          </div>
        </div>
  
        <div class="member-row__data">
           <div class="member-row__name">{{ formatName(item.firstname) }} {{ formatName(item.lastname) }}</div>
          <div class="d-flex">
          <div class="member-row__time" v-if=" item.membership_status === 'Active'"> 
            {{getDaysLeft(item.end_date)}}   <span style="font-size: 14px; color: #323a45;">&nbsp;| Reset Fitness</span> 
         </div >
         <div v-else class="d-flex gap-2">
          <span style="font-size: 14px; color: red">Inactive</span>  |
          <span style="font-size: 14px;">Reset Fitness</span> 
        </div>
            <!-- <div>occupation  </div> -->
          </div>
          
        </div>
      </div>

      <div class="member-row__phone">
        <img src="~/assets/images/svg/phone.svg" alt="Member phone">
        <div> {{item.country_code}} {{item.contactno}} </div>
      </div>

      <div class="member-row__email">
        <img src="~/assets/images/svg/email.svg" alt="Member email">
        <div> {{item.email}} </div>
      </div>
    </div>
    
  </div>
      </div>
  </div>

  </template>
  
  <script lang="ts" setup>
  import { getImage } from "~/utils/providers/boImage";
  const props = defineProps({
 
  items: {
    type: Array<string>,
    default: [],
  },
});

const emit = defineEmits([ "edit"]);
const { getUrl: getImageUrl } = useBoImage();

const onClickEdit = (tab: number) => {
  emit("edit",tab);
};

function formatName(string) {
  if (!string) return '';
  const words = string.split(' ');
  const capitalizedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
}

// const getDaysLeft = (endDate) => {
//     const today = new Date();
//     const end = new Date(endDate);

//     if (end > today) {
//       const diffTime = end - today;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return `${diffDays} days left`;
//     }
//   return '';
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

const onImageError = (event, item) => {
  // Log error or perform additional actions
  console.error(`Failed to load image for member ${item.id}`);
  item.img_src = '~/assets/default-image.png'; // Path to your default image
};


  </script>


  <style lang="scss" scoped>


.member-scroll {
  max-height: calc(100vh - 300px);
  padding: 0 10px 10px 0;
  margin-right: -20px;
  overflow: auto;
  @include customScrollbar();

  .member-box {
    overflow: hidden;
  }

  .member-row {
    display: flex;
    margin-top: 10px;
    border-radius: 10px;
    // padding: 10px;
    padding: 10px 50px 10px 10px;
    cursor: pointer;
    background: transparent;
    transition: $transitionSpeed;
    justify-content: space-between;

    &:hover,
    &.is-active {
      background: #f2faff;
    }

    &__avatar {
      width: 60px;
      height: 60px;
      margin-right: 15px;
      border-radius: 50%;
    }

    .default-avatar {
      width: 60px;
      height: 60px;
      margin-right: 15px;
    }

    .member-row-ava-box {
      width: 40%;
    }

    &__data {
      .member-row__name {
        font: 22px $font-family-medium;
      }

      .member-row__time {
        color: $main-blue;
        margin-right: 7px;
      }
    }

    &__phone,
    &__email {
      display: flex;
      align-items: center;
      margin-left: 15px;
      width: 25%;

      img {
        width: 16px;
        margin-right: 5px;
      }
    }
  }

  .member-no-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    font-size: 22px;
    text-align: center;

    img {
      max-width: 200px;
    }
  }
  .avatar-initials {
  display: flex;
  align-items: center; /* Centers the initials vertically */
  justify-content: center; /* Centers the initials horizontally */
  width: 60px;
  height:60px;
  border-radius: 50%; /* Makes the div circular */
  background-color: #84ceff; /* Example background color, change as needed */
  color: white; /* Example text color, change as needed */
  font-size: 16px; /* Adjust based on your design */
  font-weight: bold; /* Makes the letters a bit thicker */
  margin-right: 15px;
}
}


</style>