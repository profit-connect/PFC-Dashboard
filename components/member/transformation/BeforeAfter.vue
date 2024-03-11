<template>
  <div class="member-transformation-before-after">
    <div class="mb-3">Before-After Photo</div>
    <div class="row">
      <div class="col-4 d-flex">
        <NuxtImg :src="front.new" class="w-50" />
        <NuxtImg :src="front.old" class="w-50" />
      </div>
      <div class="col-4 d-flex">
        <NuxtImg :src="side.new" class="w-50" />
        <NuxtImg :src="side.old" class="w-50" />
      </div>
      <div class="col-4 d-flex">
        <NuxtImg :src="back.new" class="w-50" />
        <NuxtImg :src="back.old" class="w-50" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IImage {
  new: string;
  old: string;
}
const props = defineProps({
  front: {
    type: Object as PropType<IImage>,
    default: () => ({
      new: "https://source.unsplash.com/random/330x730/?gym",
      old: "https://source.unsplash.com/random/330x730/?gym",
    }),
  },
  side: {
    type: Object as PropType<IImage>,
    default: () => ({
      new: "https://source.unsplash.com/random/330x730/?workout",
      old: "https://source.unsplash.com/random/330x730/?workout",
    }),
  },
  back: {
    type: Object as PropType<IImage>,
    default: () => ({
      new: "https://source.unsplash.com/random/330x730/?workout",
      old: "https://source.unsplash.com/random/330x730/?workout",
    }),
  },
});
</script>

<style lang="scss" scopped>
.member-transformation-before-after {
  background: $main-bg;
  border-radius: 12px;
  padding: 12px 12px;
}
</style>
