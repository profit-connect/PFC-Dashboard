import useApiFetch from "~/composables/useApi";
import { cleanObjectL1 } from "@/utils/dataCleaner";

export default defineEventHandler(async ($event) => {
  const { facility_id } = getQuery($event);
  const api = useApiFetch($event);
  const body = await readBody($event);

  const resp = await api("/tags/add/tag", {
    method: "POST",
    body: cleanObjectL1(body),
  });

  return resp;
});
