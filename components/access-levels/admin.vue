 <template>
    <div>
      <h1 style="font-size: 22px; margin-bottom: 0px">Access Levels</h1>
  
      <!-- Static Home Section -->
      <div class="module">
        <h2 class="module-header">Home</h2>
        <div class="module-content">
          <div v-for="functionality in levels.accesslevels[0].Home" :key="functionality.id" class="functionality">
            <span class="name">{{ functionality.functionality }}</span>
            <!-- Render your switches here for each access level -->
          </div>
        </div>
      </div>
  
      <!-- Profiles Section with Accordions -->
      <div class="module">
        <h2 class="module-header">Profiles</h2>
        <div class="module-content">
          <template v-for="(value, name) in levels.accesslevels[0].Profiles[0]" :key="name">
            <!-- Check if the property is an array, indicating it's a sub-category -->
            <div v-if="Array.isArray(value)" class="sub-category">
              <button @click="toggleAccordion(name)"  :class="{ 'sub-module-header': true, 'is-open': isExpanded(name) }" class="sub-module-header"><span style="margin-left: 30px;">{{ name }}</span></button>
              <div v-if="isExpanded(name)" class="accordion-content">
                <div v-for="subFunctionality in value" :key="subFunctionality.id" class="functionality">
                  <span class="name">{{ subFunctionality.functionality }}</span>
                  <!-- Render your switches here for each access level -->
                </div>
              </div>
            </div>
            <!-- Direct functionalities under Profiles, not collapsible -->
            <div v-else class="functionality">
              <span class="name">{{ value.functionality }}</span>
              <!-- Render your switches here for each access level -->
            </div>
          </template>
        </div>
      </div>
  
      <!-- Other Modules... -->
  
    </div>
  </template>
  
  
  <script lang="ts" setup>
  const props = defineProps({
    levels: {
      type: Object,
      default: () => ({}),
    },
  });
  
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
  </script>
  

  <style scoped>
  .module {
    margin-bottom: 10px;
  }
  
  .module-header {
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 42px;
    margin-top: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .module-header:hover, .sub-module-header:hover {
    background-color: #e2e8f0;
  }
  
  .module-content, .sub-module-content {
    padding-left: 42px;
    transition: all 0.3s;
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
    padding: 10px 0; /* Add padding as requested */
    transition: background-color 0.3s; /* For a smooth hover effect */
  }
  
  .functionality:hover {
    background-color: #f2faff; /* Hover effect similar to the header */
  }
  
  .name {
    /* Style for your name class; adjust as needed */
  }
  </style>
  