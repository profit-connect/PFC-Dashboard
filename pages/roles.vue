
<template>
    <div class="container bg-white h-full p-4">
      <div class="content__title-box">
        <div class="content-left">
          <div>
            <h1>Roles</h1>
          </div>
          <div class="addNewBtn addNewPackage createRow" @click="onAddNewRole">
            <div class="plus">+</div>
            <div class="text-add">&nbsp;New Role</div>
          </div>
        </div>
        <div>
         <div class="d-flex align-items-center gap-4">
          <div class="access">
            <img src="~assets/images/svg/icon-material-computer.svg"  />
              &nbsp; Dashboard Access
          </div>
          <div class="access">
            <img src="~assets/images/svg/ionic-ios-phone-portrait.svg"  />
              &nbsp; Admin App Access
          </div>
          <div class="access">
            <img src="~assets/images/svg/icon-material-payment.svg"  />
              &nbsp; On Payroll
          </div>
          <div class="access">
            <img src="~assets/images/svg/icon-ionic-ios-stats.svg"  />
              &nbsp; Performance Monitored
          </div>

         </div>
        </div>
      </div>
      
        <div class="d-flex align-items-center row levels">
      <div class="access-title col-3">
        Level 4
        </div>
        <div class="cards col-9">
        <CardRoles />
      </div>
    </div>
    <div class="d-flex align-items-center row levels">
      <div class="access-title col-3">
        Level 3
        </div>
        <div class="cards col-9">
        <CardRoles />  <CardRoles />  <CardRoles />  <CardRoles />  <CardRoles />  <CardRoles />   
      </div>
    </div>
    <div class="d-flex align-items-center row levels">
      <div class="access-title col-3">
        Level 2
        </div>
        <div class="cards col-9">
        <CardRoles />
      </div>
    </div>
    <div class="d-flex align-items-center row levels">
      <div class="access-title col-3">
        Level 1
        </div>
        <div class="cards col-9">
        <CardRoles />
      </div>
    </div>
    <Modal v-model="showRolesForm" id="roles-modal">
      <template #title>
        <!-- {{ selectedPackage ? "Update" : "Create" }} a Role -->
      </template>
      <FormRoles
        v-if="showRolesForm"
        @reload="refresh"
        @close-canvas="showRolesForm = false"
      />
    </Modal>
     
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useBreadcrumbStore } from "~/store/breadcrumb";

  const breadcrumbStore = useBreadcrumbStore();
  breadcrumbStore.setBreadcrumb({
    items: [
      { label: "Control", link: "#" },
      { label: "Roles ", link: "#" },
    ],
  });
  
  breadcrumbStore.setStyles({
    position: "relative",
    right: "0px",
  });

  const showRolesForm = ref(false);
  const data = ref({
  accessLevel1: {
    title: "Title for Access Level 1",
    description: "Description for Access Level 1"
  },
  accessLevel2: {
    title: "Title for Access Level 2",
    description: "Description for Access Level 2"
  },
  accessLevel3: {
    title: "Title for Access Level 3",
    description: "Description for Access Level 3"
  },
  accessLevel4: {
    title: "Title for Access Level 4",
    description: "Description for Access Level 4"
  }
  // Add more access levels if needed
});

const onAddNewRole = () => {
  // selectedPackage.value = null; // Reset selectedPackage
  showRolesForm.value = true; // Show the form for a new package
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
    max-width: 1396px;
    margin: unset;
    height: fit-content;
  }
  
  .content__title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .content-left {
    display: flex;
    align-items: center;
  }
  
  .content__title-box .addNewBtn {
    width: 150px;
    height: 40px;
    margin-top: 0;
    margin-left: 15px;
  }
  
  .addNewBtn .plus {
    border: 1px solid #84ceff;
    width: 14px;
    height: 14px;
    color: #84ceff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .addNewBtn {
    display: flex;
    background: #f2faff;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    cursor: pointer;
    margin-right: 12px;
    transition: 0.35s;
  }
  .addNewBtn .text-add {
    margin-left: 5px;
  }
  .access{
    font-size: 12px;
  }
  .access-title {
    font-size: 22px;
    font-weight: bold;
  }
  .levels {
  min-height: 200px;
  border-bottom: 3px solid #E6E7E8;
  padding: 20px;

  &:last-child {
    border-bottom: none; /* Removes the border for the last .levels element */
  }
}

 .cards {
  display: flex;
  flex-wrap: wrap; /* This allows the cards to wrap to the next line */
  gap: 20px;
}

  </style>
  