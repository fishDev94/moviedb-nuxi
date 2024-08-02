<template>
  <section class="nf-top-section">
    <h2 class="nf-top-section__title">{{ title }}</h2>
    <ui-carousel :indicator="false" gap-mobile="2px">
      <template #slides>
        <ui-card
          v-for="movie of useArrayLimit(8, movieList)"
          :key="movie.id"
          :img-src="useImageUrl(movie.poster_path)"
          :id="movie.id"
        />
      </template>
    </ui-carousel>
  </section>
</template>

<script lang="ts" setup>
import type { MovieDBResponse } from "~/app/types/movieDB.type";

defineProps<{
  title: string;
  movieList: MovieDBResponse["results"];
}>();
</script>

<style lang="scss" scoped>
.nf-top-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    font-size: 18px;
    color: rgb(var(--neutral), 0.8);
  }
}
</style>
