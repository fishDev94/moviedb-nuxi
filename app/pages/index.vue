<template>
  <main class="nf-home">
    <top-section
      class="nf-home__hero"
      v-if="today"
      title="Trading Today"
      :movie-list="today.results"
      size="large"
      :indicator="true"
      paginators="full-screen"
    />
    <section class="nf-home__movies-section">
      <h2 class="nf-home__section-title">Movies</h2>
      <div class="nf-home__movies-section-content">
        <top-section
          v-if="popular"
          title="Popular Movies"
          :movie-list="popular.results"
        />
        <top-section
          v-if="topRated"
          title="Top Rated"
          :movie-list="topRated.results"
        />
        <top-section
          v-if="upcoming"
          title="Upcoming"
          :movie-list="upcoming.results"
        />
      </div>
    </section>
    <section class="nf-home__tv-section">
      <h2 class="section title">TV Series</h2>
      <div class="nf-home__tv-section-content">
        <top-section
          v-if="airingTodayTV"
          title="Airing Today"
          :movie-list="airingTodayTV.results"
        />
        <top-section
          v-if="popularTV"
          title="Popular TV Series"
          :movie-list="popularTV.results"
        />
        <top-section
          v-if="topRatedTV"
          title="Top Rated TV Series"
          :movie-list="topRatedTV.results"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["home-fetch"],
});

const nuxtApp = useNuxtApp();

const {
  today,
  popular,
  topRated,
  upcoming,
  airingTodayTV,
  popularTV,
  topRatedTV,
} = nuxtApp.payload.data;

useHead({
  title: "NuxFlex",
  meta: [
    {
      name: "description",
      content: "NuxFlex | Discovery the best movie of the moment",
    },
  ],
  link: [
    {
      rel: "preload",
      type: "image/png",
      href: "https://critics.io/img/movies/poster-placeholder.png",
      as: "image",
    },
    {
      rel: "preload",
      href: "/logo.svg",
      as: "image",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@200;300;400;800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
      rel: "stylesheet",
    },
  ],
});
</script>

<style lang="scss" scoped>
@use "assets/styles/utils" as *;
.nf-home {
  &__hero {
    width: 100%;

    :deep(.carousel) {
      width: 100%;
      max-width: none;
    }
  }

  &__movies-section,
  &__tv-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 1440px;
    margin-inline: auto;
    padding: 20px;

    @include start-from(generic-desktop) {
      padding: 34px;
    }
  }

  &__movies-section-content,
  &__tv-section-content {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
}
</style>
