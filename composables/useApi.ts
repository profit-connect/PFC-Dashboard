import { ofetch } from "ofetch";
import type { H3Event } from "h3";
export default ($event: H3Event) => {
  const config = useRuntimeConfig();
  // retrieve the required header and pass to header ( eg: User IP)
  // const headers = getHeaders($event);
  const userAuth = getCookie($event, "token") || "";

  return ofetch.create({
    baseURL: config.CDN_URL,
    headers: {
      Authorization: `Bearer ${userAuth}`,
      accept: "application/json",
    },
  });
};
