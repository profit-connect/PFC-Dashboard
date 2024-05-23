<template>
    <section class="content-section">
      <div class="sidebar-box">
      <p class="alloc-head">Allocation this week</p> 
      <div class="amount-box d-flex align-items-center justify-content-between">
        <p class="m-0">AED <span>9,400</span></p>
        <MixButton
              disableIcon
              variant="transparent-btn"
              size="sm"
              label="Auto-Fill"
              svg= "~assets/images/svg/magic-wand.svg"
        />
      </div>
      <div class="top-search">
        <SearchBar placeholder="Search Staff Name or Role"/>
      </div>
      <div class="card-staff">
        <template v-for="n in 6" :key="n">
            <CardRoster
                firstname="Umang"
                role="Coach"
                description="16 Hours this week"
                fees="AED 1600"
                img_src="/upload/1/image/staff/1.jpg?timestamp=1712960580883"
                :hover_menu="false"
            />
        </template>
      </div>
        </div>
      <div class="content-box">
        <RosterStaffRoster
        @sidebar-month-view="monthview"/>
      </div>
      <!-- <RosterCalendar /> -->
    </section>
  </template>
  
  <script lang="ts" setup>
  // import { useAuthStore } from "~/store/auth";
  const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();
  import { useBreadcrumbStore } from "~/store/breadcrumb";
  setBreadcrumbTab({
      items: [
        {
          label: "General", link: `/facility`,
        },
        { label: "Timing", link: `/facility/timing` },
        { label: "Staff", link: `/facility/staff` },
        { label: "Roster", link: `/facility/roster` },
        { label: "Forms", link: `/facility/forms` },
        { label: "Tags", link: `/facility/tags` },
        // { label: "Payments", link: `/facility/payments` },
        // { label: "Discount Codes", link: `/facility/discount` },
        // { label: "Tax", link: `/facility/tax` },
        // { label: "Activity", link: `/facility/activity` },
      ],
    });
  
  const breadcrumbStore = useBreadcrumbStore();
  breadcrumbStore.setBreadcrumb({
    items: [
      { label: "Facility", link: "" },
      { label: "Roster", link: "" },
    ],
  });
  
  breadcrumbStore.setStyles({
    position: "relative",
    right: "-20px",
  });
  
 
  const SidebarMonthView = ref(false);
  
  const  monthview = ()=> {
    SidebarMonthView.value = !SidebarMonthView.value;
  };
  </script>
  
  <style lang="scss" scoped>
  .content-section {
    display: flex;
    justify-content: center;
    margin: 0 15px;
  }
  
  .content-box {
    position: relative;
    width: 70vw;
    max-width: 950px;
    margin: unset;
    height: fit-content;
    min-height: calc(100vh - 68px);
    border-radius: 0px 0px 0px 0px;
  }
  
  .sidebar-box {
    max-width: 400px;
    width: 30vw;
    margin-right: 20px;
    margin-left: 20px;
    padding: 20px;
    height: fit-content;
    min-height: calc(100vh - 68px);
    background: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.0784313725);
    padding-bottom: 30px;
    border-radius: 0px 0px 0px 0px;
  }
  
  .sidebar-box {
  
    &__title {
      display: block;
      text-decoration: none;
      transition: $transitionSpeed;
  
      .editUserOccupation {
        color: #323a45;
      }
  
      .editUserName {
        transition: $transitionSpeed;
      }
  
      &:hover {
        .editUserName {
          color: $main-blue;
        }
      }
    }
  
    .icon-text {
      display: flex;
      margin-bottom: 10px;
    }
    .icon-text img {
      display: block;
      margin-right: 10px;
    }
  
    .social-show__icons {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .social-show__icons h3 {
      width: 100%;
    }
    .social-show__icons .icon-text {
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: column;
    }
    .social-show__icons .icon-text img {
      margin-bottom: 10px;
      margin-right: 0;
    }
    .upload-image {
      margin: 15px 0 10px;
    }
    .small-title-bold {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .goBackShowMode {
      font: 14px "Poppins Regular", sans-serif, Arial;
      cursor: pointer;
      padding: 5px 12px;
      border: 1.5px solid #84ceff;
      border-radius: 5px;
      background: 0 0;
      transition: 0.35s;
    }
    .data-block-show {
      margin-bottom: 30px;
    }
    .editgetMemberInfo {
      opacity: 0.4;
      cursor: pointer;
      transition: 0.35s;
    }
  }
  .facility-image {
    border-radius: 10px;
  }
  .alloc-head{
    line-height: 16px;
    font-size: 14px;
    color: #000;
    margin: 10px 0;
  }
  .transparent-btn{
    height: 40px;
    background:transparent;
    border:2px solid #E6E7E8;
    border-radius: 10px;
    padding: 10px;
    color: #CCCCCC; 
    font-size: 14px;
    line-height: 16px;
  }
  .amount-box{
    margin-bottom: 15px;
  }
  .amount-box p{
    font-size: 36px;
    color: #002E4B;
  }
  .amount-box p span{
    font-weight: bold;
  }
  </style>
  