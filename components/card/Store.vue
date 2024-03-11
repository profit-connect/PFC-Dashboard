<template>
  <div class="card-store">
    <div class="row">
      <div class="col-6">
        <NuxtImg
          class="h-100 w-100 object-fit-cover"
          :src="getImageUrl(image)"
          alt="Store item image"
        />
      </div>
      <div class="col-6 py-4 px-4">
        <div class="title line-clamp-2">
          {{ name }}
        </div>
        <p class="description line-clamp-3">
          {{ description }}
        </p>

        <div class="price">
            <span :class="display_original_price=='No'?'strikethrough':''">
                {{ price }}AED
            </span>
          <span class="offer" :class="display_original_price=='Yes'?'strikethrough':''" v-if="promotion_price">{{ promotion_price }}AED</span>
        </div>

        <div class="d-flex justify-content-between footer-label">
          <span>
            <NuxtImg src="/images/svg/tax-icon.svg" alt="Tax icon" provider="none"/>
            included
          </span>
          <span>
            <NuxtImg src="/images/svg/check-green.svg" alt="Check icon" provider="none"/>
            in stock
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getUrl: getImageUrl } = useBoImage();
defineProps({
  name: { type: String, default: "" },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  promotion_price: {
    type: Number,
    default: 0,
  },
  display_original_price: {
    type: String,
    default: "Yes",
  },
});
</script>

<style scoped lang="scss">
.card-store {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.168627451);
  background: #f2faff;
  border-radius: 10px;
  overflow: hidden;
  height: 200px;
  .title {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.2em;
    margin-bottom: 4px;
    min-height: 38px;
  }
  .description {
    font-style: italic;
    font-size: 10px;
    margin-bottom: 4px;
    min-height: 68px;
  }
  .footer-label {
    font-size: 10px;
  }
  .price {
    .offer {
      font-size: 11px;
      padding-left: 8px;
    }
  }
}
</style>
