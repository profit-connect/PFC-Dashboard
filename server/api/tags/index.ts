import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const { facility_id } = getQuery($event);
  const api = useApiFetch($event);
  const resp = await api("/tags/get/tags", {
    method: "POST",
    body: {
      facility_id,
    },
  });

  return resp;
});
