<template>
    <nuxt-link :class="{card: true, large: isLarge}" :to="toPath">
        <img class="card__img" :src="imgSrc" alt="" loading="lazy">
    </nuxt-link>
</template>

<script lang="ts" setup>
import type { Movie, TV } from '~/app/types/movieDB.type';

const props = withDefaults(defineProps<{
    imgSrc: string,
    data: Movie | TV
    size?: string
}>(), {
    size: "normal"
}); 

const isLarge = computed(() => {
    return props.size === "large"
})

const isMovie = computed(() => {
    return !!(props.data as Movie).title
})

const toPath = computed(() => {
    return isMovie.value ? `movie/${props.data.id}` : `tv/${props.data.id}`
})
</script>

<style lang="scss" scoped>
    .card {
        flex: 0 0 auto;
        width: 180px;
        height: 100px;
        overflow: hidden;

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .large {
        width: 100%;
        height: 140px;
    }
</style>