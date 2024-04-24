<template>
  <header class="nav-header w-100">
    <div class="d-flex  justify-content-between align-items-center h-100 mx-5" >

  <NuxtLink to="/"
  > <img  class="logo" src="~/assets/images/logo-home-small.png" />
      </NuxtLink>
    
   <div style="margin-right: 35%;">  <NavigationMenu /></div> 
        <NavigationFacilityDropdown />
        <NavigationUserDropdown />
       
     
    
  </div>
  </header>
</template>

<style lang="scss" scoped>
.nav-header {
  transition: 300ms;
  height: 86px;
  background: $main-dark-blue;
}
.logo{
  height: 35px;
  margin-top: 10px;
}
</style>
