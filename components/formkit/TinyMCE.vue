<template>
  <div style="width: 100%;">
    <ClientOnly>
      <Editor
        api-key="qupq5d9drws8slstb6dia9ckhsajkpowu6ibsd70hyofyblk"
        v-model="editorContent"
        :init="{
              selector: 'textarea',
              height: 500,
              menubar: false,
              statusbar: false,
              editor_selector : 'mcesimple',
              readonly: false,
              advcode_inline: true,
              plugins: [
              'link', 'code' 
              ],
              toolbar: 'undo redo | formatselect | blocks  fontsiz| bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat  | code | link | your_custom_button | customInsertButtonPanel',
              content_style: `body { font-family: 'Poppins Regular', sans-serif, Arial; background-color: #f2faff; } iframe {border: none;}`,
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

onMounted(() => {
  const dialogStyles = `
    .tox .tox-dialog-wrap {
      z-index: 2 !important;
    }

    .tox .tox-dialog {
      z-index: 2 !important;
      position:absolute
      right:800px;
    }
  `;
  const customStyles = `
    .tox .tox-toolbar__primary .tox-tbtn {
      background-color: #f2faff !important; /* Default state */
      color: white !important;
      color: #84CEFF;
    }

    .tox .tox-toolbar__primary .tox-tbtn:hover,
    .tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled,
    .tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--selected {
      background: #84CEFF !important;
      color: #84CEFF;
    }
    .tox .tox-tbtn__select-label {
      color: #84CEFF;
    cursor: default;
    font-weight: 400;
    height: initial;
    margin: 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


  .tox .tox-toolbar__primary .tox-tbtn:hover .tox-tbtn__select-label,
  .tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled .tox-tbtn__select-label {
    color: white;
  }
    .tox .tox-toolbar__primary .tox-tbtn svg {
      fill: #84CEFF; /* Default fill color for icons */
      color: #84CEFF;
    }

    .tox .tox-toolbar__primary .tox-tbtn:hover svg,
    .tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled svg,
    .tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--selected svg {
      fill: white !important; /* White fill color for icons on hover and selected */
      color: #84CEFF;
      
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(customStyles + dialogStyles));
  document.head.appendChild(styleTag);
});



</script>

<style lang="scss" scoped>


</style>
