<template>
  <div class="class-card" :style="computedStyle">
    <div class="w-75 d-flex flex-column gap-1 position-relative">
      <h3>
        {{ name }}
      </h3>
      <div class="d-flex gap-2">
        <NuxtImg src="/images/svg/time-icon.svg" width="18" loading="lazy" provider="none"/>
        <span>{{ duration }} {{ period }}</span>
      </div>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: { type: Number },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  period: {
    type: String,
    default: "",
  },
});

const { getUrl } = useBoImage();

const computedStyle = computed(() => {
  return {
    backgroundImage: `url(${getUrl(props.image)})`,
  };
});
</script>

<style scoped lang="scss">
.class-card {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 445px;
  color: #fff;
  border-radius: 10px;
  padding: 8px 22px;
  cursor: pointer;
  height: 132px;
  background-position: center;
  transition: 100ms all;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  &:hover {
    box-shadow: 0 0 13px #00000026;
    transform: scale(1.001);
    opacity: 0.9;
  }

  h3 {
    margin-bottom: 2px;
    font-size: 22px;
    font-family: $font-family-medium;
    color: white;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 10px;
  }
}
</style>
