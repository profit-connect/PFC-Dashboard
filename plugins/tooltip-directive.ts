// plugins/tooltip-directive.js

import { DirectiveBinding } from 'vue';

const tooltipDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const tooltipSpan = document.createElement('span');
    tooltipSpan.textContent = binding.value;
    tooltipSpan.className = 'tooltip-text'; // Use the same CSS classes as before
    tooltipSpan.style.visibility = 'hidden';
    // Append the tooltip span to the element
    el.appendChild(tooltipSpan);
    el.classList.add('tooltip-container');
    // Event listeners to show/hide the tooltip
    el.addEventListener('mouseenter', () => {
      tooltipSpan.style.visibility = 'visible';
    });
    el.addEventListener('mouseleave', () => {
      tooltipSpan.style.visibility = 'hidden';
    });
  }
};

export default tooltipDirective;
