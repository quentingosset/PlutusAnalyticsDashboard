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

          <!-- Content -->
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-5">

              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Transactions</h1>
              </div>

              <!-- Add card button -->
              <router-link to="/perks">
                <button class="btn bg-indigo-500 rounded-none hover:bg-indigo-600 text-white">
                  <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span class="hidden xs:block ml-2">My Perks</span>
                </button>
              </router-link>
            </div>

            <div class="space-y-2">
              <!-- Table -->
              <TransactionsTable v-if="storeStatement.statements.length > 0" :statements=storeStatement.statements />
            </div>
          </div>
        </div>

      </main>

    </div>

  </div>
</template>

<script>
import {ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import {getUserProfile} from "../utils/PlutusCall";
import TransactionsTable from "../partials/transactions/StatementsTable.vue";
import Tooltip from "../components/Tooltip.vue";
import ModalBasic from "../components/ModalBasic.vue";
import {Subscriptions} from "../utils/type/Subscriptions";
import {statementStore} from "../stores/statement";
import {globalStore} from "../stores/global";

export default {
  name: 'Statements',
    computed: {
        SubscriptionType() {
            return Object.values(Subscriptions)
        }
    },
  components: {
    Sidebar,
    Header,
    TransactionsTable,
    Tooltip,
    ModalBasic
  },
  setup() {
    const sidebarOpen = ref(false)
    const storeStatement = statementStore()

    getUserProfile().then(value => {
      localStorage.setItem('local_currency',value?.local_currency??"USD");
      localStorage.setItem('first_name',value?.personal_details.first_name??"FIRST_NAME");
      localStorage.setItem('last_name',value?.personal_details.last_name??"LAST_NAME");
    });


    return {
      sidebarOpen,
      storeStatement
    }
  }
}
</script>
