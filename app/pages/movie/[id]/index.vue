<template>
  <h1>{{ data?.title }}</h1>
</template>

<script setup lang="ts">
import type { Movie } from '~/app/types/movieDB.type';

definePageMeta({
  middleware: ["movie-dispatch"],
});
const { data } = useNuxtData("movieDetails");

console.log(data.value);
</script>
