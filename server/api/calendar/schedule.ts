import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const body = await readBody($event);
  const api = useApiFetch($event);
  const resp = await api("/calendar/add/schedule", {
    method: "POST",
    body: body,
  });

  return resp;
});
