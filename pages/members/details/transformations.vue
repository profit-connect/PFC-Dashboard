<template>
  <section class="content-section">
    <SidebarUpdateMember v-model:member-id="memberId" />

    <SidebarTransformations v-model:member-id="memberId" />
  </section>
</template>

<script lang="ts" setup>
const memberId = useRoute().query.id;

</script>
<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}
</style>

