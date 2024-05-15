import { defineStore, acceptHMRUpdate } from "pinia";
import { IAuth, IUserType } from "@/types/auth";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const currentUserType: Ref<IUserType | undefined> = ref();
    const loggedUser = ref();
    const token = useCookie("token");
    const selectedRoomId = useStorage("SELECTED_ROOM_ID", undefined);
    const selectedClass = useStorage("SELECTED_ROOM_INDEX", -1);

    const router = useRouter();
    const initLogout = () => {
      console.log("Logging out...");
      loggedUser.value = undefined;
      currentUserType.value = undefined;
      selectedRoomId.value = undefined; 
      selectedClass.value = -1; 
      token.value = null;

      // Manually clear localStorage as a fallback
      localStorage.removeItem("SELECTED_ROOM_ID");
      localStorage.removeItem("SELECTED_ROOM_INDEX");

      router.push("/auth/login");
    };

    const initClientAuthSetup = (
      currentUser: Ref<IAuth>,
      currentType: IUserType
    ) => {
      token.value = currentUser.value.token;
      currentUserType.value = currentType;
      loggedUser.value = {
        email: currentUser.value.email,
        firstname: currentUser.value.firstname,
        lastname: currentUser.value.lastname,
        role: currentUser.value.role,
        id: currentUser.value.ID,
        img_src: currentUser.value.img_src,
      };

      router.push("/");
    };

    return {
      currentUserType,
      loggedUser,

      initClientAuthSetup,
      initLogout,
    };
  },
  {
    persist: [
      {
        paths: ["loggedUser", "currentUserType"],
      },
    ],
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
