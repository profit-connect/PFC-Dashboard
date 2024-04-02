// plugins/tooltip.js

import { defineNuxtPlugin } from '#app';
import tooltipDirective from './tooltip-directive';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', tooltipDirective);
});
