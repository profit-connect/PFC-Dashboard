<template>
    <!-- <div class="staff-row">
      <div class="staff-box editStaffBtn">
        <div class="staff-box__avatar">
          <img src="~/assets/images/team/Ethan.png?timestamp=1703677016330" alt="Avatar">
        
        </div>

        <div class="staff-box__info">
          <div class="staff-box__info-name">Ethan</div>
          <div class="staff-box__info-position">COO</div>
          <div class="staff-box__info-status available">Available</div>
        </div>
      </div>
    

      <div class="staff-box editStaffBtn">
        <div class="staff-box__avatar">
          <img src="~/assets/images/team/Nica.png?timestamp=1703677016330" class="staff-box__avatar" alt="Avatar">
          <div class="hover-info">
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
          </div>
        </div>

        <div class="staff-box__info">
          <div class="staff-box__info-name">Nica</div>
          <div class="staff-box__info-position">Reset Fitness</div>
          <div class="staff-box__info-status available">Available</div>
        </div>
      </div>

      <div class="staff-box editStaffBtn">
        <div class="staff-box__avatar">
          <img src="~/assets/images/team/Ethan.png?timestamp=1703677016330" alt="Avatar">
          <div class="hover-info">
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
          </div>
        </div>

        <div class="staff-box__info">
          <div class="staff-box__info-name">Amira</div>
          <div class="staff-box__info-position">Community Manager</div>
          <div class="staff-box__info-status available">Available</div>
        </div>
      </div>

      <div class="staff-box editStaffBtn">
        <div class="staff-box__avatar">
          <img src="~/assets/images/team/Ethan.png?timestamp=1703677016330" alt="Avatar">
          <div class="hover-info">
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
          </div>
        </div>

        <div class="staff-box__info">
          <div class="staff-box__info-name">Clayton</div>
          <div class="staff-box__info-position">Head Coach</div>
          <div class="staff-box__info-status available">Available</div>
        </div>
      </div>

      <div class="staff-box editStaffBtn">
        <div class="staff-box__avatar">
          <img src="~/assets/images/team/Ethan.png?timestamp=1703677016330" alt="Avatar">
          <div class="hover-info">
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
            <a href="/" class="hover-info__link"></a>
          </div>
        </div>

        <div class="staff-box__info">
          <div class="staff-box__info-name">Kris</div>
          <div class="staff-box__info-position">Coach</div>
          <div class="staff-box__info-status available">Available</div>
        </div>
      </div>


    </div> -->

    <div class="staff-day d-flex flex-wrap">
      <div
        class="card rounded px-3 py-3 m-1"
      >
        <div class="d-flex align-items-center gap-2">
          <div class="hover-wrapper">
          <img class="profile-image" src="~/assets/images/team/Ethan.png?timestamp=1703677016330" />
          <div class="hover-wrapper">
        <div
          class="hover-info"
          :class="{ 'is-visible': isHovering }"
          @mouseover="isHovering = true"
          @mouseleave="isHovering = false"
        >
      <a   :href="`/members/membership-overview`" class="hover-info__link">
        <img src="~/assets/images/svg/schedule-profile-white.svg" alt="Profile icon" class="img-normal"/>
        <img src="~/assets/images/svg/schedule-profile-blue.svg" alt="Profile icon" class="img-hover" />
      </a>
      <a href="/" class="hover-info__link">
        <img src="~/assets/images/svg/schedule-chat-white.svg" alt="Chat icon" class="img-normal"/>
        <img src="~/assets/images/svg/schedule-chat-blue.svg" alt="Chat icon" class="img-hover" />
      </a>
      <div  class="hover-info__link">
        <img src="~/assets/images/svg/schedule-cancel-white.svg" alt="Cancel icon" class="img-normal"/>
        <img src="~/assets/images/svg/schedule-cancel-blue.svg" alt="Cancel icon" class="img-hover" />
      </div>
    </div>
  </div>
</div>
<div class="">
          <div class="staff-box__info-name">Ethan</div>
          <div class="staff-box__info-position">COO</div>
          <div class="staff-box__info-status available">Available</div>
        </div>
</div>
</div>

 </div>
 </template>
 
 <script setup>
 import { ref } from 'vue';

 
 const scheduleDays = ref([
 { name: 'Tuesday', checked: false, from: '', to: '' },
   { name: 'Thursday', checked: false, from: '', to: '' },
   { name: 'Saturday', checked: false, from: '', to: '' },
   { name: 'Sunday', checked: false, from: '', to: '' },
   { name: 'Monday', checked: false, from: '', to: '' },
   { name: 'Tueday', checked: false, from: '', to: '' }
   // ... other days
 ]);
 const isHovering = ref(false)
 // Add additional logic as needed
 </script>
 
 <style scoped>
/* .staff-row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
}
.staff-row .staff-box {
    display: flex;
    align-items: center;
    background: #f2faff;
    padding: 15px 35px 15px 15px;
    height: fit-content;
    border-radius: 10px;
    margin: 0 15px 15px 0;
    border: 2px solid transparent;
    transition: 220ms;
}
.staff-row .staff-box__avatar .hover-info {
    position: absolute;
    display: flex;
    bottom: -10px;
    left: -15px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s,opacity .3s linear;
}
.staff-row .staff-box__avatar {
    position: relative;
    width: 100px;
    height: 100px;
}
.staff-row .staff-box__info {
    margin-left: 25px;
    width: min-content;
}
.staff-row .staff-box__info-status.available {
    color: #84ceff;
} */

.staff-day {
     display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
  .profile-image {
    width: 100px;
    height: 100px;
     
    border-radius: 50%;
    object-position: center;
  }
  .coaches,
  .many-coaches {
    img {
      height: 34px;
      width: 34px;
      border-radius: 50%;
      /* // margin-bottom: 30px; */
    }
  }
  .info {
    list-style: none;
    display: flex;
    gap: 8px;
    align-items: center;
    gap: 18px;
    li {
      display: flex;
      align-items: center;
      max-width: 64px;
      font-size: 11px;
      line-height: 12px;
      gap: 8px;
      h3 {
        margin: 0px;
      }
    }
  }


  .hover-info {
    position: absolute;
    display: flex;
    bottom: 2px;
    gap: 5px;
    left: 10px;
    visibility: visible; /* Initially hidden */
    opacity: 0; /* Start fully transparent */
    transition: visibility 0s, opacity 0.3s linear; /* Smooth transition for opacity */
}

.hover-wrapper:hover .hover-info {
    visibility: visible;
    opacity: 1;
}

.hover-info__link {
    display: block;
    width: 35px;
    height: 35px;
    box-shadow: 0 10px 20px rgba(0,0,0,.16);
    background-color: #fff;
    border-radius: 50%;
    transition: .35s;
    position: relative;
    cursor: pointer;
}




.img-normal {
    width: 100%;
    transition: transform 0.3s ease;
}

.img-hover {
    display: none; /* Hide blue images initially */
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
}

.hover-info__link:hover .img-normal {
    display: none; /* Hide white images on hover */
}

.hover-info__link:hover .img-hover {
    display: block; /* Show blue images on hover */
}


}
.card {
  height: 131px;
  width: 245px;
}
 </style>
 