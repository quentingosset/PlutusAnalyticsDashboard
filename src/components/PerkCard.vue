<template>
  <div :class="!item.available? 'opacity-50' : ''" class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg border border-slate-200">
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="grow p-5">
        <!-- Menu button -->
        <!--<div class="relative">
          <div align="right" class="absolute top-0 right-0 inline-flex">
            <button
                ref="trigger"
                class="bg-white text-slate-400 hover:text-slate-500 rounded-full"
                aria-haspopup="true"
                @click.stop="modalOpen = !modalOpen"
            >
              <span class="sr-only">Menu</span>
              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="2" />
                <circle cx="10" cy="16" r="2" />
                <circle cx="22" cy="16" r="2" />
              </svg>
            </button>
          </div>
        </div>-->
        <!-- Image + name -->
        <header>
          <div class="flex justify-center mb-2">
            <div class="relative inline-flex items-start">
              <img :src="item.image_url" width="64" height="64" :alt="item.label" />
            </div>
          </div>
          <div class="text-center">
            <div class="inline-flex text-slate-800 hover:text-slate-900">
              <h2 class="text-xl leading-snug justify-center font-semibold">{{item.label}}</h2>
            </div>
          </div>
          <div class="flex justify-center items-center text-sm"><span>{{item.description}}</span></div>
        </header>
        <!-- Bio -->
        <div class="text-center mt-2" v-show="item.percent_spent < 100 && item.percent_spent !== 0">
          <div class="text-xs text-amber-500">PARTIALY USED</div>
        </div>
        <div class="text-center mt-2" v-show="item.percent_spent === 0">
          <div class="text-xs text-rose-500">NOT YET USED</div>
        </div>
        <div class="text-center mt-2" v-show="item.percent_spent === 100">
          <div class="text-xs text-emerald-500">FULLY USED</div>
        </div>
      </div>
      <!-- Card footer -->
      <div class="border-t border-slate-200">
        <div v-show="item.available" class="flex divide-x divide-slate-200r">
          <div class="block flex-1 text-center text-sm text-emerald-500 font-medium px-3 py-4">
            <div class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-current shrink-0 mr-2" viewBox="0 0 448 512">
                <g fill="currentColor">
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"></path>
                </g>
              </svg>
              <span>Active</span>
            </div>
          </div>
          <div class="block flex-1 text-center text-sm text-slate-600 hover:text-slate-800 font-medium px-3 py-4 group">
            <div class="flex items-center justify-center">
              <span :class="item.percent_spent === 100? 'text-slate-600' : item.percent_spent === 0? 'text-rose-500' : 'text-amber-500'">{{ formatCurrency(Math.min(item.spent??0,item.max_mothly_fiat_reward)) }} / {{ formatCurrency(item.max_mothly_fiat_reward) }}</span>
            </div>
          </div>
        </div>
        <div v-show="!item.available" class="flex divide-x divide-slate-200r">
          <div class="block flex-1 text-center text-sm text-rose-500 font-medium px-3 py-4">
            <div class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-current shrink-0 mr-2" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"></path>
              </svg>
              <span>Not Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {formatCurrency} from "../utils/Utils";
import ModalBasic from "./ModalBasic.vue";
import {ref} from "vue";

export default {
  name: 'PerkCard',
  methods: {formatCurrency},
  props: ['item'],
  components: {
    ModalBasic
  },
  setup() {
    const modalOpen = ref(false);

    return {
      modalOpen
    }
  }

}
</script>