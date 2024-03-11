<template>
    <!-- Filters -->
      <div class="filter-box filterByStatus">
        <a href="#" class="filter-option is-active">All</a>
        <a href="#" class="filter-option filterActive">Active</a>
        <a href="#" class="filter-option filterInactive">Inactive</a>
      </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.filter-box {
  display: flex;

  .filter-option {
    color: #cccccc;
    padding: 8px 12px;
    margin-right: 10px;
    border: 2px solid #f1f2f2;
    border-radius: 10px;
    text-decoration: none;
    transition: $transitionSpeed;
    height: fit-content;

    &:hover {
      border: 2px solid #c2c2c2;
    }

    &.is-active {
      color: #000000;
      border: 2px solid $main-blue;

      &:hover {
        border: 2px solid $main-blue;
      }
    }
  }
}

</style>