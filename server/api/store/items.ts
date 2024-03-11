import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const api = useApiFetch($event);
  const { facility_id, category, status } = getQuery($event);
  console.log(getQuery($event));
  if (facility_id) {
    const resp = await api("/store/get/items", {
      method: "POST",
      body: {
        facility_id,
        category,
        status,
      },
    });

    return resp;
  } else {
    console.error("Facility_id is missing. API call not made.");
    return null;
  }
});
