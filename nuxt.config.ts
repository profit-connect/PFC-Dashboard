export default defineNuxtConfig({
  //  app: {
  //   baseURL: '/Profit-Connect/',
  // },
  devtools: { enabled: false },
  css: [
    "assets/scss/global.scss",
    "assets/scss/formkit.scss",
    "assets/scss/app.scss",
    "assets/scss/utility.scss",
  ],
  plugins: [{ src: "~/plugins/bootstrap.client", mode: "client" }],
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@formkit/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-lodash",
    "nuxt-swiper",
    "dayjs-nuxt",
  ],
  formkit: {
    autoImport: true,
    configFile: "./formkit.config.ts",
  },
  ssr: false,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/_tools/_variables.scss";
            @import "@/assets/scss/_tools/mixins";
            @import "@/assets/scss/_tools/helpers";`,
        },
      },
    },
  },
  image: {
    none: {},
    providers: {
      backend: {
        name: "backend",
        provider: "~/utils/providers/boImage.ts",
        options: {
          baseURL: "https://app.ihitreset.com/resetcrm",
        },
      },
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  runtimeConfig: {
    // private variable
    API_URL: "https://app.ihitreset.com/resetcrm/dashboard",
    CDN_URL: "https://app.ihitreset.com/resetcrm",
    public: {
      imageUrl: "https://app.ihitreset.com/resetcrm",
      API_URL: "https://app.ihitreset.com/resetcrm/dashboard",
      CDN_URL: "https://app.ihitreset.com/resetcrm",
      // for any variable which need to access in both ssr and client side
    },
  },
});
