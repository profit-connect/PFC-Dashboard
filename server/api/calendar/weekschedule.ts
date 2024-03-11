import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const query = getQuery($event);
  const api = useApiFetch($event);
  const resp = await api("/calendar/get/weekschedule", {
    method: "POST",
    body: query,
  });

  return resp;
});
