<template>
  <nav :class="{ 'moviedb-nav': true, active: isHamMenuActive }">
    <div class="moviedb-nav__first-content">
      <ui-ham-men
        class="moviedb-nav__ham-menu"
        @click-ham-menu="toggleMenuVisibility"
        :is-menu-active="isHamMenuActive"
      />
      <ui-logo class="moviedb-nav__logo" @click="pushToHome" />
    </div>
    <div class="moviedb-nav__second-content">
      <ui-app-input />
    </div>
    <div
      :class="{
        'moviedb-nav__slide-background': true,
        active: isHamMenuActive,
      }"
      @click="setHamMenuInactive"
    ></div>
    <ui-slide-menu
      :menu-list
      :is-ham-menu-active
      @li:click="setHamMenuInactive"
    />
  </nav>
</template>

<script lang="ts" setup>
import type { Genre } from "~/app/types/movieDB.type";

const isHamMenuActive = ref<boolean>(false);
const { data: genres } = useNuxtData<{ genres: Genre[] }>("genres");

const router = useRouter();

const menuList = ref<{ text: string; href: string }[]>([
  {
    text: "Home",
    href: "/",
  },
  {
    text: "My Favourites",
    href: "/favourites",
  },
  ...(genres.value?.genres
    ? genres.value.genres.map((genre) => {
        return {
          text: genre.name,
          href: `/browse/genre/${genre.id}`,
        };
      })
    : []),
]);

const pushToHome = () => {
  router.push("/");
};

const toggleMenuVisibility = (e: boolean) => {
  isHamMenuActive.value = e;
};

const setHamMenuInactive = () => {
  isHamMenuActive.value = false;
};
</script>

<style lang="scss" scoped>
@import "assets/styles/utils";
.moviedb-nav {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: var(--nav-bar-height-mobile);
  padding: 0 20px;
  align-items: center;
  background-color: rgba(var(--neutral-black), 0.45);
  backdrop-filter: blur(1.5px);

  @include start-from(generic-desktop) {
    height: var(--nav-bar-height-desktop);
    padding: 0 34px;
  }

  &.active {
    background-color: rgba(var(--neutral-black));
  }

  li {
    list-style: none;
  }

  &__first-content,
  &__second-content {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 50%;
  }

  &__second-content {
    justify-content: flex-end;
  }

  &__logo {
    height: 24px;
    width: 84px;
    fill: rgb(var(--primary));

    @include start-from(generic-desktop) {
      height: 30px;
      width: 100px;
    }
  }

  &__slide-background.active {
    position: absolute;
    top: var(--nav-bar-height-mobile);
    left: 0;
    z-index: 1;
    height: calc(100dvh - var(--nav-bar-height-mobile));
    width: 100%;
    pointer-events: none;

    @include start-from(generic-desktop) {
      display: none;
    }

    &.active {
      background-color: rgba(var(--neutral-black), 0.6);
      pointer-events: all;
    }
  }
}
</style>
