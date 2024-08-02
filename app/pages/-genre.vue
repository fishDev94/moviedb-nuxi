<template>
    <div>
        <h1>genre page {{ id }}</h1>
    </div>
</template>

<script lang=ts setup>
const route = useRoute();

const id = route.params.id;
</script>