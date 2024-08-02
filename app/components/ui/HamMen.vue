<template>
  <div @click="setActiveMenu" :class="`${isMenuActive ? 'active' : 'none'}`">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
  (e: "clickHamMenu", value: boolean): void;
}>();

const props = defineProps<{
  isMenuActive: boolean;
}>()

function setActiveMenu(): void {
  emits("clickHamMenu", !props.isMenuActive);
}
</script>

<style lang="scss" scoped>
@import "assets/styles/utils";

div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: max-content;

  span {
    background-color: rgb(var(--neutral));
    height: 3px;
    width: 25px;
    transition: all 0.5s;
    pointer-events: none;
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translateY(5px) translateX(5px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translateY(-6px) translateX(6px);
    }
  }
}

@include start-from("generic-desktop") {
  div {
    display: none;
    span {
      opacity: 0;
    }
  }
}
</style>
