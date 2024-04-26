
<template>
  <MixToggleStar
      v-model="isFeatured"
      size="24"
      class="star-toggle"
      @update:model-value="onFeaturedChange"
    />
  <div class="card-store">
    <!-- <div class="row"> -->
      <div class="d-flex">
      <!-- <div class="col-6"> -->
        <div style="width: 50%;">
        <div style=" height: 30px; width: 30px; position: absolute; background-color: white; border-radius: 50%; left: 10px; top: 10px;">
        <NuxtImg        
        @click="$emit('on-plan-select')"               
        role="button"
        src="/images/svg/edit-icon.svg"
        style=" height: 17px; width: 17px; position: relative; left: 7px; top: 2px;"
        provider="none"
           />
          </div>
        <NuxtImg
          class="h-100 w-100 object-fit-cover"
          :src="getImageUrl(image)"
          alt="Store item image"
        />
      </div>
      <div style="width: 50%;" class="px-4">
      <!-- <div class="col-6  px-4"> -->
        <div class="name-card-right d-flex mt-2">
          <div style="width: 50px;">
            <div v-if="promotion_price > 0" class="custom-badge" :class="{ 'custom-badge-inactive': status === 'Inactive' }">
              {{ `${discountInPercent}% off ` }}
            </div>
          </div>
         
      <div style=" font-size: 10px; width:40px; margin-top: 4px;position: relative; left: 30px;" > {{ isPublic ? 'Public' : 'Private' }}</div>
          <div  style="position: relative; left: 30px;">
            <FormKit
              type="switch"
              name="is_public"
              @update:model-value="
                $emit('on-planstatus-change', {
                  store_item_id: id,
                  status: isPublic ? 'Private' : 'Public'
                })
              "
              v-model="isPublic"
            />

      </div>
      </div>
      <div  @click="$emit('push-member')"    >
        <div  class="title line-clamp-2 small-title-bold" style="position: relative; bottom: 5px; ">
          {{ name }}
        </div>
        <p class="description line-clamp-3" style="position: relative; bottom: 5px;">
          {{ description }}
        </p>
       
        <div class="price" style="position: relative; bottom: 10px;">
          <div v-if="display_original_price=='Yes' &&  promotion_price > 0 ">
            <span  class="offer">
              AED <b>{{ promotion_price }} </b> 
            </span>
            <span style="font-size: 10px; margin-left: 5px;"  class="strikethrough">
             AED    {{ price }}
            </span>
            </div>
           <div v-else-if="display_original_price=='No' &&  promotion_price > 0">
            <span>
              AED <b>{{ promotion_price }} </b> 
            </span>
          </div>
          <div v-else >
            <span  >  AED <b>{{ price }} </b> </span>
          </div> 
        </div>

        <div class="d-flex justify-content-between footer-label"  style="position: relative; bottom: 5px;">
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
const isPublic = ref(props.status === "Public" ?? false);

const isFeatured = ref(props.featured === "Yes" ?? false);
const emit = defineEmits([
  "on-planstatus-change",
  "on-featured-change",
  "on-plan-select",
  "push-member",
]);
const onFeaturedChange = (val: boolean) => {
  emit("on-featured-change", {
    store_item_id: props.id,
    featured: val ? "Yes" : "No",
  });
};
const discountInPercent = computed(() => {
  if (!props.promotion_price) return 0;
  return Math.ceil(
    ((+props.price - +props.promotion_price) * 100) / +props.price
  );
});
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
    min-height: 35px;
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
      font-size: 14px;
      // padding-left: 8px;
    }
  }

}
.star-toggle {
    position: relative;
    z-index: 10;
    bottom: -6px;
    right: 3px;
    box-shadow: none;
  }
  .custom-badge {
    background: red;
    display: inline-block;
    color: #fff;
    font-size: 10px;
    padding: 0 6px;
    height: 18px;
    align-items: center;
    padding-top: 1px;
    border-radius: 5px;
    // &.custom-badge-inactive {
    // background-color: black; 
    // }
  }
 
</style>