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
import type { MovieDBResponse } from "~/app/types/movieDB.type";

const { data: today } = await useAsyncData<MovieDBResponse | undefined>(
  "treding-today",
  () =>
    useFishFetch<MovieDBResponse>("trending/all/day", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);

const { data: popular } = await useAsyncData<MovieDBResponse | undefined>(
  "popular",
  () =>
    useFishFetch<MovieDBResponse>("movie/popular", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);

const { data: topRated } = await useAsyncData<MovieDBResponse | undefined>(
  "top-rated",
  () =>
    useFishFetch<MovieDBResponse>("movie/top_rated", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);

const { data: upcoming } = await useAsyncData<MovieDBResponse | undefined>(
  "upcoming",
  () =>
    useFishFetch<MovieDBResponse>("movie/upcoming", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);

const { data: airingTodayTV } = await useAsyncData<MovieDBResponse | undefined>(
  "airing-today",
  () =>
    useFishFetch<MovieDBResponse>("tv/airing_today", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);

const { data: popularTV } = await useAsyncData<MovieDBResponse | undefined>(
  "popular",
  () =>
    useFishFetch<MovieDBResponse>("tv/popular", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);

const { data: topRatedTV } = await useAsyncData<MovieDBResponse | undefined>(
  "top-rated-tv",
  () =>
    useFishFetch<MovieDBResponse>("tv/top_rated", {
      params: {
        include_video: true,
        language: "en-GB",
        page: 1,
      },
    })
);
</script>

<style lang="scss" scoped>
@import "assets/styles/utils";
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
