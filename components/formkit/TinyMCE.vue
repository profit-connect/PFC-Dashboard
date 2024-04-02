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
  background-color: #f2faff !important; /* Default state */
  color: white !important;
}

.tox .tox-toolbar__primary .tox-tbtn:hover {
  background: #84CEFF !important; 
  color: #FFFFFF !important; /* Assuming you want the text color to change on hover */
}

.tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled,
.tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled:hover {
  background: #84CEFF !important; 
  color: #FFFFFF !important;
}

/* Adjusting the fill color for icons within enabled buttons */
.tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled .tox-icon,
.tox .tox-toolbar__primary .tox-tbtn.tox-tbtn--enabled:hover .tox-icon {
  fill: white !important; /* Make fill white for enabled buttons */
}

.tox :not(svg):not(rect) {
  background: 0 0;
  border: 0;
  box-shadow: none;
  float: none;
  fill: #84CEFF; /* Default fill color for icons */
  height: auto;
  margin: 0;
  max-width: none;
  outline: 0;
  padding: 0;
  position: static;
  width: auto;
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
