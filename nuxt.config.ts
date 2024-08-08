// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ["assets/styles/globals.scss", "primeicons/primeicons.css"],
  runtimeConfig: {
    public: {
      accessToken: process.env.NUXT_ACCESS_TOKEN,
    },
  },
  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: "genre",
        path: "/browse/genre/:id/",
        file: "~/pages/-genre.vue",
      });
    },
  },
});
