import type { Movie } from "~/app/types/movieDB.type";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const id = to.params.id;

  console.log(id)

  await useAsyncData("movieDetails", () =>
      useFishFetch<Movie>(`movie/${id}`, {
        params: {
          language: "en-GB",
        },
      })
    );
});
