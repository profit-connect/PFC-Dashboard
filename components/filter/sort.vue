<template>
  <!-- Filters -->
  <div class="content-filters">
    <div class="filter-switch switchClick">
      <a href="#" class="filter-switch__option is-active sortAZbtn">A - Z</a>
      <a href="#" class="filter-switch__option sortZAbtn">Z - A</a>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.filter-switch {
  display: flex;
  align-items: center;
  background: #f2faff;
  border-radius: 10px;
  padding: 4px;
  height: fit-content;

  &__option {
    color: #cccccc;
    padding: 4px 12px;
    text-decoration: none;

    &.is-active {
      color: #ffffff;
      text-decoration: none;
      border-radius: 10px;
      background: $main-blue;
      box-shadow: 0px 3px 6px #00000029;
    }
  }

  &.is-disabled {
    background: #eaeaea;
    cursor: not-allowed;
    pointer-events: none;

    &__option {
      &.is-active {
        background: #9ad7ff;
      }
    }
  }
}
.filter-switch__option {
  color: #ccc;
  padding: 4px 12px;
  text-decoration: none;
}
.filter-switch__option.is-active {
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  background: #84ceff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1607843137);
}
</style>
