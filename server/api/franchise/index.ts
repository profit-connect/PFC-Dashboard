import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async (event) => {
  const api = useApiFetch(event);
  const resp = await api("/franchise/get/franchise");

  return resp;
});
