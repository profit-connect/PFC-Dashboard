import { defineStore } from "pinia";
export const useRoleStore = defineStore("role", () => {
    const staffRoles = [
        { label: "COO", value: "1" },
        { label: "Franchise Owner", value: "2" },
        { label: "Store Keeper", value: "3" },
        { label: "Managers", value: "4" },
        { label: "Store Manager", value: "5" },
        { label: "Task Manager", value: "6" },
        { label: "Admin", value: "7" },
        { label: "Branch Manager", value: "8" },
        { label: "Team Lead", value: "9" },
      ];
      return {
        staffRoles,
      };
});