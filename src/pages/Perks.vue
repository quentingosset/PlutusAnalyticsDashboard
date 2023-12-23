<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" />

      <main>
        <div class="relative flex">
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">
              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Perks</h1>
              </div>
            </div>
            <!-- More actions -->
            <div class="sm:flex sm:justify-between sm:items-center mb-5">
              <!-- Left side -->
              <div class="mb-4 sm:mb-0">
                <ul class="flex flex-wrap -m-1">
                  <li class="m-1">
                    <button @click.stop="activetab='currentMonth'" :class="[ activetab === 'currentMonth' ? 'bg-indigo-500 rounded-none hover:bg-indigo-600 text-white' : 'bg-white text-slate-500 hover:border-slate-300' ]" class="inline-flex items-center justify-center text-sm font-medium leading-5 px-3 py-1 border shadow-sm duration-150 ease-in-out">Current month ({{storePerk.perks?.length}}/{{storePerk.perksGranted}})</button>
                  </li>
                  <li class="m-1">
                    <button  @click.stop="activetab='nextMonth'" :class="[ activetab === 'nextMonth' ? 'bg-indigo-500 rounded-none hover:bg-indigo-600 text-white' : 'bg-white text-slate-500 hover:border-slate-300' ]" class="inline-flex items-center justify-center text-sm font-medium leading-5 px-3 py-1 border shadow-sm duration-150 ease-in-out">Next month ({{storePerk.perksNextMonth?.length}}/{{storePerk.perksGranted}})</button>
                  </li>
                </ul>
              </div>
              <div class="mb-4 sm:mb-0">
                <div v-if="activetab === 'currentMonth' && (storePerk.perksGranted - storePerk.perks?.length)" class="inline-flex text-center px-2.5 py-0.5 bg-amber-500 text-white mr-3" >
                  <div class="flex items-center justify-between">
                    <div class="uppercase">You have
                      <span v-text='(storePerk.perksGranted - storePerk.perks?.length)'></span>
                      more
                      <span v-show='(storePerk.perksGranted - storePerk.perks?.length) > 1'> perks</span>
                      <span v-show='(storePerk.perksGranted - storePerk.perks?.length) <= 1'> perk</span> available
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 'nextMonth' && (storePerk.perksGranted - storePerk.perksNextMonth?.length)" class="inline-flex text-center px-2.5 py-0.5 bg-amber-500 text-white mr-3" >
                  <div class="flex items-center justify-between">
                    <div class="uppercase">You have
                      <span v-text='(storePerk.perksGranted - storePerk.perksNextMonth?.length)'></span>
                      more
                      <span v-show='(storePerk.perksGranted - storePerk.perksNextMonth?.length) > 1'> perks</span>
                      <span v-show='(storePerk.perksGranted - storePerk.perksNextMonth?.length) <= 1'> perk</span> available
                    </div>
                  </div>
                </div>
                <div v-if="activetab !== 'nextMonth'" class="inline-flex text-center px-2.5 py-0.5 bg-slate-100 text-slate-600">
                  <div class="flex items-center justify-between" >
                    <div class="uppercase">Time left :
                      <span v-text='timeLeft()'></span>
                      <span v-show='timeLeft() > 1'> days</span>
                      <span v-show='timeLeft() <= 1'> day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="storePerk.loading" class="grid grid-cols-12 gap-6">
              <PerkCardLoading v-for="n in 4"/>
            </div>
            <!-- Cards -->
            <div class="content" v-show="!storePerk.loading">
              <div v-if="activetab === 'currentMonth'">
                <div class="grid grid-cols-12 gap-6">
                  <PerkCard
                      v-show="!storePerk.loading"
                      v-for="perk in storePerk.currentMonthPerks"
                      :key="perk.id"
                      :item="perk"
                  />
                </div>
              </div>
              <div v-if="activetab === 'nextMonth'">
                <div class="grid grid-cols-12 gap-6">
                  <PerkCard
                      v-show="!storePerk.loading"
                      v-for="perk in storePerk.nextMonthPerks"
                      :key="perk.id"
                      :item="perk"
                      :nextMonth="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>

  </div>
</template>

<script>
import {ref} from 'vue'

import Sidebar from "../partials/Sidebar.vue";
import Header from '../partials/Header.vue'
import PerkCard from "../components/PerkCard.vue";
import {globalStore} from "../stores/global";
import {perkStore} from "../stores/perk";
import PerkCardLoading from "../components/loading/PerkCard.vue";
import dayjs from "dayjs";


export default {
  name: 'Perks',
  components: {
    PerkCardLoading,
    PerkCard,
    Sidebar,
    Header,
  },
  setup() {
    const sidebarOpen = ref(false)
    const activetab = ref('currentMonth')

    const storeGlobal = globalStore();
    const storePerk = perkStore();

    storePerk.fetchData();

    return {
      sidebarOpen,
      activetab,
      storeGlobal,
      storePerk
    }
  },
  methods: {
    timeLeft() {
      return dayjs().endOf('month').diff(dayjs(), 'day')
    }
  }
}
</script>