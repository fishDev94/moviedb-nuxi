<template>
  <nuxt-link :class="{ card: true, large: isLarge }" :to="toPath">
    <nuxt-img
      class="card__img"
      format="webp"
      :src="useImageUrl(imgSrc, { isLarge })"
      alt="movie-poster"
      :loading="isLarge ? 'eager' : 'lazy'"
      placeholder
      sizes="(max-width: 600px) 300px, (max-width: 1200px) 500px, 1280px"
      :srcset="`${useImageUrl(imgSrc, {w: 'w300'})} 300w,
    ${useImageUrl(imgSrc, { w: 'w500'})} 500w,
    ${useImageUrl(imgSrc, { w: 'w1280'})} 1280w,`"
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
</script>

<style lang="scss" scoped>
@import "assets/styles/utils";
.card {
  position: relative;
  flex: 0 0 auto;
  width: 180px;
  height: 100px;
  overflow: hidden;

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
