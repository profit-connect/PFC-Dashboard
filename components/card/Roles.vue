<template>
    <div  class="card-package" > 
        <div  class="title" role="button"
        >
       <span>{{ title }}  </span>
        </div>
    
        <div class="desc">
          <span>{{ description }}</span>
        </div>
    
        <div class="d-flex align-items-center gap-5">
        <div >
         <img v-if="dashboard_access == 'Yes'" src="~assets/images/svg/icon-material-computer.svg"  />
         <img v-else src="~assets/images/svg/icon-material-computer-gray.svg"  />
        </div>
        <div>
            <img v-if="admin_app_access == 'Yes'" src="~assets/images/svg/ionic-ios-phone-portrait.svg"  />
            <img v-else src="~assets/images/svg/ionic-ios-phone-portrait-gray.svg"  />
        </div> 
        <div >
         <img v-if="on_payroll == 'Yes'" src="~assets/images/svg/icon-material-payment.svg"  />
         <img  v-else src="~assets/images/svg/icon-material-payment-gray.svg"  />
        </div>
        <div>
            <img  v-if="performance_monitored == 'Yes'" src="~assets/images/svg/icon-ionic-ios-stats.svg"  />
            <img v-else src="~assets/images/svg/icon-ionic-ios-stats-gray.svg"  />
        </div>
    </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    access_level: {
      type: String,
      default: "",
    },
    dashboard_access: {
      type: String,
      default: "",
    },
    admin_app_access: {
      type: String,
      default: "",
    },
    on_payroll:{
      type: String,
      default: "",
    },
    performance_monitored:{
      type: String,
      default: "",
    },
    updated_date: {
      type: String,
      default: "",
    },

  });
 
  const emit = defineEmits([
    "on-planstatus-change",
    "on-featured-change",
    "on-plan-select",
  ]);
  

  </script>
  
  <style scoped lang="scss">
  .card-package {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: relative;
      background: #f2faff;
      padding: 8px;
      border-radius: 10px;
      width: 230px;
      min-height: 130px;
      cursor: pointer;
      // margin-left: 15px;
    //   margin-bottom: 15px;
      &.inactive-package {
      // background-color: #E6E7E8; // Setting background color to yellow
      opacity: 0.25;
    }
   
  }


  .title{
    width: 100%;
    // font-style: italic;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    min-height: 0px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .desc{
    width: 100%;
    font-size: 10px;
    margin-bottom: 9px;
    color: #000;
    min-height: 5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }
  
  </style>
 
  