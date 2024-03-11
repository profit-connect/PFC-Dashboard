<template>
    <div class="staff-row">
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
 
 // Add additional logic as needed
 </script>
 
 <style scoped>
.staff-row {
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
}
 </style>
 