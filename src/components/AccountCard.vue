<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white rounded-sm" :class="{'shadow-lg border border-slate-200': border}">
    <header v-show="header" className="px-5 py-4 border-b border-slate-100 flex items-center">
      <h2 className="font-semibold text-slate-800">Your account details</h2>
    </header>
    <div class="grow">
      <div className="px-5 py-3 text-center">
        <div className="text-sm italic mb-2">Hey {{ storeProfile.firstname }}, here is the value of your balance:</div>
        <div className="text-3xl font-bold text-slate-800">{{formatCurrency(storeBalance.userAvailableBalance)}}</div>
      </div>
    </div>
    <div class="grow">
      <div class="px-5 py-4 border-b border-slate-100">
        <header class="mb-3">
          <h3 class="text-lg text-slate-800 font-semibold underline">Your account details</h3>
        </header>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="inline-flex">
            <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            Account status
          </li>
          <li class="text-slate-600 capitalize">{{ storeAccount.staking.currentLevel?.name }} + {{ storeAccount.subscription.subscriptionPlan?.name }}</li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="inline-flex">
            <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 84c-11 0-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V312c0 11 9 20 20 20s20-9 20-20V298.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V104c0-11-9-20-20-20zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z"/></svg>
            Cashback
          </li>
          <li class="text-slate-600">{{ (storeAccount.maxCashback) }}%</li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="inline-flex">
            <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z"/></svg>
            Used perks
          </li>
          <li class="text-slate-600">{{ storeAccount.perks.unusedPerks }} / {{ storeAccount.totalPerks }} Perks</li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
            <li class="inline-flex">
              <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/></svg>
              In validation transaction
            </li>
            <li class="text-slate-600">{{formatCurrency(storeBalance.userHoldingBalance)}}</li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="inline-flex">
            <svg class="w-6 h-6 text-slate-400 shrink-0 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg>
            Monthly expense
          </li>
          <li class="text-slate-600">{{formatCurrency(0)}}</li>
        </ul>
      </div>
    </div>
    <div class="grow">
      <div class="px-5 py-4 border-b border-slate-100">
        <header class="mb-3">
          <h3 class="text-lg text-slate-800 font-semibold underline">Your account limits</h3>
        </header>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="inline-flex">
            Spending limit
          </li>
          <li class="text-slate-600">-€ / {{ formatCurrency(storeAccount.maxSpending?? 0) }}</li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="relative w-full h-2 bg-slate-300">
            <div class="absolute inset-0 bg-emerald-500" aria-hidden="true" style="width:47%"></div>
          </li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="inline-flex">
            Monthly cashback
          </li>
          <li class="text-slate-600">{{ formatCurrency(storeReward?.monthlyReward) }} / {{ formatCurrency(storeAccount.maxEarning) }}</li>
        </ul>
        <ul class="flex justify-between text-slate-800 py-1">
          <li class="relative w-full h-2 bg-slate-300">
            <div class="absolute inset-0 bg-emerald-500" aria-hidden="true" :style="cashbackMonthlyLimitPercent(storeReward?.monthlyReward,storeSubscription?.cashbackLimit)"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

// Import utilities
import {formatCurrency, tailwindConfig} from '../utils/Utils'
import {balanceStore} from "../stores/balance";
import {profileStore} from "../stores/profile";
import {accountStore} from "../stores/account";
const storeAccount = accountStore();
export default {
  name: 'AccountCard',
  components: {},
  props: {
    header: {type: Boolean, default: true},
    border: {type: Boolean, default: true},
  },
  methods: {
    formatCurrency,
    cashbackMonthlyLimitPercent(monthlyReward,cashbackLimit) {
      return `width:${((monthlyReward / cashbackLimit) * 100)}%;`;
    },
    spendingMonthlyLimitPercent(spendingMonthlyLimit,monthlySpendLimit) {
      return `width:${((spendingMonthlyLimit / monthlySpendLimit) * 100)}%;`;
    }
  },
  setup(props) {
    const loading = ref(true);
    const storeBalance = balanceStore();
    const storeProfile = profileStore();
    Promise.all([storeBalance.fetchBalance(),storeProfile.fetchProfile(),storeAccount.fetchData()]).then((values) => {
      loading.value = false
    });
    return {
      storeBalance,
      storeProfile,
      storeAccount
    }
  },
}
</script>