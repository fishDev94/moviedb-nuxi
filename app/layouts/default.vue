<template>
  <div>
    <app-nav-bar />
    <main class="page-slot">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/styles/utils" as *;
.page-slot {
  margin-top: var(--nav-bar-height-mobile);

  @include start-from(generic-desktop) {
    margin-top: var(--nav-bar-height-desktop);
  }
}
</style>
