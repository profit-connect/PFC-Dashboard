import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async ($event) => {
  const api = useApiFetch($event);
  const { facility_id } = getQuery($event);
  // console.log(facility_id, "facility_id");
  const api1 = api("/space/get/categories", {
    method: "POST",
    body: {
      facility_id,
    },
  });
  const api2 = api("/category/get/categories", {
    method: "POST",
    body: {
      facility_id,
    },
  });
  try {
    const resp = await Promise.all([api1, api2]);
    const spaces = resp[0].categories.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
        rooms: item.room
          .filter((item: any) => item)
          .map((room: any) => {
            if (room)
              return {
                label: room.name,
                value: room.id,
              };
          }),
      };
    });
    const classes = resp[1].categories.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    return { spaces, classes };
  } catch (err) {}
});
