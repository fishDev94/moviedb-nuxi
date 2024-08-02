<template>
  <main class="moviedb-home" v-if="data">
    <top-section title="Popular Movies" :movie-list="data.results"/>
  </main>
</template>

<script setup lang="ts">
import type { MovieDBResponse, Movie } from "~/app/types/movieDB.type";

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

console.log(data.value);
</script>

<style lang="scss" scoped>
.moviedb-home {
  padding: 16px 20px;
}
</style>
