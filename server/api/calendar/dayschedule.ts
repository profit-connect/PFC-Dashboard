import dayjs from "dayjs";
import useApiFetch from "~/composables/useApi";

const formatTime = (time: string) => {
  return dayjs(`2024-01-01 ${time}`);
};

export default defineEventHandler(async ($event) => {
  const query = getQuery($event);
  const api = useApiFetch($event);
  const resp = await api("/calendar/get/dayschedule", {
    method: "POST",
    body: query,
  });

  const schedule = resp.schedule.length
    ? resp.schedule.sort((a: any, b: any) =>
        formatTime(a.start_time).isAfter(formatTime(b.start_time)) ? 1 : -1
      )
    : [];

  return {
    schedule,
  };
});
