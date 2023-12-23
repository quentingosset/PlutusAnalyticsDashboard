<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white rounded-sm" :class="{'shadow-lg border border-slate-200': border}">
    <header v-show="header" class="px-5 py-4 border-b border-slate-100">
      <ul class="flex items-center justify-between">
        <li><h2 class="font-semibold text-slate-800">Your current subscription</h2></li>
        <li class="text-slate-600"><h2 class="font-medium text-slate-600 mr-2 uppercase">{{ storeAccount.subscription.subscriptionPlan?.name }}</h2></li>
      </ul>
    </header>
    <div class="grow">
      <div class="flex flex-col h-full">
        <!-- Card content -->
        <div class="px-5 py-4 border-b border-slate-100">
          <header class="mb-3">
            <h3 class="text-lg text-slate-800 font-semibold underline">Your subscription advantages</h3>
          </header>
          <ul class="flex justify-between text-slate-800 py-1">
            <li class="inline-flex">
              <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 84c-11 0-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V312c0 11 9 20 20 20s20-9 20-20V298.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V104c0-11-9-20-20-20zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z"/></svg>
              Cashback
            </li>
            <li class="text-slate-600">{{ storeAccount.subscription.subscriptionPlan?.percent }}%</li>
          </ul>
          <ul class="flex justify-between text-slate-800 py-1">
            <li class="inline-flex">
              <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z"/></svg>
              Perks
            </li>
            <li class="text-slate-600">{{ storeAccount.subscription.subscriptionPlan?.perk }} Perks</li>
          </ul>
          <ul class="flex justify-between text-slate-800 py-1">
            <li class="inline-flex">
              <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M470.7 9.4c3 3.1 5.3 6.6 6.9 10.3s2.4 7.8 2.4 12.2l0 .1v0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3L310.6 214.6c-11.8 11.8-30.8 12.6-43.5 1.7L176 138.1 84.8 216.3c-13.4 11.5-33.6 9.9-45.1-3.5s-9.9-33.6 3.5-45.1l112-96c12-10.3 29.7-10.3 41.7 0l89.5 76.7L370.7 64H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h96 0c8.8 0 16.8 3.6 22.6 9.3l.1 .1zM0 304c0-26.5 21.5-48 48-48H464c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V304zM48 416v48H96c0-26.5-21.5-48-48-48zM96 304H48v48c26.5 0 48-21.5 48-48zM464 416c-26.5 0-48 21.5-48 48h48V416zM416 304c0 26.5 21.5 48 48 48V304H416zm-96 80a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
              Spending limit
            </li>
            <li class="text-slate-600">{{ formatCurrency(storeAccount.subscription.subscriptionPlan?.maxExpense) }}</li>
          </ul>
          <ul class="flex justify-between text-slate-800 py-1">
            <li class="inline-flex">
              <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"/></svg>
              Dex Fee
            </li>
            <li class="text-slate-600"><!--{{ storeAccount.subscription.subscriptionPlan.dexPercent }} --> - %</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="grow">
      <div class="flex flex-col h-full">
        <!-- Card content -->
        <div class="px-5 py-4 border-b border-slate-100">
          <ul class="flex justify-between text-slate-800 py-1">
            <li><h2 class="font-semibold text-slate-800">Subscription renewal</h2></li>
            <li class="text-slate-600"><h2 class="font-medium text-slate-600 mr-2 uppercase">{{ formatDate(storeAccount.subscription.subscriptionEnd,TRANSACTION_FORMAT_DATE) }}</h2></li>
          </ul>
          <ul class="flex justify-between text-slate-800 py-1 ">
            <li><h2 class="font-semibold text-slate-800">Next subscription plan</h2></li>
            <li class="text-slate-600"><h2 class="font-medium text-slate-600 mr-2 uppercase">{{ storeAccount.subscription.subscriptionDesired?.name?? storeAccount.subscription.subscriptionPlan?.name }}</h2></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatCurrency, formatDate, formatNumber, TRANSACTION_FORMAT_DATE} from "../utils/Utils";
import {accountStore} from "../stores/account";

export default {
  name: 'PlanCard',
  methods: {formatDate, formatCurrency, formatNumber},
  props: {
    header: {type: Boolean, default: true},
    border: {type: Boolean, default: true},
  },
  setup(props) {
    const storeAccount = accountStore();
    return {
      storeAccount,
      TRANSACTION_FORMAT_DATE
    }
  }
}
</script>