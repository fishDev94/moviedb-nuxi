<template>
  <input class="app-input" type="text" placeholder="Search" />
</template>

<style lang="scss" scoped>
@import "assets/styles/utils";
.app-input {
  width: 8em;
  border: 1px solid rgb(var(--neutral));
  padding: 3px 0.5em;
  font-size: 12px;
  color: rgb(var(--neutral));
  background-color: rgb(var(--main-gray));
  border-radius: none;

  @include start-from(generic-desktop) {
    width: 18em;
    padding: 4px 0.5em;
    font-size: 1rem;
  }
}
</style>
