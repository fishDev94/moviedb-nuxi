import type { Movie } from "~/app/types/movieDB.type";

export default defineNuxtRouteMiddleware(async (to) => {
  const id = to.params.id;
  const movie_type = to.params.movie_type;
  const nuxtApp = useNuxtApp();

  await useAsyncData(
    "movieDetails",
    () =>
      useFishFetch<Movie>(`${movie_type}/${id}`, {
        params: {
          language: "en-GB",
        },
      }),
    {
      getCachedData(key) {
        return nuxtApp.isHydrating
          ? nuxtApp.payload.data[key]
          : nuxtApp.static.data[key];
      },
    }
  );
});
