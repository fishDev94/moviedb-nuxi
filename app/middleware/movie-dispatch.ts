import type { Movie } from "~/app/types/movieDB.type";

export default defineNuxtRouteMiddleware(async (to) => {
  const id = to.params.id;
  const movie_type = to.params.movie_type;

  await useAsyncData("movieDetails", () =>
      useFishFetch<Movie>(`${movie_type}/${id}`, {
        params: {
          language: "en-GB",
        },
      })
    );
});
