<template>
    <div>
        <h1>favourites page</h1>
    </div>
</template>

<script lang=ts setup>
const { data } = useNuxtData("movies");

console.log("inside page", data.value)
</script>