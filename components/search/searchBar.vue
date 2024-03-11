<template>
  <div class="search-with-icon">
    <FormKit
      type="search"
      label="FormKit Input"
      placeholder="Search..."
      @input="onSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from "@vueuse/core";
const emit = defineEmits(["on-search"]);

const onSearch = useDebounceFn((data) => {
  emit("on-search", data);
}, 100);
</script>
<style lang="scss" scoped>
.search-with-icon {
  position: relative;

  input {
    padding: 16px 16px 16px 60px;
    position: relative;
    width: 100%;
    color: #000;
    font-size: 0.875rem;
    line-height: 1.15;
    border: 1px solid #f2faff;
    border-radius: 10px;
    transition: all 0.2s ease;
    background: #f2faff;
    margin-bottom: 20px;
  }
  input.bold-input {
    padding: 0.7rem 1rem;
    font-size: 1.1rem;
  }
  input:focus,
  input:hover {
    border-color: #84ceff;
    outline: 0;
    box-shadow: none;
  }
  input:disabled,
  input:read-only {
    border-color: #f2faff;
    background-color: #e6e6e6;
  }
  input::placeholder {
    color: #000;
  }
  input.invalid,
  input.is-invalid {
    border-color: red;
  }
  input.invalid::placeholder,
  input.is-invalid::placeholder {
    color: red;
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.border-style {
    border: 2px solid #e6e7e8;
    background: 0 0;
    padding: 5px 8px;
  }
  input.border-style::placeholder {
    color: #ccc;
  }
  input.border-style:disabled,
  input.border-style:read-only {
    background-color: #e6e6e6;
  }
  input.is-disabled {
    background: #f2f2f2;
    pointer-events: none;
  }

  img {
    position: absolute;
    top: 16px;
    left: 20px;
  }
}
</style>
