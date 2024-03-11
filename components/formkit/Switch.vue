<template>
  <Toggle @change="handleInput" :modelValue="props?.context?._value" />
</template>

<script lang="ts" setup>
import Toggle from "@vueform/toggle";
// test 
const props = defineProps({
  context: Object,
});

function handleInput(value: any) {
  props?.context?.node.input(value);
}
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style>
.toggle-on {
  background: #84ceff !important;
  border-color: #84ceff !important;

}
.toggle {
  
width: 35px;
height: 20px;
}
.toggle-handle {
  
    top:0px
}
</style>
