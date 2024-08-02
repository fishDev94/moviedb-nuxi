<template>
  <nav :class="{'moviedb-nav': true, active: isHamMenuActive}">
    <div class="moviedb-nav__first-content">
      <ui-ham-men class="moviedb-nav__ham-menu" @click-ham-menu="toggleMenuVisibility" :is-menu-active="isHamMenuActive"/>
      <ui-logo class="moviedb-nav__logo" @click="pushToHome"/>
    </div>
    <div class="moviedb-nav__second-content">
      <ui-app-input />
    </div>
    <div :class="{'moviedb-nav__slide-background': true, active: isHamMenuActive}" @click="setHamMenuInactive"></div>
    <div :class="{'moviedb-nav__genres-menu': true, active: isHamMenuActive}">
      <ui-user-card />
      <hr />
      <ul>
        <li v-for="(element, idx) of menuList" :key="idx">
          <nuxt-link :to="element.href" class="link" active-class="active" @click="setHamMenuInactive"><div class="nf-element__border"></div>{{ element.text }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { Genre } from '~/app/types/movieDB.type';

const isHamMenuActive = ref<boolean>(false);
const { data: genres } = useNuxtData<{ genres: Genre[] }>('genres')

const router = useRouter();

  const menuList = ref<{ text: string, href: string }[]>([
  {
    text: 'Home',
    href: '/'
  },
  {
    text: 'My Favourites',
    href: '/favourites'
  },
  ...(genres.value?.genres ? genres.value.genres.map(genre => {
    return {
      text: genre.name,
      href: `/browse/genre/${genre.id}`
    }
  }) : [])
])

const pushToHome = () => {
    router.push("/");
}

const toggleMenuVisibility = (e: boolean) => {
  isHamMenuActive.value = e;
}

const setHamMenuInactive = () => {
  isHamMenuActive.value = false;
}
</script>

<style lang="scss" scoped>
.moviedb-nav {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: var(--nav-bar-height-mobile);
  padding: 0 20px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.153);
  backdrop-filter: blur(0.8px);

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
  }

  &__slide-background.active {
    position: absolute;
    top: var(--nav-bar-height-mobile);
    left: 0;
    z-index: 1;
    height: calc(100dvh - var(--nav-bar-height-mobile));
    width: 100%;
    pointer-events: none;

    &.active {
      background-color: rgba(var(--neutral-black), 0.6);
      pointer-events: all;
    }
  }

  &__genres-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
    top: var(--nav-bar-height-mobile);
    z-index: 1;
    left: 0;
    background-color: rgba(var(--neutral-black));
    width: 250px;
    transform: translateX(-250px);
    transition: transform .15s cubic-bezier(.5,0,.1,1);
    max-height: calc(100dvh - var(--nav-bar-height-mobile));
    overflow-y: scroll;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    hr {
      border: 1px solid rgba(var(--main-gray));
    }

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    li {
      
      a {
        display: flex;
        align-items: center;

        .nf-element__border {
          height: 18px;
          width: 16px;
        }
        
        &.active {
          .nf-element__border {
          border-left: 4px solid rgb(var(--primary));
          }
        }
      }
    }
  }

  &__genres-menu.active {
    transform: translateX(0);
  }
}
</style>
