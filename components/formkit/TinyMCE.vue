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
              setup: function(editor) {
  editor.ui.registry.addButton('your_custom_button', {
    text: 'Insert Button',
    onAction: function() {
      // Define the content of your inline panel with single quotes
      const panelContent = `
        <div style='padding: 20px;'>
          <label for='button-label'>Button Label<input id='button-label' type='text' /></label>
          <label for='button-url'>Button URL<input id='button-url' type='text' /></label>
          <button type='button' id='insert-button'>Insert</button>
        </div>
      `;

      // Show the inline panel
      editor.ui.registry.addPanel('customInsertButtonPanel', {
        html: panelContent,
        onPostRender: function() {
          // Handle the insert button click
          document.getElementById('insert-button').addEventListener('click', function() {
            const label = document.getElementById('button-label').value;
            const url = document.getElementById('button-url').value;
            if (label && url) { // Simple validation
              const content = `<a href='${url}' target='_blank' rel='noopener'><button>${label}</button></a>`;
              editor.insertContent(content);
              editor.ui.hidePanel('customInsertButtonPanel'); // Hide the panel after insertion
            } else {
              alert('Please fill in both fields.'); // Basic error handling
            }
          });
        }
      });

      // Position the panel relative to the button or cursor
      editor.ui.showPanel('customInsertButtonPanel', {
        // Positioning options here, you might need to adjust based on your UI
        predicate: (elem) => true // Show the panel for all elements (you might want to customize this)
      });
    }
  });
}





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
