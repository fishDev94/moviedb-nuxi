<template>
  <nuxt-link :class="{ card: true, large: isLarge }" :to="toPath">
    <h3 v-if="isLarge" class="card__title">{{ title }}</h3>
    <nuxt-img
      class="card__img"
      format="webp"
      :src="useImageUrl(imgSrc, { isLarge })"
      alt="movie-poster"
      :loading="isLarge ? 'eager' : 'lazy'"
      placeholder
      sizes="(max-width: 600px) 300px, (max-width: 1200px) 500px, 1280px"
      :srcset="useImageSrcset(imgSrc)"
    />
    <div :class="{ card__info: true, large: isLarge }"></div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { Movie, TV } from "~/app/types/movieDB.type";

const props = withDefaults(
  defineProps<{
    imgSrc: string;
    data: Movie | TV;
    size?: string;
    title?: string;
  }>(),
  {
    size: "normal",
  }
);

const isLarge = computed(() => {
  return props.size === "large";
});

const isMovie = computed(() => {
  return !!(props.data as Movie).title;
});

const toPath = computed(() => {
  return isMovie.value ? `movie/${props.data.id}` : `tv/${props.data.id}`;
});

const title = computed(() => {
  return isMovie.value ? (props.data as Movie).title : (props.data as TV).name;
});
</script>

<style lang="scss" scoped>
@use "assets/styles/utils" as *;
.card {
  position: relative;
  flex: 0 0 auto;
  width: 180px;
  height: 100px;
  overflow: hidden;

  &__title {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: rgb(var(--neutral));
    text-shadow: 1px 1px 4px rgba(var(--neutral-black));
    background-color: rgba(var(--neutral-black), 0.2);

    @include start-from(generic-desktop) {
      font-size: 2.2rem;
      margin-left: 80px;
      justify-content: flex-start;
      width: max-content;
      background-color: transparent;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: background 0.2s ease-in-out;
  }

  @include start-from(generic-desktop) {
    height: 220px;
    width: 360px;

    &:hover {
      .card__info {
        background-color: rgba(var(--neutral-black), 0.3);
      }
    }
  }
}

.card.large {
  width: 100%;
  height: 200px;
  cursor: pointer;

  @include start-from(generic-desktop) {
    height: 400px;
  }
}

.card__info.large {
  display: none;
}
</style>
