<template>
  <div ref="dropdownSettings" class="relative inline-flex">
    <button
      ref="trigger"
      class="btn rounded-none bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Filter</span><wbr />
      <svg class="w-4 h-4 fill-current" viewBox="0 0 512 512">
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
      </svg>

    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-72 bg-white border border-slate-200 pt-1.5 shadow-lg overflow-hidden mt-1">
        <div ref="dropdown">
          <div class="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Settings</div>
          <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
            <div class="flex-1">
              <ul class="mb-4">
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox" :checked="settings.column.mcc" data-type="mcc" @change="check($event)"/>
                    <span class="text-sm font-medium ml-2">Show MCC column</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'

export default {
  name: 'DropdownSettings',
  props: ['settings'],
  emits: ['apply-sort'],
  setup(props,context) {

    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);
    const dropdownSettings = ref(null);
    const settings = computed( () => props.settings);

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target)) return;
      if(trigger.value.contains(target)){
        dropdownSettings.value.querySelectorAll('input[type=checkbox]').forEach(value => {
          /*if(defaultSorter.value.has(value.dataset.sort)){
            value.checked = true
          }*/
        })
        return;
      }
      dropdownOpen.value = false;
    }

    const check = (e) => {
      if(e.target.dataset.type == "mcc"){
        settings.value.column.mcc = e.target.checked;
      }
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false;
    }

    onMounted(() => {
        document.addEventListener('click', clickHandler)
        document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
        document.removeEventListener('click', clickHandler)
        document.removeEventListener('keydown', keyHandler)
    })

    return {
      check,
      dropdownSettings,
      dropdownOpen,
      trigger,
      dropdown,
      settings,
    }
  }
}
</script>
