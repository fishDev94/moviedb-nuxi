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
const config = useRuntimeConfig();

const { data, status, error, refresh, clear } = await useAsyncData<any>(
  "movies",
  () =>
    useFishFetch("discover/movie", {
      params: {
        include_adult: false,
        include_video: false,
        language: "it-IT",
        page: 2,
        sort_by: "popularity.desc",
      },
    })
);

console.log(data.value);
</script>
