import { defineStore, acceptHMRUpdate } from "pinia";
import { IAuth, IUserType } from "@/types/auth";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const currentUserType: Ref<IUserType | undefined> = ref();
    const loggedUser = ref();
    const token = useCookie("token");
 
    const router = useRouter();
    const initLogout = () => {
      loggedUser.value = undefined;
      loggedUser.value = undefined;
      token.value = null;
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
        img_src: currentUser.value.img_src
       
  
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
