 <template>
    <div>
      <div class="row">
        <div class="col-6"> 
          <h1 style="font-size: 23px; margin-top: 10px">Access Levels</h1>
        </div>
     
      <div class="level-headers col-6">
        <span class="level-header">Level 3</span>
        <span class="level-header"  >Level 2</span>
        <span class="level-header" style="margin-right: 35px;">Level 1</span>
      </div>
    </div>
      <!-- Static Home Section -->
      <div class="module">
        <h2 class="module-header">Home</h2>
        
        <div class="module-content">
          <div v-for="functionality in levels.accesslevels[0].Home" :key="functionality.id" class="functionality row" >
            <div class="name col-6">{{ functionality.functionality }}</div>
            <div class=" level-switches col-6">
              <FormKit
      type="switch"
      :name="`level3-${functionality.id}`"
      :model-value="functionality.level3 === '1'"
      @update:model-value="value => updateAccessLevel(functionality.id, 'level3', value)"
    />
    <!-- Level 2 Switch -->
    <FormKit
      type="switch"
      :name="`level2-${functionality.id}`"
      :model-value="functionality.level2 === '1'"
      @update:model-value="value => updateAccessLevel(functionality.id, 'level2', value)"
    />
    <!-- Level 1 Switch -->
    <FormKit
      type="switch"
      :name="`level1-${functionality.id}`"
      :model-value="functionality.level1 === '1'"
      @update:model-value="value => updateAccessLevel(functionality.id, 'level1', value)"
    />
      </div>
          </div>
        </div>
      </div>
  
      <!-- Profiles Section with Accordions -->
      <div class="module">
        <h2 class="module-header">Control Panel</h2>
        <div class="module-content">
          <template v-for="(value, name) in levels.accesslevels[0].Profiles[0]" :key="name">
            <div v-if="Array.isArray(value)" class="sub-category">
              <button @click="toggleAccordion(name)"  :class="{ 'sub-module-header': true, 'is-open': isExpanded(name) }" class="sub-module-header"><span style="margin-left: 30px;">&nbsp;&nbsp;&nbsp;{{ name }}</span></button>
              <div v-if="isExpanded(name)" class="accordion-content">
                <div v-for="subFunctionality in value" :key="subFunctionality.id" class="functionality">
                  <div class="name col-6">{{ subFunctionality.functionality }}</div>
            <div class=" level-switches col-6">
            <!-- Level 3 Switch -->
            <FormKit
          type="switch"
          :name="`level3-${subFunctionality.id}`"
          :model-value="subFunctionality.level3 === '1'"
          @update:model-value="value => updateAccessLevel(subFunctionality.id, 'level3', value)"
        />
        <!-- Level 2 Switch -->
        <FormKit
          type="switch"
          :name="`level2-${subFunctionality.id}`"
          :model-value="subFunctionality.level2 === '1'"
          @update:model-value="value => updateAccessLevel(subFunctionality.id, 'level2', value)"
        />
        <!-- Level 1 Switch -->
        <FormKit
          type="switch"
          :name="`level1-${subFunctionality.id}`"
          :model-value="subFunctionality.level1 === '1'"
          @update:model-value="value => updateAccessLevel(subFunctionality.id, 'level1', value)"
        />
      </div>
          
                </div>
              </div>
            </div>
            <!-- Direct functionalities under Profiles, not collapsible -->
            <div v-else class="functionality">
              <span class="name">{{ value.functionality }}</span>
              <FormKit
          type="switch"
          name="is_public"
        
        />  <FormKit
          type="switch"
          name="is_public"
        
        />  <FormKit
          type="switch"
          name="is_public"
        
        />
            </div>
          </template>
        </div>
      </div>
  
      <!-- Other Modules... -->
  
    </div>
  </template>
  
  
  <script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  const props = defineProps({
    levels: {
      type: Object,
      default: () => ({}),
    },
  });

  const { currentUserType } = useAuthStore();
  const { $toast } = useNuxtApp();
  const expandedSections = ref({});
  
  const toggleAccordion = (section) => {
    expandedSections.value[section] = !expandedSections.value[section];
  };
  
  const isExpanded = (section) => {
    return !!expandedSections.value[section];
  };
  
  const isFunctionalityGroup = (functionalityGroup) => {
    return Object.keys(functionalityGroup).some((key) => Array.isArray(functionalityGroup[key]));
  };

  
  const updateAccessLevel = async (id, level, value) => {
    console.log(id,level,value)
  const { data, error, execute } = useCustomFetch<any>("/accesslevels/update/accesslevels", {
    method: "POST",
    body: JSON.stringify({
      accesslevels: [{ id, [level]: value ? '1' : '0' }],
      facility_id: currentUserType?.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    await execute();

    if (data.value && data.value.return) {
      $toast("Levels updated successfully!");
    } else if (data.value) {
      $toast(data.value.message);
    } else if (error.value) {
      $toast("An error occurred while updating the Levels.");
      console.error("Error:/api/category/edit", error.value);
    }
  } catch (err) {
    console.log("Catch block error:/api/category/edit", err);
    $toast("Failed to edit category due to an exception.");
  }
};

  
  </script>
  

  <style scoped>
  .module {
    margin-bottom: 10px;
  }
  
  .module-header {
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .module-header:hover, .sub-module-header:hover {
    background-color: #f2faff;
    border-radius: 5px;
  }
  .level-headers {
  display: flex;
  justify-content: space-evenly;
  padding: 0px 0;
}
.level-switches {
  display: flex;
  justify-content: space-evenly;
  padding: 0px 0;
 position: relative;
 top: 5px;

}
.level-header {
  /* width: calc(33.333% - 20px); */
  text-align: center;
  font-size: 21px;
  font-weight:600;
  position: relative;
}
  .module-content, .sub-module-content {
    display: flex;
   flex-direction: column;
   justify-content: space-between;
    /* padding-left: 42px; */
    transition: all 0.3s;
    border-radius: 5px;
  }
  
  .sub-module-header {
    width: 100%;
    text-align: left;
    font-size: 18px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 0; /* Adjust the padding to align with the design */
    padding-right: 2.5rem; /* Make room for the dropdown icon */
    position: relative;
  }
  
  .sub-module-header::before {
    content: '';
    background-image: url("~/assets/images/svg/select-dropdown.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.625rem;
    height: 1.125rem;
    position: absolute;
    left: 10px; /* Corrected from 'left: 10;' to 'left: 10px;' */
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.3s;
    pointer-events: none;
  }
  
  .sub-module-header.is-open::before {
    transform: translateY(-50%) rotate(180deg);
  }
  
  .functionality {
    display: flex;
    align-items: center;
    padding: 5px 20px; /* Add padding as requested */
    transition: background-color 0.3s; /* For a smooth hover effect */
    border-radius: 5px;
  }
  
  .functionality:hover {
    background-color: #f2faff; /* Hover effect similar to the header */
  }
  
  .name {
    /* Style for your name class; adjust as needed */
  }
  </style>
  