import { defineStore, acceptHMRUpdate } from "pinia";
import { IFranchise, IFranchiseElement, IFacility } from "@/types/franchise";

export const useFranchiseStore = defineStore(
  "franchise",
  () => {
    const franchise: Ref<IFranchise | undefined> = ref();

    const getCurrentFranchiseOrCurrentFacility = (name: string) => {
      if (franchise.value) {
        const tempFranchise = franchise.value.franchise.find(
          (item: IFranchiseElement) => item.name === name
        );
        if (tempFranchise) {
          return {
            type: "franchise",
            id: tempFranchise.id,
            name: tempFranchise.name,
          };
        } else {
          for (let i = 0; i < franchise.value.franchise.length; i++) {
            const tempFacility = franchise.value.franchise[i].facility.find(
              (item: IFacility) => item.name === name
            );
            if (tempFacility)
              return {
                type: "facility",
                id: tempFacility.id,
                name: tempFacility.name,
              };
          }
        }
        return null;
      }
    };

    // for fetching all franchises
    const getAllFranchises = async () => {
      try {
        const { data } = await useCustomFetch<any>("/franchise/get/franchise");
        franchise.value = data.value;
      } catch (err) {
        console.log("Error:/franchise/get/franchise", err);
      }
    };

    return {
      franchise,
      getAllFranchises,
      getCurrentFranchiseOrCurrentFacility,
    };
  },
  {
    persist: [
      {
        paths: ["franchise"],
      },
    ],
  }
);
// add these statement incase hot reload required while developing
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFranchiseStore, import.meta.hot));
}
