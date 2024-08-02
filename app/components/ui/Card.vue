<template>
    <nuxt-link class="nf-card" :to="`movie/${id}`">
        <img class="nf-card__img" :src="imgSrc" alt="" loading="lazy">
    </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
    imgSrc: string,
    id: number
}>();
</script>

<style lang="scss" scoped>
    .nf-card {
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
</style>