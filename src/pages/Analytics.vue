<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

      <main>

        <!-- Content -->
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Transactions</h1>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-6">
            <!-- Line chart (Portfolio Returns) -->
            <SpendingOverview v-if="storeStatement.statements.length > 0" :statements=storeStatement.statements />
            <!-- Credit Card -->
            <AccountOverview />
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
import SpendingOverview from "../components/SpendingOverview.vue";
import AccountOverview from "../components/AccountOverview.vue";
import AccountCard from "../components/AccountCard.vue";

export default {
  name: 'Statements',
  computed: {
    SubscriptionType() {
      return Object.values(Subscriptions)
    }
  },
  components: {
    AccountCard,
    AccountOverview,
    SpendingOverview,
    Sidebar,
    Header,
    TransactionsTable,
    Tooltip,
    ModalBasic
  },
  setup() {
    const sidebarOpen = ref(false)
    const storeGlobal = globalStore()
    const storeStatement = statementStore()
    storeStatement.fetchStatements();

    getUserProfile().then(value => {
      localStorage.setItem('local_currency', value?.local_currency ?? "USD");
      localStorage.setItem('first_name', value?.personal_details.first_name ?? "FIRST_NAME");
      localStorage.setItem('last_name', value?.personal_details.last_name ?? "LAST_NAME");
    });


    return {
      sidebarOpen,
      storeStatement,
      storeGlobal
    }
  }
}
</script>
