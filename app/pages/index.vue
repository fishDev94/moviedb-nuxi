<template>
  <main class="moviedb-home">
    <ul v-if="data">
      <li v-for="movie of data.results" :key="movie.id">
        <NuxtLink :to="`/movie/${movie.id}`">
          {{ (movie as Movie).title }}
        </NuxtLink>
      </li>
    </ul>

    <ul v-if="data">
      <li v-for="movie of data.results" :key="movie.id">
        <NuxtLink :to="`/movie/${movie.id}`">
          {{ (movie as Movie).title }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { MovieDBResponse, Movie } from "@/types/movieDB.type";

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
</script>

<style lang="scss" scoped>
  .moviedb-home {
    padding: 16px 20px;
  }
</style>