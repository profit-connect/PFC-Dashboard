import type { UseFetchOptions } from "#app";
import { defu } from "defu";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const userAuth = useCookie("token");
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.CDN_URL,
    key: url,
    headers: userAuth.value
      ? {
          // Authorization: `Bearer ${userAuth.value}`,
          accept: "application/json",
        }
      : { accept: "application/json" },

    onResponse(_ctx) {},

    onResponseError(_ctx) {},
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
