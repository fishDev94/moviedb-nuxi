<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["movie-dispatch"],
});

const route = useRoute();
const { data } = useNuxtData("movieDetails");

const isTV = computed(() => route.params.movie_type === "tv")
const title = computed(() => {
  return isTV.value ? data.value.name : data.value.title;
})
</script>
