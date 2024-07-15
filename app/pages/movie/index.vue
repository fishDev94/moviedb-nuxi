<template>
  <div>Page movie</div>
</template>

<script setup lang="ts">
const { data } = useNuxtData("movies");

const asd = await useFishFetch("discover/movie", {
  params: {
    include_adult: false,
    include_video: true,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
  },
});
console.log(asd);
</script>
