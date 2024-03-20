<template>
    <div  class="card-package" > 
        <div  class="title" role="button"
        >
       <span> Franchise Owner</span>
        </div>
    
        <div class="desc">
          <span> Reset Fitness | JIP</span>
        </div>
    
        <div class="d-flex align-items-center gap-5">
        <div >
         <img src="~assets/images/svg/icon-material-computer.svg"  />
        </div>
        <div>
            <img src="~assets/images/svg/ionic-ios-phone-portrait.svg"  />
        </div>
        <div >
         <img src="~assets/images/svg/icon-material-payment.svg"  />
        </div>
        <div>
            <img src="~assets/images/svg/icon-ionic-ios-stats.svg"  />
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
      padding: 8px;
      border-radius: 10px;
      width: 230px;
      min-height: 130px;
      cursor: pointer;
      // margin-left: 15px;
    //   margin-bottom: 15px;
      &.inactive-package {
      // background-color: #E6E7E8; // Setting background color to yellow
      opacity: 0.25;
    }
   
  }


  .title{
    width: 100%;
    // font-style: italic;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    min-height: 0px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .desc{
    width: 100%;
    font-size: 10px;
    margin-bottom: 9px;
    color: #000;
    min-height: 5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }
  
  </style>
 
  