import type { MovieDBResponse } from "../types/movieDB.type";

export default defineNuxtRouteMiddleware(async () => {
    const nuxtApp = useNuxtApp();

    await Promise.all([
        useAsyncData<MovieDBResponse | undefined>(
          "today",
          () =>
            useFishFetch<MovieDBResponse>("trending/all/day", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
        useAsyncData<MovieDBResponse | undefined>(
          "popular",
          () =>
            useFishFetch<MovieDBResponse>("movie/popular", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
        useAsyncData<MovieDBResponse | undefined>(
          "topRated",
          () =>
            useFishFetch<MovieDBResponse>("movie/top_rated", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
        useAsyncData<MovieDBResponse | undefined>(
          "upcoming",
          () =>
            useFishFetch<MovieDBResponse>("movie/upcoming", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
        useAsyncData<MovieDBResponse | undefined>(
          "airingTodayTV",
          () =>
            useFishFetch<MovieDBResponse>("tv/airing_today", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
        useAsyncData<MovieDBResponse | undefined>(
          "popularTV",
          () =>
            useFishFetch<MovieDBResponse>("tv/popular", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
        useAsyncData<MovieDBResponse | undefined>(
          "topRatedTV",
          () =>
            useFishFetch<MovieDBResponse>("tv/top_rated", {
              params: {
                include_video: true,
                language: "en-GB",
                page: 1,
              },
            }),
          {
            getCachedData(key) {
              return nuxtApp.isHydrating
                ? nuxtApp.payload.data[key]
                : nuxtApp.static.data[key];
            },
          }
        ),
      ]);
})