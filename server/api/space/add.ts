import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const api = useApiFetch($event);
  const body = await readBody($event);
  const resp = await api("/space/add/space", {
    method: "POST",
    body,
  });

  return resp;
});
