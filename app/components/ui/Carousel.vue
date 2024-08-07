<script setup lang="ts">
import { ref } from "vue";

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
  }>(),
  { indicator: true, gapMobile: "0px" }
);

const gap = computed(() => {
  return +props.gapMobile.replace("px", "");
});

const isLarge = computed(() => props.size === "large");

onMounted(() => {
  const carouselRef = carousel.value! as HTMLDivElement;
  CarouselLength.value = carouselRef.children.length;
  cardSize.value = carouselRef.children[0]?.getBoundingClientRect().width ?? 0;

  if ("onscrollend" in window) {
    carouselRef.addEventListener("scrollend", (e) => {
      updateScrollValue(e);
    });
  } else {
    carouselRef.onscroll = (event) => {
      clearTimeout((window as any).scrollEndTimer);
      (window as any).scrollEndTimer = setTimeout(
        () => updateScrollValue(event),
        100
      );
    };
  }
});

onBeforeRouteLeave((_1, _2, next) => {
  const carouselRef = carousel.value! as HTMLDivElement;
  if ("onscrollend" in window) {
    carouselRef.removeEventListener("scrollend", (e) => {
      updateScrollValue(e);
    });
  } else {
    carouselRef.onscroll = null;
  }
  next();
});

const handleClick = (direction: "previous" | "next") => {
  const carouselEl = carousel.value! as HTMLDivElement;
  const isPrev = direction === "previous";

  const scrollLeft =
    carouselEl.scrollLeft + (isPrev ? -cardSize.value : cardSize.value);

  carouselEl.scroll({ left: scrollLeft, top: 0 });
};

const updateScrollValue = (e: Event) => {
  const targetScrollPosition = e.target as HTMLDivElement;

  clientWidth.value = targetScrollPosition.clientWidth;
  scrollLeft.value = targetScrollPosition.scrollLeft;
  scrollWidth.value = targetScrollPosition.scrollWidth;
  calculatedIndex.value = Math.trunc(
    (scrollLeft.value - gap.value) / cardSize.value
  );
};

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

<template>
  <div class="carousel">
    <div class="carousel__scroller" ref="carousel">
      <slot name="slides"></slot>
    </div>
    <div v-if="isLarge" class="carousel__overlay"></div>
    <div class="carousel__navigation-container">
      <button
        :class="`${isMinScrollValue ? 'inactive' : ''}`"
        @click="handleClick('previous')"
        aria-label="arrow-left"
      >
        <i class="pi pi-angle-left"></i>
      </button>
      <button
        :class="`${isMaxScrollValue ? 'inactive' : ''}`"
        @click="handleClick('next')"
        aria-label="arrow-right"
      >
        <i class="pi pi-angle-right"></i>
      </button>
    </div>
    <div class="carousel__pagination-container" v-if="indicator">
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
  margin: auto;
  overflow: hidden;
  width: 100%;

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
    gap: 24px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

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
    height: calc(100% - 20px);
    pointer-events: none;

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
}
</style>

<style lang="scss">
@import "assets/styles/utils";

.card.card {
  scroll-snap-align: start;
}
</style>
