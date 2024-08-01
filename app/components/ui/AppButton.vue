<template>
    <button class="main-button active">
        {{ text }}
    </button>
</template>

<script lang=ts setup>
withDefaults(defineProps<{
    text?: string,
    active?:boolean,
}>(), {
    text: 'Placeholder',
    active: false
});
</script>

<style lang="scss" scoped>
    .main-button {
        padding: 8px;
        border: none;
        background-color: rgb(var(--neutral));
        color: rgb(var(--neutral-black));
        font-size: 0.75rem;

    }

    .active {
        background-color: rgb(var(--primary));
        color: rgb(var(--neutral));
    }
</style>