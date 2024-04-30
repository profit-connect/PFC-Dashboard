<template>
  <div class="scheduler-filter-btn-group">
    <h3 class="text-white h6">
      {{ title }}
    </h3>
    <div class="filter">
      <button
        @click="currentItem = 0"
        :class="currentItem === 0 ? 'active' : ''"
        v-if="!disableAllBtn"
      >
        All
      </button>
      <button
        @click="currentItem = item.id"
        :class="currentItem === item.id ? 'active' : ''"
        v-for="item in items"
        :key="item.id"
      >
        {{ formatName(item.label) }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  disableAllBtn: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array as PropType<{ id: number; label: string }[]>,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["modelValue:update"]);
const currentItem = useVModel(props, "modelValue", emit);

function formatName(string) {
  if (!string) return '';
  const words = string.split(' ');
  const capitalizedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
}

</script>

<style lang="scss" scoped>
.scheduler-filter-btn-group {
  .filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 14px;
    margin-bottom: 40px;
    button {
      height: 40px;
      background: none;
      border: 1px solid $dark-blue-seconadary;
      color: #fff;
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 8px;
      &.active {
        border-color: $main-yellow;
      }
    }
  }
}
</style>
