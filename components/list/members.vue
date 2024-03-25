<template>
  <div v-if="modifiableItems  && modifiableItems.length > 0"> 
        <div class="member-scroll" v-for="(item, index) in modifiableItems" 
         :key="item ? item.id : index" 
         @click="item && item.id ? onClickEdit(item.id) : null">
       <div class="member-box allMembersBox">
       
    <div v-if="item" class="member-row">
      <div class="d-flex member-row-ava-box">
        <div>
          <img v-if="item && item.img_src" class="member-row__avatar avatar" :src="getImageUrl(item.img_src)" 
          >
            <div v-else class="avatar-initials">
              {{ formatName(item.firstname.charAt(0)) }}{{ formatName(item.lastname.charAt(0)) }}
            
            </div>
        </div>
  
        <div class="member-row__data">
           <div class="member-row__name">{{ formatName(item.firstname) }} {{ formatName(item.lastname) }}{{ item.imageError }}</div>
          <div class="d-flex">
          <div class="member-row__time" v-if=" item.membership_status === 'Active'"> 
            {{getDaysLeft(item.end_date)}}
         </div >
            <div v-else   style="color: red;">Inactive</div>
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

const getDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    if (end > today) {
      const diffTime = end - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days left`;
    }
  return '';
};

const modifiableItems = ref([...props.items]);
const checkImages = () => {
  modifiableItems.value.forEach((item, index) => {
    const img = new Image();
    img.onload = () => {}; // Do nothing if image loads successfully
    img.onerror = () => {
      // If image fails to load, set img_src to an empty string
      const newItem = { ...item, img_src: '' };
      modifiableItems.value[index] = newItem;
    };
    img.src = getImageUrl(item.img_src); // This assumes getImageUrl returns a valid URL or an empty string
  });
};

// Call checkImages when the component mounts
onMounted(() => {
  checkImages();
});
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
    padding: 10px;
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
      width: 50%;
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
  background-color: #f2faff; /* Example background color, change as needed */
  color: black; /* Example text color, change as needed */
  font-size: 16px; /* Adjust based on your design */
  font-weight: bold; /* Makes the letters a bit thicker */
  margin-right: 15px;
}
}


</style>