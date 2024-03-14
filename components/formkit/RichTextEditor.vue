<template>
  <div style="width: 100%;">
    <QuillEditor
      :modelValue="props?.context?._value"
      @update:modelValue="handleInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  context: Object,
});

function handleInput(newValue) {
  console.log(newValue)
  props?.context?.node.input(newValue);
}
</script>

  <style scoped>
  :deep(.ql-toolbar) {
    margin-top: 10px;
    padding: 10px;
    height: 50px;
    background: white;
    border-radius: 10px 10px 10px 10px; /* Rounded top corners */
    width: 100%;
  }
  
  :deep(.ql-container) {
    margin-top: 20px;
    background: var(--fk-bg-input, #c42727);
    /* border: 1px solid #ccc;  */
    border: none; /* Remove top border to blend with the toolbar */
    border-radius: 0 0 4px 4px; /* Rounded bottom corners */
    
    width: 100;
  }
  
  :deep(.ql-editor) {
    min-height: 200px; /* Minimum height */
  }
  :deep(.ql-container) {
  display: flex;
  flex-direction: column-reverse;
}

  :deep(.ql-snow .ql-picker-label:hover),
  :deep(.ql-snow .ql-picker-label.ql-active),
  :deep(.ql-snow .ql-picker-item:hover),
  :deep(.ql-snow .ql-picker-item.ql-selected),
  :deep(.ql-snow .ql-toolbar button:hover),
  :deep(.ql-snow .ql-toolbar button:focus),
  :deep(.ql-snow .ql-toolbar button.ql-active),
  :deep(.ql-toolbar button:hover),
  :deep(.ql-toolbar button:focus),
  :deep(.ql-toolbar button.ql-active) {
    color: #385898; /* Dark blue for buttons and options */
  }
  
  :deep(.ql-toolbar button) {
    outline: none; /* Remove outline */
    border: none; /* Remove border */
    border-radius: 5px;
    background:  var(--fk-bg-input, #c42727);
    margin-left: 20px;
    height: 30px;
    width: 30px;
  }
  
  :deep(.ql-stroke) {
    stroke: #84CEFF;
  }
  :deep(.ql-fill) {
    stroke: #84CEFF;
  }
  :deep(.ql-toolbar.ql-snow .ql-picker-label) {
    border: 1px solid transparent;
    border-radius: 5px;
    background:  var(--fk-bg-input, #c42727);
    height: 30px;
    height: 35px;
    font: "Poppins Medium", sans-serif, Arial;
    padding-top: 10px;
    position: relative;
    bottom: 6px;
   
}

  </style>
  