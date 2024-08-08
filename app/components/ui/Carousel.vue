<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";

const carousel = ref(null);
const clientWidth = ref(1);
const scrollLeft = ref(0);
const scrollWidth = ref(0);
const calculatedIndex = ref(0);
const CarouselLength = ref(0);
const cardSize = ref(0);

const props = withDefaults(
  defineProps<{
    type?: string;
    indicator?: boolean;
    gapMobile?: string;
    size?: string;
    paginators?: string;
  }>(),
  { indicator: true, gapMobile: "0px" }
);

const gap = computed(() => {
  return +props.gapMobile.replace("px", "");
});

const isLarge = computed(() => props.size === "large");

onMounted(() => {
  const carouselRef = carousel.value! as HTMLDivElement;

  if ("onscrollend" in window) {
    carouselRef.addEventListener("scrollend", updateScrollValue);
  } else {
    carouselRef.onscroll = () => {
      clearTimeout((window as any).scrollEndTimer);
      (window as any).scrollEndTimer = setTimeout(updateScrollValue, 100);
    };
  }
});

onBeforeRouteLeave((_1, _2, next) => {
  const carouselRef = carousel.value! as HTMLDivElement;
  if ("onscrollend" in window) {
    carouselRef.removeEventListener("scrollend", updateScrollValue);
  } else {
    carouselRef.onscroll = null;
  }
  next();
});

const handleClick = (direction: "previous" | "next") => {
  if (carousel.value) {
    const carouselEl: HTMLDivElement = carousel.value;
    const isPrev = direction === "previous";
    const scrollLeft =
      carouselEl.scrollLeft + (isPrev ? -cardSize.value : cardSize.value);

    carouselEl.scroll({ left: scrollLeft, top: 0 });
  }
};

const updateScrollValue = () => {
  const carouselTarget = carousel.value! as HTMLDivElement;

  CarouselLength.value = carouselTarget.children.length;
  cardSize.value =
    carouselTarget.children[0]?.getBoundingClientRect().width ?? 0;

  clientWidth.value = carouselTarget.clientWidth;
  scrollLeft.value = carouselTarget.scrollLeft;
  scrollWidth.value = carouselTarget.scrollWidth;
  calculatedIndex.value = Math.trunc(
    (scrollLeft.value - gap.value) / cardSize.value
  );
};

useResizeObserver(carousel, () => {
  updateScrollValue();
});

const isMaxScrollValue = computed(() => {
  const scrollDimension = scrollWidth.value - clientWidth.value;

  if (scrollDimension > scrollLeft.value) {
    return scrollDimension === Math.ceil(scrollLeft.value);
  } else if (scrollDimension < scrollLeft.value) {
    return scrollDimension === Math.floor(scrollLeft.value);
  } else if (scrollDimension === scrollLeft.value) {
    return true;
  } else {
    return false;
  }
});

const isMinScrollValue = computed(() => scrollLeft.value === 0);
</script>

<script lang="ts">
/**
 * @module CarouselComponent
 * @param {String} type it define if this carousel is a photo gallery or by default a simple card carousel
 * @param {Boolean} indicator it will active the indicator on your carousel - best with slider mode
 * @param {String} gapMobile accept string with px values to set gap for mobile version 0px by default
 * @param {String} size accept string 'large' or 'medium' for example, and it pass to card
 * @param {String} paginators accept full screen
 */
export default {
  name: "Carousel",
};
</script>

<template>
  <div class="carousel">
    <div :class="`carousel__scroller ${paginators}`" ref="carousel">
      <slot name="slides"></slot>
    </div>
    <div v-if="isLarge" class="carousel__overlay"></div>
    <div :class="`carousel__navigation-container ${paginators}`">
      <button
        :class="`${isMinScrollValue ? 'inactive' : ''}`"
        @click="handleClick('previous')"
        aria-label="arrow-left"
      >
        <i class="pi pi-angle-left"></i>
      </button>
      <button
        id="skip"
        :class="`${isMaxScrollValue ? 'inactive' : ''}`"
        @click="handleClick('next')"
        aria-label="arrow-right"
      >
        <i class="pi pi-angle-right"></i>
      </button>
    </div>
    <div
      :class="{ 'carousel__pagination-container': true, large: isLarge }"
      v-if="indicator"
    >
      <span
        v-for="(_, index) in Array(CarouselLength)"
        :class="`${type ? 'photo' : ''} ${
          useNumberEquality(index, calculatedIndex) && 'active'
        }`"
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/styles/utils";

.carousel {
  position: relative;
  max-width: 1440px;
  overflow: hidden;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: rgb(var(--neutral));
    background: -moz-linear-gradient(
      180deg,
      rgba(var(--neutral), 0) 36%,
      rgba(var(--neutral-black), 0.7315301120448179) 88%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(var(--neutral), 0) 36%,
      rgba(var(--neutral-black), 0.7315301120448179) 88%
    );
    background: linear-gradient(
      180deg,
      rgba(var(--neutral), 0) 36%,
      rgba(var(--neutral-black), 0.7315301120448179) 88%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#000000",GradientType=1);
  }

  &__scroller {
    margin: 0 20px;
    display: flex;
    gap: 16px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    &.full-screen {
      margin: auto;
    }

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    @include start-from(phone) {
      gap: v-bind("props.gapMobile");
      margin: auto;
    }
  }

  &__navigation-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    pointer-events: none;

    &.full-screen {
      button {
        background-color: rgba(var(--neutral-black), 0.2);
        height: 100%;
        width: 50px;
        border-radius: 0;
        backdrop-filter: blur(2px);
        transition: background 0.2s ease-in-out;

        &:hover {
          background-color: rgba(var(--neutral-black), 0.7);
        }
      }

      i {
        color: rgba(var(--neutral));
      }
    }

    button {
      position: relative;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      border: 0;
      cursor: pointer;
      pointer-events: all;

      @include start-from(phone) {
        display: none;
      }

      &.inactive {
        opacity: 0;
        pointer-events: none;
      }

      i {
        color: rgb(var(--secondary));
        font-size: 1.2rem;
      }
    }
  }

  &__pagination-container {
    position: absolute;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    bottom: 0;
    height: 40px;
    width: 100%;

    @include start-from(generic-desktop) {
      display: none;
    }

    .photo {
      background-color: rgba(var(--neutral));
    }

    span {
      display: block;
      height: 10px;
      width: 10px;
      background-color: rgba(var(--neutral), 1);
      opacity: 0.2;
      border-radius: 100%;
      transition: all 0.15s;

      &.active {
        opacity: 0.7;
        transform: scale(1.2);
      }
    }
  }

  &__pagination-container.large {
    @include start-from(generic-desktop) {
      display: flex;
      gap: 12px;

      span {
        height: 12px;
        width: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
@import "assets/styles/utils";

.card.card {
  scroll-snap-align: start;
}
</style>
