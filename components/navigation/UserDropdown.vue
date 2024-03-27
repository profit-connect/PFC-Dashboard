<template>
  <div
    class="user-dropdown-box openUserDropdown"
    @mouseenter="openUserDropdown = true"
    @mouseleave="openUserDropdown = false"
  >
    <div class="user-open-menu">
      <img   class="avatar-img"
          v-if="loggedUser && loggedUser.img_src "
          :src="getImageUrl(loggedUser.img_src)"
        />
        <div v-else class="avatar-initials">
  {{ loggedUser.firstname.charAt(0) }}{{ loggedUser.lastname.charAt(0) }}
</div>
      <!-- <img v-else
        class="avatar-img"
        src="/images/svg/header/avatar-demo.png"
        alt="Avatar"
      /> -->
    </div>

    <div
      class="user-dropdown userDropdown"
      :class="openUserDropdown ? 'is-active' : ''"
    >
      <div class="name">{{formatName(loggedUser.firstname)}} {{ formatName(loggedUser.lastname) }}</div>
      <div class="role">{{formatName(loggedUser.role)}}</div>
      <ul> 
        <li>
          <a href="/">
            <img src="/images/svg/header/schedule.svg" alt="Schedule" />
            Schedule
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/svg/header/profile.svg" alt="Profile" />
            Profile
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/svg/header/social.svg" alt="Social" />
            Social
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/svg/header/privacy.svg" alt="Privacy" />
            Privacy
          </a>
        </li>
        <li>
          <a id="logoutBtn" @click="initLogout">
            <img src="/images/svg/header/logout.svg" alt="Logout" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useFranchiseStore } from "~/store/franchise";
const openUserDropdown = ref(false);
const { initLogout, loggedUser , currentUserType } = useAuthStore();
const { getUrl: getImageUrl } = useBoImage();

function formatName(string) {
  if (!string) return "";
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(" ");
}
</script>

<style lang="scss" scoped>
.user-dropdown-box {
  display: flex;
  align-items: center;
  position: relative;

  .user-open-menu {
    width: 50px;
    cursor: pointer;
    border-radius: 50%;
    // border: 1px solid #ffffff;
    overflow: hidden;

    .avatar-img {
      position: relative;
      z-index: 60;
      height: 50px;
      width: 50px;
    }
  }

  .user-dropdown {
    position: absolute;
    top: -4px;
    background: #ffffff;
    right: -3px;
    border-radius: 6px 20px 6px 6px;
    width: 200px;
    box-shadow: 0 0 13px #00000026;
    opacity: 0;
    transition: $transitionSpeed;
    z-index: -1;
    transform: scale(0.8);
    width: 50px;
    height: 50px;
    overflow: hidden;

    &.is-active {
      opacity: 1;
      z-index: 50;
      transform: scale(1);
      width: 250px;
      height: unset;
    }

    .name {
      font-weight: bold;
      max-width: 110px;
      line-height: 1.4;
      margin-left: 20px;
      margin-top: 10px;
    }

    .role {
      width: fit-content;
      font-size: 12px;
      background: #e9e9e9;
      padding: 2px 5px;
      margin-top: 7px;
      margin-left: 20px;
    }

    ul {
      list-style: none;
      margin: 20px 0 0;
      padding: 0;

      li {
        &:last-child {
          margin: 10px 0 5px;
        }
      }

      a {
        display: block;
        padding: 10px 20px;
        background: transparent;
        text-decoration: none;
        color: #000000;
        transition: $transitionSpeed;

        &:hover {
          background: #0000000d;
        }

        img {
          margin-right: 7px;
        }
      }
    }
  }
}
.avatar-img {
  width: 50px;
  height: 40px;
  border-radius: 50%; /* Makes the image circular */
  object-fit: cover; /* Ensures the image covers the area without stretching */
}

.avatar-initials {
  display: flex;
  align-items: center; /* Centers the initials vertically */
  justify-content: center; /* Centers the initials horizontally */
  width: 50px;
  height: 40px;
  border-radius: 50%; /* Makes the div circular */
  background-color: #1a74cd; /* Example background color, change as needed */
  color: white; /* Example text color, change as needed */
  font-size: 16px; /* Adjust based on your design */
  font-weight: bold; /* Makes the letters a bit thicker */
}

</style>
