<template>
    <div style="width: 100%;">
      <ClientOnly>
        <Editor
          api-key="12bwrmqqt34koqswgd8ipw4w37doiig4gf4a09nm2icmvm3h"
          v-model="editorContent"
          :init="{
            height: 500,
            menubar: false,
            statusbar: false, 
            readonly: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            content_style: 'body { background-color: #f2faff; border: none; }'
          }"
          @update:modelValue="handleInput"
        />
      </ClientOnly>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, ref, computed, onMounted } from 'vue';
  import Editor from '@tinymce/tinymce-vue';
  
  // Props and editor content setup
  const props = defineProps({
    context: Object,
  });
  const emit = defineEmits(['update:modelValue']);
  const editorContent = computed(() => props.context._value);
  
  // Function to handle input from TinyMCE editor
  function handleInput(newValue) {
    emit('update:modelValue', newValue);
    if (props?.context?.node?.input) {
      props.context.node.input(newValue);
    } else {
      console.error('FormKit context or node.input method not available');
    }
  }
  
  // Inject custom styles for TinyMCE toolbar buttons on component mount
  onMounted(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .tox .tox-toolbar__primary .tox-tbtn {
        background-color: #f2faff !important;
        color: white !important;
      }
      .tox .tox-edit-area {
      border: none !important; /* Removes border around the edit area */
    }
    .tox .tox-editor-container {
      border: none !important; /* Removes border around the editor UI */
    }
    `;
    document.head.appendChild(style);
  });
  </script>
  
  <style lang="scss" scoped>
.tox .tox-toolbar__primary .tox-tbtn {
    background-color: var(--fk-bg-input, #c42727) !important;
    color: white !important; /* Assuming you want white text */
}


</style>