import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
    const api = useApiFetch($event);
    const { facility_id , member_id } = getQuery($event);
    const resp = await api("/members/get/memberinfo", {
      method: "POST",
      body: {
        facility_id,
        member_id
      },
    });
    return resp;
  });