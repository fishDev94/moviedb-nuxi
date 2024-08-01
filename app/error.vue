<template>
  <nuxt-layout>
    <main class="mdb-error-page">
      <h1 class="mdb-error-page__title">404 Not Found</h1>
      <div class="mdb-error-page__description">
        <p class="mdb-error-page__text">Sorry! Maybe is not you</p>
        <p class="mdb-error-page__error-message">Error: {{ error?.message }}</p>
      </div>
      <ui-app-button text="Go Back Home" @click="pushToHome"/>
    </main>
  </nuxt-layout>
</template>

<script lang="ts" setup>
const error = useError();
const router = useRouter();

const pushToHome = () => {
    router.push("/");
}
</script>

<style lang="scss" scoped>
.mdb-error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: calc(100dvh - var(--nav-bar-height-mobile));

  &__title {
    text-transform: uppercase;
    height: 32px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  &__text {
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(var(--primary));
  }

  &__error-message {
    font-size: 0.8rem;
    color: rgba(var(--neutral), 0.5);
  }
}
</style>
