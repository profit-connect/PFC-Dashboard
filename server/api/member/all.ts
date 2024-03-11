import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const api = useApiFetch($event);
  const { facility_id } = getQuery($event);
  const resp = await api("/members/get/members", {
    method: "POST",
    body: {
      facility_id,
    },
  });
  return resp;
});
