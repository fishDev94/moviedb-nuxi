<template>
  <section :class="{ 'moviedb-slide-menu': true, active: isHamMenuActive }">
    <ui-user-card />
    <hr />
    <ul>
      <li v-for="(element, idx) of menuList" :key="idx">
        <nuxt-link
          :to="element.href"
          class="link"
          active-class="active"
          @click="handleLinkClick"
          ><div class="nf-element__border"></div>
          {{ element.text }}</nuxt-link
        >
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  menuList: { text: string; href: string }[];
  isHamMenuActive: boolean;
}>();

const emits = defineEmits<{
  (e: "li:click"): void;
}>();

const handleLinkClick = () => {
  emits("li:click");
};
</script>

<style lang="scss" scoped>
@import "assets/styles/utils";

.moviedb-slide-menu {
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
  height: 100dvh;
  transform: translateX(-250px);
  transition: transform 0.15s cubic-bezier(0.5, 0, 0.1, 1);
  max-height: calc(100dvh - var(--nav-bar-height-mobile));
  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  @include start-from(generic-desktop) {
    display: none;
  }

  hr {
    border: 1px solid rgba(var(--main-gray));
  }

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    a {
      display: flex;
      line-height: 2;
      font-weight: 800;
      color: rgba(var(--neutral-10));

      .nf-element__border {
        height: auto;
        width: 16px;
      }

      &.active {
        color: rgba(var(--neutral));

        .nf-element__border {
          border-left: 4px solid rgb(var(--primary));
        }
      }
    }
  }
}

.moviedb-slide-menu.active {
  transform: translateX(0);
}
</style>
