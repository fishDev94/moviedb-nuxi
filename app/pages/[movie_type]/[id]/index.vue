<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
import type { Movie, TV } from '~/app/types/movieDB.type';

definePageMeta({
  middleware: ["movie-dispatch"],
});

const route = useRoute();
const { data } = useNuxtData<Movie | TV>("movieDetails");

const isTV = computed(() => route.params.movie_type === "tv")
const title = computed(() => {
  return isTV.value ? (data.value as TV).name : (data.value as Movie).title;
})
</script>
