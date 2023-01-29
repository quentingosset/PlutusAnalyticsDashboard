<template>
  <div
      class="relative"
      @mouseenter="tooltipOpen = true"
      @mouseleave="tooltipOpen = false"
      @focusin="tooltipOpen = true"
      @focusout="tooltipOpen = false"
  >
    <button
        class="block"
        aria-haspopup="true"
        aria-expanded="tooltipOpen"
        @click.prevent
    >
      <slot name="content"></slot>
    </button>
    <div v-show="display?? true" class="z-10 absolute" :class="positionOuterClasses(position)">
      <transition
          enter-active-class="transition ease-out duration-200 transform"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-out duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div
            v-show="tooltipOpen" class="rounded overflow-hidden"
            :class="[
            bg === 'dark' ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-lg',
            sizeClasses(size),
            positionInnerClasses(position)
          ]"
        >
          <slot name="tooltip"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'Tooltip',
  props: {
    bg: {
      type: String
    },
    size: {
      type: String
    },
    position: {
      type: String
    },
    fill: {
      type: String
    },
    display: {
      type: Boolean
    }
  },
  //props: ['bg', 'size', 'position', 'fill', 'display'],
  setup() {

    const tooltipOpen = ref(false)

    const positionOuterClasses = (position) => {
      switch (position) {
        case 'right':
          return 'left-full top-1/2 -translate-y-1/2';
        case 'left':
          return 'right-full top-1/2 -translate-y-1/2';
        case 'bottom':
          return 'top-full left-1/2 -translate-x-1/2';
        default:
          return 'bottom-full left-1/2 -translate-x-1/2';
      }
    }

    const sizeClasses = (size) => {
      switch (size) {
        case 'lg':
          return 'min-w-72  p-3';
        case 'md':
          return 'min-w-56 p-3';
        case 'sm':
          return 'min-w-44 p-2';
        default:
          return 'p-2';
      }
    }

    const positionInnerClasses = (position) => {
      switch (position) {
        case 'right':
          return 'ml-2';
        case 'left':
          return 'mr-2';
        case 'bottom':
          return 'mt-2';
        default:
          return 'mb-2';
      }
    }

    return {
      tooltipOpen,
      positionOuterClasses,
      sizeClasses,
      positionInnerClasses,
    }
  }
}
</script>
