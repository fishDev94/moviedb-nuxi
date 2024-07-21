<template>
  <div>
    <nav>
      <NuxtLink to="/movie">Movie</NuxtLink>
    </nav>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import type { MovieDBResponse, Movie } from "@/types/movieDB.type";
const config = useRuntimeConfig();

const { data, status, error, refresh, clear } = useAsyncData<
  MovieDBResponse | undefined
>("movies", () =>
  useFishFetch<MovieDBResponse>("discover/movie", {
    params: {
      include_adult: false,
      include_video: true,
      language: "en-GB",
      page: 1,
      sort_by: "popularity.desc",
    },
  })
);

console.log((data.value?.results as Movie[])?.[0]?.title);
</script>
