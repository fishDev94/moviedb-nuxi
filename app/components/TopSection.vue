<template>
  <section class="nf-top-section">
    <h2 :class="`nf-top-section__title ${size}`">{{ title }}</h2>
    <ui-carousel :indicator gap-mobile="2px" :size :paginators>
      <template #slides>
        <ui-card
          v-for="movie of useArrayLimit(8, movieList)"
          :key="movie.id"
          :img-src="pathImg(movie)"
          :data="movie"
          :size
        />
      </template>
    </ui-carousel>
  </section>
</template>

<script lang="ts" setup>
import type { Movie, MovieDBResponse, TV } from "~/app/types/movieDB.type";

const props = withDefaults(defineProps<{
  title: string;
  movieList: MovieDBResponse["results"];
  size?: string;
  indicator?: boolean;
  paginators?: string;
}>(), {
  size: 'normal',
  indicator: false,
  paginators: "default"
});

const isLarge = computed(() => props.size === 'large')
const pathImg = (movie: Movie | TV) => {
  if (isLarge.value) {
    return movie.backdrop_path
  }

  return movie.poster_path ?? movie.backdrop_path
}
</script>

<style lang="scss" scoped>
@import "assets/styles/utils";
.nf-top-section {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    font-size: 18px;
    color: rgb(var(--neutral), 0.8);

    &.large {
      position: absolute;
      top: 20px;
      z-index: 1;
      margin-left: 20px;
      color: rgb(var(--neutral));
      text-shadow: 1px 1px 4px rgba(var(--neutral-black));
      pointer-events: none;

      @include start-from(generic-desktop) {
        font-size: 2.4rem;
        top: 0;
        height: 78%;
        display: flex;
        align-items: center;
        margin-left: 80px;
      }
    }
  }
}
</style>
