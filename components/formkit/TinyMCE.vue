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
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat  | code | link ',
              content_style: 'body { background-color: #f2faff; } iframe {border: none;}',
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
const customStyles = `
  .tox .tox-toolbar__primary .tox-tbtn {
    background-color: #f2faff !important; // Default state
    color: black !important;
  }
  .tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled {
       background: #84CEFF !important; 
      color: white !important;
    }
  .tox .tox-tbtn:hover {
    background: #84CEFF !important; 
  }
  
`;

const styleTag = document.createElement('style');
styleTag.type = 'text/css';
styleTag.appendChild(document.createTextNode(customStyles));
document.head.appendChild(styleTag);
});


</script>

<style lang="scss" scoped>


</style>
