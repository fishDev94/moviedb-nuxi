import type { Movie } from "~/types/movieDB.type";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const id = to.params.id;

    await useAsyncData("movieDetails", () =>
      useFishFetch<Movie>(`movie/${id}`, {
        params: {
          language: "en-GB",
        },
      })
    );
});
