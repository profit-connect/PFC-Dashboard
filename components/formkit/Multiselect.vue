<template>
  <Multiselect
    :options="props?.context?.options"
    :openDirection="props?.context?.openDirection"
    :mode="props?.context?.mode"
    :placeholder="props?.context?.placeholder"
    @change="handleInput"
    :modelValue="props?.context?._value"
    :searchable="props?.context?.searchable"
    :hideSelected="props?.context?.hideSelected"
  />
</template>

<script lang="ts" setup>
import Multiselect from "@vueform/multiselect";

const props = defineProps({
  context: Object,
});

function handleInput(value: any) {
  props?.context?.node.input(value);
}
</script>

<style lang="scss">
.multiselect {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  // border: var(--ms-border-width, 1px) solid #fff;
  border-radius: var(--fk-border-radius);
  background: $main-bg;
  font-size: var(--ms-font-size, 1rem);
  
  // height: 48px;

  &.is-open {
    // border-radius: var(--ms-radius, 4px) var(--ms-radius, 4px) 0 0;
  }

  &.is-open-top {
    // border-radius: 0 0 var(--ms-radius, 4px) var(--ms-radius, 4px);
  }

  &.is-disabled {
    cursor: default;
    background: var(--ms-bg-disabled, #f3f4f6);
  }

  &.is-active {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
    z-index: 100;
   box-shadow:
    0 -4px 6px -4px rgba(0, 0, 0, .12), /* Top shadow */
    4px 0 6px -4px rgba(0, 0, 0, .12), /* Right side shadow */
    -4px 0 6px -4px rgba(0, 0, 0, .12); /* Left side shadow */
  }
  // &.is-active,
  // &:hover {
    // border: var(--ms-border-width-active, var(--ms-border-width, 1px)) solid #{$main-blue};
  // }
}

.multiselect-wrapper {
  font-size: 14px;
  padding-bottom: 5px;
  // overflow-y: auto;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgb(133, 128, 128) transparent;
  min-height: calc(
    2 * var(--ms-border-width, 1px) + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + 2 * var(--ms-py, 0.5rem)
  );
  // &::-webkit-scrollbar-button {
  //   display: none;
  // }

  // /* Set border-radius for scrollbar track */
  // &::-webkit-scrollbar-track {
  //   border-radius: var(--fk-border-radius);
  //   background: transparent; /* Optional: set to the desired track background */
  // }
  // &::-webkit-scrollbar-thumb {
  //   border-radius: var(--fk-border-radius);
  //   background: rgb(133, 128, 128); /* Optional: set to the desired thumb color */
  // }
}
.custom-multiselect-container .multiselect-wrapper {
  height: 40px; /* Adjust the height as needed */
}
.custom-multiselect-schedule .multiselect-wrapper {
  height: 40px !important;
}
.custom-schedule-wrapper .multiselect-wrapper {
  height: 40px !important;
}
.custom-multiselect-schedule .multiselect {
  position: relative;
  margin: 0 auto;
  // width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid #fff;
  border-radius: var(--fk-border-radius);
  background: #f2faff;
  font-size: var(--ms-font-size, 1rem);
}
.custom-schedule-wrapper .multiselect-dropdown {
  position: absolute;
  left: calc(var(--ms-border-width, 1px) * -1);
  right: calc(var(--ms-border-width, 1px) * -1);
  z-index: 100;
  bottom: 0;
  width: 120px;
  transform: translateY(100%);
  margin-top: calc(var(--ms-border-width, 1px) * -1);
  // overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: $main-bg;
  border-radius: 10px;
  // background: white;
  display: flex;
  flex-direction: column;
  border-radius: var(--fk-border-radius);
  outline: none;
  max-height: var(--ms-max-height, 10rem);
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgb(133, 128, 128) transparent;
  ::-webkit-scrollbar {
    width: 12px;
  }

  &.is-top {
    transform: translateY(-100%);
    top: var(--ms-border-width, 1px);
    bottom: auto;
    border-radius: var(--ms-dropdown-radius, 4px) var(--ms-dropdown-radius, 4px)
      0 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &.is-hidden {
    display: none;
  }
  /* Hide the scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide the scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Styles for the scrollbar thumb and track */
  &::-webkit-scrollbar-track {
    border-radius: var(--fk-border-radius);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: var(--fk-border-radius);
    background: rgb(133, 128, 128);
  }
}

.custom-schedule-wrapper .multiselect {
  // padding-left:50px ;
  position: relative;
  // bottom: 14px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid #fff;
  border-radius: var(--fk-border-radius);
  background: #f2faff;
  font-size: var(--ms-font-size, 1rem);
}

.multiselect-multiple-label,
.multiselect-single-label,
.multiselect-placeholder {
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  background: transparent;
  line-height: var(--ms-line-height, 1.375);
  padding-left: var(--ms-px, 0.875rem);
  padding-right: calc(1.25rem + var(--ms-px, 0.875rem) * 3);
  box-sizing: border-box;
  max-width: 100%;
}

.multiselect-placeholder {
  color: #000000;
}

.multiselect-single-label-text {
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}

.multiselect-search {
  width: 100%;
  height: 100%; // for FF
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  outline: none;
  box-sizing: border-box;
  border: 0;
  appearance: none;
  font-size: inherit;
  font-family: inherit;
  background: transparent;
  border-radius: var(--ms-radius, 4px);
  padding-left: var(--ms-px, 0.875rem);

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
}

.multiselect-tags {
  margin-bottom: 1000px;
  position: absolute;
  top: 60px;
  bottom: 80px;
  left: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
  min-width: 0;
}

.multiselect-tag {
  // background: $main-blue;
  background: white;
  color: var(--ms-tag-color, #323a45);
  font-size: var(--ms-tag-font-size, 0.875rem);
  line-height: var(--ms-tag-line-height, 1.25rem);
  // font-weight: var(--ms-tag-font-weight, 600);
  padding: var(--ms-tag-py, 0.125rem) 0 var(--ms-tag-py, 0.125rem)
    var(--ms-tag-px, 0.5rem);
  border: 1px solid #84ceff;
  border-radius: var(--ms-tag-radius, 4px);
  margin-right: var(--ms-tag-mx, 0.25rem);
  margin-bottom: var(--ms-tag-my, 0.25rem);
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-width: 0;

  &.is-disabled {
    padding-right: var(--ms-tag-px, 0.5rem);
    background: var(--ms-tag-bg-disabled, #9ca3af);
    color: var(--ms-tag-color-disabled, #ffffff);
  }
}

.custom-schedule-wrapper .multiselect-caret {
  transform: rotate(0deg);
  // transition: 0.3s transform;
  background-image: url("~/assets/images/svg/add-icon.svg");
  // You can also use inline SVG here if you prefer
  // background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");

  // background-color: var(--ms-caret-color, #999999);
  width: 1rem;
  height: 1rem;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  right: 50px;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;

  // &.is-open {
  //   transform: rotate(180deg);
  //   pointer-events: auto;
  // }
}
.custom-schedule-wrapper .multiselect-wrapper {
  padding-bottom: 0px;
  padding: 0px 0px 0px 0px;
  // overflow-y: auto;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 40px;
  right: 5px;
  display: flex;
  align-items: left;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgb(133, 128, 128) transparent;
  min-height: calc(
    2 * var(--ms-border-width, 1px) + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + 2 * var(--ms-py, 0.5rem)
  );
  // &::-webkit-scrollbar-button {
  //   display: none;
  // }

  // /* Set border-radius for scrollbar track */
  // &::-webkit-scrollbar-track {
  //   border-radius: var(--fk-border-radius);
  //   background: transparent; /* Optional: set to the desired track background */
  // }
  // &::-webkit-scrollbar-thumb {
  //   border-radius: var(--fk-border-radius);
  //   background: rgb(133, 128, 128); /* Optional: set to the desired thumb color */
  // }
}
.custom-schedule-wrapper .multiselect-tags {
  // margin-bottom: 1000px;
  // position: absolute;
  top: 40px;
  width: 300px;
  // bottom: 10px;
  margin-bottom: 100px;
  left: 40px;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  // margin: var(--ms-tag-my, 0.25rem) 0 0;
  // padding-left: var(--ms-py, 0.5rem);
  align-items: left;
  min-width: 0;
}

.custom-schedule-wrapper .multiselect-tag {
  position: relative;
  // bottom: 10px;
  right: 40px;
  // background: $main-blue;
  color: var(--ms-tag-color, #323a45);
  font-size: var(--ms-tag-font-size, 0.875rem);
  line-height: var(--ms-tag-line-height, 1.25rem);
  // font-weight: var(--ms-tag-font-weight, 600);
  padding: var(--ms-tag-py, 0.125rem) 0 var(--ms-tag-py, 0.125rem)
    var(--ms-tag-px, 0.5rem);
  border: 1px solid #84ceff;
  border-radius: var(--ms-tag-radius, 4px);
  margin-right: var(--ms-tag-mx, 0.25rem);
  margin-bottom: var(--ms-tag-my, 0.25rem);
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-width: 0;

  &.is-disabled {
    padding-right: var(--ms-tag-px, 0.5rem);
    background: var(--ms-tag-bg-disabled, #9ca3af);
    color: var(--ms-tag-color-disabled, #ffffff);
  }
}
.multiselect-tag-wrapper {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.multiselect-tag-wrapper-break {
  white-space: normal;
  word-break: break-all;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--ms-tag-remove-py, 0.25rem) var(--ms-tag-remove-px, 0.25rem);
  margin: var(--ms-tag-remove-my, 0rem) var(--ms-tag-remove-mx, 0.125rem);
  border-radius: var(--ms-tag-remove-radius, 4px);

  &:hover {
    background: #00000010;
  }
}

.multiselect-tag-remove-icon {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  background-color: currentColor;
  opacity: 0.3;
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
}

.multiselect-tags-search-wrapper {
  display: inline-block;
  position: relative;
  margin: 0 var(--ms-tag-mx, 4px) var(--ms-tag-my, 4px);
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
}

.multiselect-tags-search-copy {
  visibility: hidden;
  white-space: pre-wrap;
  display: inline-block;
  height: 1px;
  width: 100%;
}

.multiselect-tags-search {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 0;
  appearance: none;
  outline: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  box-sizing: border-box;
  width: 100%;
  appearance: none;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
}

.multiselect-inifite {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: calc(
    2 * var(--ms-border-width, 1px) + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + 2 * var(--ms-py, 0.5rem)
  );
}

.multiselect-spinner,
.multiselect-inifite-spinner {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'%3E%3C/path%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  background-color: $main-blue;
  width: 1rem;
  height: 1rem;
  z-index: 10;
  animation: multiselect-spin 1s linear infinite;
  flex-shrink: 0;
  flex-grow: 0;
}

.multiselect-spinner {
  margin: 0 var(--ms-px, 0.875rem) 0 0;
}

.multiselect-clear {
  padding: 0 var(--ms-px, 0.875rem) 0 0px;
  position: relative;
  z-index: 10;
  opacity: 1;
  transition: 0.3s;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;

  &:hover .multiselect-clear-icon {
    background-color: var(--ms-clear-color-hover, #000000);
  }
}

// .multiselect-clear-icon {
//   -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
//   mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'%3E%3C/path%3E%3C/svg%3E");
//   -webkit-mask-position: center;
//   mask-position: center;
//   -webkit-mask-repeat: no-repeat;
//   mask-repeat: no-repeat;
//   -webkit-mask-size: contain;
//   mask-size: contain;
//   background-color: var(--ms-clear-color, #999999);
//   width: 0.625rem;
//   height: 1.125rem;
//   display: inline-block;
//   transition: 0.3s;s
// }

.multiselect-caret {
  transform: rotate(0deg);
  transition: 0.3s transform;

  background-image: url("~/assets/images/svg/select-dropdown.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  // background-color: var(--ms-caret-color, #999999);
  width: 1.625rem;
  height: 1.125rem;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;

  &.is-open {
    transform: rotate(180deg);
    pointer-events: auto;
  }
}

.custom-multiselect-except .multiselect-caret {
  transform: rotate(0deg);
  // transition: 0.3s transform;

  background-image: url("~/assets/images/svg/disable-icon.svg");
  // You can also use inline SVG here if you prefer
  // background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");

  // background-color: var(--ms-caret-color, #999999);
  width: 2rem;
  height: 1.6rem;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  // z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;

  // &.is-open {
  //   transform: rotate(180deg);
  //   pointer-events: auto;
  // }
}

.custom-multiselect-available_tags .multiselect-caret {
  transform: rotate(0deg);
  // transition: 0.3s transform;

  // You can also use inline SVG here if you prefer
  // background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");
  background-image: url("~/assets/images/svg/user-approved-icon.svg");
  // background-color: var(--ms-caret-color, #999999);
  width: 2rem;
  height: 2rem;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  // z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;

  // &.is-open {
  //   transform: rotate(180deg);
  //   pointer-events: auto;
  // }
}
.custom-multiselect-member-tags .multiselect-caret {
  transform: rotate(0deg);
  // transition: 0.3s transform;

  // You can also use inline SVG here if you prefer
  // background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E");
  background-image: url("~/assets/images/svg/add-icon.svg");
  // background-color: var(--ms-caret-color, #999999);
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  // z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;

  // &.is-open {
  //   transform: rotate(180deg);
  //   pointer-events: auto;
  // }gfd
}
.multiselect-dropdown {
  // border: 1px solid rgb(201, 174, 226);;
  // border-bottom: 1px solid rgb(201, 174, 226);
  // border-left: 1px solid rgb(201, 174, 226);
  // border-right: 1px solid rgb(201, 174, 226);
  // filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, .1215686275));
  box-shadow:
    0 4px 6px -4px rgba(0, 0, 0, .12), /* Bottom shadow */
    4px 0 6px -4px rgba(0, 0, 0, .12), /* Right side shadow */
    -4px 0 6px -4px rgba(0, 0, 0, .12); /* Left side shadow */
  
  position: absolute;
  left: calc(var(--ms-border-width, 1px) * +1);
  right: calc(var(--ms-border-width, 1px) * +1);
  bottom: 0;
  transform: translateY(100%);
  margin-top: calc(var(--ms-border-width, 1px) * -1);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
  background: $main-bg;
  border-radius: 10px;
  // background: white;
  display: flex;
  flex-direction: column;
  border-radius: var(--fk-border-radius);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  outline: none;
  max-height: var(--ms-max-height, 10rem);
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgb(133, 128, 128) transparent;
  padding-bottom: 10px;
  

  &.is-top {
    transform: translateY(-100%);
    top: var(--ms-border-width, 1px);
    bottom: auto;
    border-radius: var(--ms-dropdown-radius, 4px) var(--ms-dropdown-radius, 4px)
      0 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &.is-hidden {
    display: none;
  }
  /* Hide the scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide the scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Styles for the scrollbar thumb and track */
  &::-webkit-scrollbar-track {
    border-radius: var(--fk-border-radius);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: var(--fk-border-radius);
    background: rgb(133, 128, 128);
  }
}

.multiselect-options {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}

.multiselect-group {
  padding: 0;
  margin: 0;
}

.multiselect-group-label {
  padding: var(--ms-group-label-py, 0.3rem) var(--ms-group-label-px, 0.75rem);
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--ms-group-label-bg, #e5e7eb);
  color: var(--ms-group-label-color, #374151);
  cursor: default;
  line-height: var(--ms-group-label-line-height, 1.375);
  display: flex;
  box-sizing: border-box;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  &.is-pointable {
    cursor: pointer;
  }

  &.is-pointed {
    background: var(--ms-group-label-bg-pointed, #d1d5db);
    color: var(--ms-group-label-color-pointed, #374151);
  }

  &.is-selected {
    background: transparent;
    color: var(--ms-group-label-color-selected, #ffffff);
  }

  &.is-disabled {
    background: var(--ms-group-label-bg-disabled, #f3f4f6);
    color: var(--ms-group-label-color-disabled, #d1d5db);
    cursor: not-allowed;
  }

  &.is-selected.is-pointed {
    background: transparent;
    color: var(--ms-group-label-color-selected-pointed, #ffffff);
  }

  &.is-selected.is-disabled {
    background: transparent;
    color: var(--ms-group-label-color-selected-disabled, #d1fae5);
  }
}

.multiselect-group-options {
  padding: 0;
  margin: 0;
}

.custom-multiselect-gender .multiselect-option {
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
  font-size: var(--ms-option-font-size, 1rem);
  line-height: var(--ms-option-line-height, 1.375);
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  &.is-pointed {
    background: $main-bg;
    border-radius: 10px;
    // background: var(--ms-option-bg-pointed, #f3f4f6);
    color: var(--ms-option-color-pointed, #1f2937);
    // color: #84ceff;
  }

  &.is-selected {
    color: $main-blue;
    // color: blueviolet;
    background: transparent;
    // color: #fff;
  }

  &.is-disabled {
    background: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-selected.is-pointed {
    // background: var(--ms-option-bg-selected-pointed, #0c193a);
    // color: var(--ms-option-color-selected-pointed, #ffffff);
    // color: var(--ms-option-color-selected-pointed, #000000);
  }

  &.is-selected.is-disabled {
    background: transparent;
    color: $main-blue;
    opacity: 1;
  }
}

.multiselect-option {
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
  font-size: var(--ms-option-font-size, 1rem);
  line-height: var(--ms-option-line-height, 1.375);
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  &.is-pointed {
    background: $main-bg;
    border-radius: 10px;
    // background: var(--ms-option-bg-pointed, #f3f4f6);
    color: var(--ms-option-color-pointed, #1f2937);
    color: #84ceff;
  }

  &.is-selected {
    color: $main-blue;
    // color: blueviolet;
    background: transparent;
    // color: #fff;
  }

  &.is-disabled {
    background: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-selected.is-pointed {
    // background: var(--ms-option-bg-selected-pointed, #0c193a);
    color: var(--ms-option-color-selected-pointed, #ffffff);
    color: var(--ms-option-color-selected-pointed, #000000);
  }

  &.is-selected.is-disabled {
    background: transparent;
    color: $main-blue;
    opacity: 1;
  }
}


.custom-multiselect-access .multiselect-option {
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
  font-size: var(--ms-option-font-size, 1rem);
  line-height: var(--ms-option-line-height, 1.375);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Center text */
  text-align: left;
  position: relative; /* For absolute positioning of the SVG */
  box-sizing: border-box;
  text-decoration: none;
  min-height: 40px; /* Adjust based on your content */

  &.is-pointed {
    background: $main-bg;
    border-radius: 10px;
    // background: var(--ms-option-bg-pointed, #f3f4f6);
    color: var(--ms-option-color-pointed, #1f2937);
    color: #84ceff;
  }

  &.is-selected {
    // color: $main-blue;
    color: #323a45;
    // background: transparent;
    
    // color: #fff;
  }

  &.is-disabled {
    background: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-selected.is-pointed {
    // background: var(--ms-option-bg-selected-pointed, #0c193a);
     color: $main-blue;
    // color: var(--ms-option-color-selected-pointed, #ffffff);
    // color: var(--ms-option-color-selected-pointed, #000000);
  }

  &.is-selected.is-disabled {
    background: transparent;
    color: $main-blue;
    opacity: 1;
  }
}
.custom-multiselect-access .multiselect-option::before {
  content: url("~/assets/images/svg/checkbox-disable.svg");
  display: block;
  width: 12px; /* Adjust based on SVG size */
  height: 12px; /* Adjust based on SVG size */
  position: absolute;
  left: 25px; /* Adjust to move the checkmark left, closer to the edge */
  top: 50%;
  transform: translateY(-50%); /* Center vertically */
  pointer-events: none; /* Allows click through */
}

.custom-multiselect-access .multiselect-option.is-selected::before {
  content: url("~/assets/images/svg/checkbox.svg");
  /* SVG is positioned, adjust the left value as needed */
}

.custom-multiselect-access .multiselect-option {
  padding-left: calc(var(--ms-option-px, 0.75rem) + 20px); /* Increase left padding to accommodate the SVG, ensure this matches the width reserved for the SVG */
}

.multiselect-no-options,
.multiselect-no-results {
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
  color: var(--ms-empty-color, #4b5563);
}

.multiselect-fake-input {
  background: transparent;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  border: 0;
  padding: 0;
  font-size: 0;
  outline: none;

  &:active,
  &:focus {
    outline: none;
  }
}

.multiselect-assistive-text {
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.multiselect-spacer {
  display: none;
}

[dir="rtl"] {
  .multiselect-multiple-label,
  .multiselect-single-label,
  .multiselect-placeholder {
    padding-right: var(--ms-px, 0.875rem);
    padding-left: calc(1.25rem + var(--ms-px, 0.875rem) * 3);
    left: auto;
    right: 0;
  }

  .multiselect-search {
    padding-left: 0;
    padding-right: var(--ms-px, 0.875rem);
  }

  .multiselect-tags {
    padding-left: 0;
    padding-right: var(--ms-py, 0.5rem);
  }

  .multiselect-tag {
    padding: var(--ms-tag-py, 0.125rem) var(--ms-tag-px, 0.5rem)
      var(--ms-tag-py, 0.125rem) 0;
    margin-right: 0;
    margin-left: var(--ms-tag-mx, 0.25rem);

    &.is-disabled {
      padding-left: var(--ms-tag-px, 0.5rem);
    }
  }

  .multiselect-spinner,
  .multiselect-caret {
    margin: 0 0 0 var(--ms-px, 0.875rem);
  }

  .multiselect-clear {
    padding: 0 0 0 var(--ms-px, 0.875rem);
  }
}

@keyframes multiselect-spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>