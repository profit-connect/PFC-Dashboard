<template>
  <div  class="card-package" :class="{ 'inactive-package': status === 'Inactive' }"  > 
  <!-- rest of your code -->
    <MixToggleStar
      v-model="isFeatured"
      size="24"
      class="star-toggle"
      @update:model-value="onFeaturedChange"
    />
    <div class="name-card-left">
      <div  class="title" role="button" @click="$emit('on-plan-select')" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      ">
        {{ name }}
      </div>
       
        <div class="name-card-right">
          <div> <a href="/" target="_blank"       
        >
          <img style="position: relative; left: 0px;"
            src="~assets/images/svg/link-icon.svg?timestamp=1701243704100"
            alt="Link to package"
          />
        </a>
      </div>
      <div style=" font-size: 10px; width:40px;" > {{ isPublic ? 'Public' : 'Private' }}</div>
          <div  style="position: relative; top: 5px;">
        <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
      </div>
      </div>
    </div>
      

    <div class="middle" @click="$emit('on-plan-select')">
      <div class="desc" >
        <p>{{description }}</p>
      </div>
      <div class="text-end">
      <template
        v-if="promotion_price == '0' && display_original_price !== 'Yes'"
      >
        <div class="price-only" style="width: 150px; position:relative;  left:-47px; bottom: 10px;">
           <span style="font-size:  22px;">AED <b>{{ formatPrice(price) }}</b></span>
        </div>
      </template>

      <template
        v-else-if="promotion_price !== '0' && display_original_price === 'Yes'"
      >
        <div class="discount">
          <div class="price-only" style="font-size:22px; position:relative;  left:-10px;">AED <b>{{formatPrice(promotion_price) }}</b></div>
          <div class="gap-1 d-flex align-items-center justify-content-end">
            <div class="custom-badge" :class="{ 'custom-badge-inactive': status === 'Inactive' }">
              {{ `${discountInPercent}% off ` }}
            </div>
            <div class="line-though" >
              AED <span ><b>{{formatPrice( price) }} </b></span>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="discount" style="font-size:22px;">
          AED
          <b>{{formatPrice(promotion_price !== "0" ? promotion_price : price ) }}</b>
        </div>
        <div  v-if="promotion_price > 0"  class="custom-badge1" :class="{ 'custom-badge-inactive': status === 'Inactive' }">
              {{ `${discountInPercent}% off ` }}
            </div>
      </template>
    </div>
    </div>
  
    <div class="d-flex justify-content-between" @click="$emit('on-plan-select')">
      <div class="d-flex align-items-center gap-2">
      <div style=" position: relative; top: 5px; width: 160px;"
        v-if="category === 'Recurring'"
      >
        <img
          src="~assets/images/svg/recurring-icon.svg?timestamp=1701243704100"
          alt="Recurring img"
        />
        <span style="font-size: 10px; margin-left: 10px;">Recurring</span>
      </div>
      
      <div 
       style=" position: relative; top: 5px ; width: 160px;" v-else>
        <img
          src="~assets/images/svg/one-time-icon.svg?timestamp=1701243704100"
          alt="One-time img"
        />
        <span  style="font-size: 10px;  margin-left: 10px;">One-time</span>
      </div>
    </div>

      <div style="position: relative; top: 5px ; width: 100px; right: 10px;">
        <img
          src="~assets/images/svg/tax-icon.svg?timestamp=1701243704100"
          alt="Tax icluded img"
        />
        <span  style="font-size: 10px; margin-left: 10px;">included</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  promotion_price: {
    type: Number,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  private: {
    type: String,
    default: "No",
  },
  featured: {
    type: String,
    default: "No",
  },
  description:{
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Active",
  },
  display_original_price: {
    type: String,
    default: "No",
  },
});
const isPublic = ref(props.private === "No" ?? false);
const isFeatured = ref(props.featured === "Yes" ?? false);
const emit = defineEmits([
  "on-planstatus-change",
  "on-featured-change",
  "on-plan-select",
]);

const discountInPercent = computed(() => {
  if (!props.promotion_price) return 0;
  return Math.ceil(
    ((+props.price - +props.promotion_price) * 100) / +props.price
  );
});
const onFeaturedChange = (val: boolean) => {
  emit("on-featured-change", {
    plan_id: props.id,
    featured: val ? "Yes" : "No",
  });
};
function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
</script>

<style scoped lang="scss">
.card-package {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    background: #f2faff;
    padding: 12px;
    border-radius: 10px;
    width: 250px;
    height: 150px;
    cursor: pointer;
    // margin-left: 15px;
    margin-bottom: 15px;
    &.inactive-package {
    // background-color: #E6E7E8; // Setting background color to yellow
    opacity: 0.25;
  }
 
  .star-toggle {
    position: absolute;
    top: -8px;
    left: -8px;
  }
.title{
      font: 14px "Poppins Bold",sans-serif,Arial;
    white-space: pre-wrap;
    width: 120px;
    // line-height: 1.2;
    // margin-right: -5px;
    // cursor: pointer;
    // transition: 350ms;
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
  .custom-badge1 {
    background: red;
    display: inline-block;
    color: #fff;
    font-size: 10px;
    padding: 0 6px;
    height: 18px;
    border-radius: 5px;
    margin-right: 35px;
    padding-top: 1px;
    // align-items: center;
    // &.custom-badge-inactive {
    // background-color: black; 
    // }
  }
  .line-though {
    text-decoration: line-through;
    margin-right: 10px;;
  }
}
.name-card-left{
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
}
.name-card-right{
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 5px;
}
.discount{
  width: 150px; 
   position:relative; 
    left:-37px;
}
.desc{
  width: 120px;
  font: 10px "Poppins regular",sans-serif,Arial;
   white-space: pre-wrap;
   height: 50px;
}
.middle{
  display: flex;
  gap: 10px;
  align-items: center;
  
}
</style>
<!-- <style lang="scss">
.card-package {
  .toggle-off {
    background: #dcdcdc;
  }
  .star-toggle {
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1215686275));
  }
}
</style> -->
