<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"
              :cardSidebarOpen="cardSidebarOpen" @toggle-cardsidebar="cardSidebarOpen = !cardSidebarOpen" />

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
              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">My Perks</span>
              </button>

            </div>

            <div class="space-y-2">
              <!-- Table -->
              <TransactionsTable v-if="statements.length > 0" :statements=statements />
            </div>
          </div>

          <CardSidebar :cardSidebarOpen="cardSidebarOpen"/>

        </div>

      </main>

    </div>

  </div>
</template>

<script>
import {ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import {getAllStatements, getUserProfile} from "../utils/PlutusCall";
import TransactionsTable from "../partials/transactions/StatementsTable.vue";
import Tooltip from "../components/Tooltip.vue";
import ModalBasic from "../components/ModalBasic.vue";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import {StatementsType} from "../utils/StatementsType";
import {SubscriptionType} from "../utils/SubscriptionType";
import CardSidebar from "../components/CardSidebar.vue";

export default {
  name: 'Transactions',
    computed: {
        SubscriptionType() {
            return Object.values(SubscriptionType)
        }
    },
  components: {
    CardSidebar,
    Sidebar,
    Header,
    TransactionsTable,
    Tooltip,
      ModalBasic
  },
  setup() {
    const isLoading = ref(true);
    const sidebarOpen = ref(false)
    const spendingMonthlyLimit = ref(0);
    const statements = ref([]);
    const cardSidebarOpen = ref(true)
    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    };

    getUserProfile().then(value => {
      localStorage.setItem('local_currency',value?.local_currency??"USD");
      localStorage.setItem('first_name',value?.personal_details.first_name??"FIRST_NAME");
      localStorage.setItem('last_name',value?.personal_details.last_name??"LAST_NAME");
    });

      getAllStatements().then(value => {
      dayjs.extend(isBetween);

      statements.value = value;

      let spendingMonthlyLimits = value.filter((value) => {return (dayjs(value.date).isBetween(dayjs().subtract(1, 'month'),dayjs(),null, '[]')
          && !StatementsType.TOP_UP_CARD.is(value.type)
          && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.is(value.type)
          && !StatementsType.TOP_UP_ACCOUNT.is(value.type)
          && !StatementsType.WITHDRAW_FEE.is(value.type)
          && !StatementsType.DEX_BUY.is(value.type)
      )});
      spendingMonthlyLimit.value = spendingMonthlyLimits.reduce((sum, transaction) => {
        return sum + (transaction.amount / 100);
      },0);
        isLoading.value = false;
    });


    return {
      isLoading,
      sidebarOpen,
      updateSelectedItems,
      spendingMonthlyLimit,
      statements,
      cardSidebarOpen
    }
  }
}
</script>
