import type { Movie } from "~/types/movieDB.type";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(from);
  const id = to.params.id;

  await useAsyncData("movieDetails", () =>
    useFishFetch<Movie>(`movie/${id}`, {
      params: {
        language: "en-GB",
      },
    })
  );
});
