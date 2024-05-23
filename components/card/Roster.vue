<template>
    <div class="staff-day d-flex flex-wrap" @click="$emit('')">
        <div class="card rounded px-3 py-3">
            <div class="d-flex align-items-center gap-2">
                <div class="hover-wrapper">
                    <img class="profile-image" :src="getImageUrl(img_src)" />
                    <div class="hover-wrapper">
                        <div
                            class="hover-info"
                            v-if="hover_menu"
                            :class="{ 'is-visible': isHovering }"
                            @mouseover="isHovering = true"
                            @mouseleave="isHovering = false">
                            <a :href="`/members/membership-overview`" class="hover-info__link">
                                <img
                                    src="~/assets/images/svg/schedule-profile-white.svg"
                                    alt="Profile icon"
                                    class="img-normal" />
                                <img
                                    src="~/assets/images/svg/schedule-profile-blue.svg"
                                    alt="Profile icon"
                                    class="img-hover" />
                            </a>
                            <a href="/" class="hover-info__link">
                                <img
                                    src="~/assets/images/svg/schedule-chat-white.svg"
                                    alt="Chat icon"
                                    class="img-normal" />
                                <img
                                    src="~/assets/images/svg/schedule-chat-blue.svg"
                                    alt="Chat icon"
                                    class="img-hover" />
                            </a>
                            <div class="hover-info__link">
                                <img
                                    src="~/assets/images/svg/schedule-cancel-white.svg"
                                    alt="Cancel icon"
                                    class="img-normal" />
                                <img
                                    src="~/assets/images/svg/schedule-cancel-blue.svg"
                                    alt="Cancel icon"
                                    class="img-hover" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <div class="staff-name">{{ firstname }}</div>
                    <div class="staff-position">{{ role }}</div>
                    <div class="staff-position">{{ description }}</div>
                    <div class="staff-fees">{{ fees }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { getUrl: getImageUrl } = useBoImage();
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    firstname: {
        type: String,
        default: "",
    },
    img_src: {
        type: String,
        default: "",
    },
    role_id: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "",
    },
    hover_menu: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        default: "",
    },
    fees: {
        type: String,
        default: "",
    },
});

const isHovering = ref(false);
</script>

<style scoped>
.staff-day {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    width: 100%;
    .profile-image {
        width: 100px;
        height: 100px;

        border-radius: 50%;
        object-position: center;
    }
    .info {
        margin-left: 20px;
    }
    .staff-name {
        font-size: 22px;
        font-weight: 600;
        color: #002e4b;
    }
    .staff-position {
        font-size: 14px;
        color: #002e4b;
    }
    .staff-fees {
        font-size: 14px;
        color: #00609f;
        font-style: italic;
    }
    /* .coaches,
  .many-coaches {
    img {
      height: 34px;
      width: 34px;
      border-radius: 50%;
      // margin-bottom: 30px;
    }
  } */
    /* .info {
    list-style: none;
    display: flex;
    gap: 8px;
    align-items: center;
    gap: 18px;
    li {
      display: flex;
      align-items: center;
      max-width: 64px;
      font-size: 11px;
      line-height: 12px;
      gap: 8px;
      h3 {
        margin: 0px;
      }
    }
  } */

    .hover-info {
        position: absolute;
        display: flex;
        bottom: 2px;
        gap: 5px;
        left: 10px;
        visibility: visible; /* Initially hidden */
        opacity: 0; /* Start fully transparent */
        transition: visibility 0s, opacity 0.3s linear; /* Smooth transition for opacity */
    }

    .hover-wrapper:hover .hover-info {
        visibility: visible;
        opacity: 1;
    }

    .hover-info__link {
        display: block;
        width: 35px;
        height: 35px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
        background-color: #fff;
        border-radius: 50%;
        transition: 0.35s;
        position: relative;
        cursor: pointer;
    }

    .img-normal {
        width: 100%;
        transition: transform 0.3s ease;
    }

    .img-hover {
        display: none; /* Hide blue images initially */
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.3s ease;
    }

    .hover-info__link:hover .img-normal {
        display: none; /* Hide white images on hover */
    }

    .hover-info__link:hover .img-hover {
        display: block; /* Show blue images on hover */
    }
}
.card {
    height: 131px;
    width: 100%;
    border-radius: 10px;
}
</style>
