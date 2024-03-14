<template>{{ isPublic }} {{ status }} 
  <MixToggleStar
      v-model="isFeatured"
      size="24"
      class="star-toggle"
      @update:model-value="onFeaturedChange"
      style="z-index: 10;"
    />
  <div class="card-store">
    <div class="row">
      <div class="col-6">
        <NuxtImg
          class="h-100 w-100 object-fit-cover"
          :src="getImageUrl(image)"
          alt="Store item image"
        />
      </div>
      <div class="col-6  px-4">
        <div class="name-card-right d-flex mt-2">
      <div style=" font-size: 10px; width:40px; margin-top: 4px;position: relative; left: 60px;" > {{ isPublic ? 'Public' : 'Private' }}</div>
          <div  style="position: relative; left: 60px;">
            <FormKit
              type="switch"
              name="is_public"
              @update:model-value="
                $emit('on-planstatus-change', {
                  store_item_id: id,
                  status: isPublic ? 'Public' : 'Private'
                })
              "
              v-model="isPublic"
            />

      </div>
      </div>
        <div @click="$emit('on-plan-select')"  class="title line-clamp-2" style="position: relative; bottom: 5px; ">
          {{ name }}
        </div>
        <p class="description line-clamp-3" style="position: relative; bottom: 5px;">
          {{ description }}
        </p>

        <div class="price" style="position: relative; bottom: 5px;">
            <span :class="display_original_price=='Yes'?'strikethrough':''">
                {{ price }}AED
            </span>
          <span class="offer" :class="display_original_price=='No'?'strikethrough':''" v-if="promotion_price">{{ promotion_price }}AED</span>
        </div>

        <div class="d-flex justify-content-between footer-label"  style="position: relative; bottom: 3px;">
          <span>
            <NuxtImg src="/images/svg/tax-icon.svg" alt="Tax icon" provider="none" height="10px" />
            included
          </span>
          <span>
            <NuxtImg src="/images/svg/check-green.svg" alt="Check icon" provider="none" height="10px" />
            in stock
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getUrl: getImageUrl } = useBoImage();
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
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
  status: {
    type: String,
    default: "Private",
  },
  featured: {
    type: String,
    default: "No",
  },
});
const isPublic = ref(props.status === "Private" ?? false);

const isFeatured = ref(props.featured === "Yes" ?? false);
const emit = defineEmits([
  "on-planstatus-change",
  "on-featured-change",
  "on-plan-select",
]);
const onFeaturedChange = (val: boolean) => {
  emit("on-featured-change", {
    plan_id: props.id,
    featured: val ? "Yes" : "No",
  });
};
</script>

<style scoped lang="scss">
.card-store {
  cursor: pointer;
  // box-shadow: 0 0 11px rgba(0, 0, 0, 0.168627451);
  background: #f2faff;
  border-radius: 10px;
  overflow: hidden;
  height: 200px;
  position: relative;
  left: 5px;
  bottom: 5px;
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
  .star-toggle {
    position: absolute;
    top: -8px;
    left: -8px;
  }
}
</style>
