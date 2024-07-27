// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ["assets/global.css"],
  runtimeConfig: {
    public: {
      accessToken: process.env.NUXT_ACCESS_TOKEN,
    },
  },
});
