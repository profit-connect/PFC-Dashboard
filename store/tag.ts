import { defineStore, acceptHMRUpdate } from "pinia";
import { useAuthStore } from "./auth";

export const useTagStore = defineStore("tags", () => {
  const { currentUserType } = useAuthStore();
  const facility_id = currentUserType?.id;
  const tags = ref();

  
  const getAllTags = async () => {
    try {
      const { data } = await useCustomFetch<any>("/tags/get/tags", {
        method: "POST",
        body: {
          facility_id: currentUserType?.id,
        },
      });
      tags.value = data.value.tags;
    } catch (err) {
      console.log("Error:/api/tags", err);
    } 
  };
  getAllTags();

  return {
    tags,
    getAllTags,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}
