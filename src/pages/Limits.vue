<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

      <main>
        <div class="relative flex">
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">
              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Limits</h1>
              </div>
            </div>
            <div class="content">
              <div class="grid grid-cols-12 gap-6">
                <LimitChart
                    v-show="true"
                    v-for="limit in storeLimit.limitType"
                    :key="limit"
                    :series="[storeStatement.spendLimit(limit.frequency),(limit.limit - storeStatement.spendLimit(limit.frequency))]"
                    :title="limit.name"
                    :labels="['Spend','Unspend']"
                />
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
import PerkCardLoading from "../components/loading/PerkCard.vue";
import {limitStore} from "../stores/limit";
import LimitChart from "../charts/LimitChart.vue";
import {statementStore} from "../stores/statement";


export default {
  name: 'Limits',
  computed: {
  },
  components: {
    LimitChart,
    PerkCardLoading,
    PerkCard,
    Sidebar,
    Header,
  },
  setup() {
    const sidebarOpen = ref(false)

    const storeGlobal = globalStore();
    const storeLimit = limitStore();
    const storeStatement = statementStore();

    //storeLimit.fetchSubscription();
    return {
      sidebarOpen,
      storeGlobal,
      storeLimit,
      storeStatement
    }
  },
  methods: {
  }
}
</script>