<template>

  <!-- Filters -->
  <div class="sm:flex sm:justify-between sm:items-center mb-5">
    <ul class="flex flex-wrap -m-1">
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent hover:bg-indigo-600 shadow-sm bg-indigo-500 text-white duration-150 ease-in-out" @click="sortBy" data-sorted="all" data-sorted-active="true">All</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="rewarded" data-sorted-active="false">Rewarded</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="no_reward" data-sorted-active="false">No Reward</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="rejected" data-sorted-active="false">Rejected</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="pending" data-sorted-active="false">Pending</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="validation" data-sorted-active="false">In Validation</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="declined" data-sorted-active="false">Declined</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="bonus" data-sorted-active="false">Bonus</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="load" data-sorted-active="false">Load</button>
      </li>
      <li class="m-1">
        <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out" @click="sortBy" data-sorted="refunded" data-sorted-active="false">Refunded</button>
      </li>
    </ul>
    <Datepicker v-model:date-start="dateStart" v-model:date-end="dateEnd" @refreshFilter="refreshFilter"/>
  </div>

  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <header class="px-5 py-4">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-slate-600">All Transactions: <span class="text-slate-800 font-bold">{{ statementsSorted.length }}</span></h2>
        <div class="flex items-center justify-between">
          <h2 class="font-medium text-slate-600 mr-2">Total rewards: <span class="text-slate-800 font-bold">{{ totalReward }} PLU</span></h2>
          <h2 class="font-medium text-slate-600 mr-2">- Pending rewards: <span class="text-slate-800 font-bold">{{ pendingReward }} PLU</span></h2>
          <h2 class="font-medium text-slate-600 mr-2">- Total cashback: <span class="text-slate-800 font-bold">{{ formatCurrency(totalCashback) }}</span></h2>
          <h2 class="font-medium text-slate-600 mr-2">- PLU average: <span class="text-slate-800 font-bold">{{ formatCurrency(cashbackAverage) }}</span></h2>

        </div>
      </div>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full divide-y divide-slate-200 table-transactions">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
          <tr>
            <!--<th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
              <div class="flex items-center">
                <label class="inline-flex">
                  <span class="sr-only">Select all</span>
                  <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="checkAll" />
                </label>
              </div>
            </th>-->
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Type</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Description</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Date</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Txn Amount</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Reward</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Txn Status</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Action</div>
              <span class="sr-only">Menu</span>
            </th>
          </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm" v-if="isLoading"></tbody>
          <tbody class="text-sm" v-else>
          <StatementsTableItem
              v-for="statement in statementsSorted"
              :key="statement.id"
              :statement="statement"
              :sorted="sortedItems"
              :loading="isLoading"
              v-model:selected="selected"
              :value="statement.id"
          />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'
import StatementsTableItem from './StatementsTableItem.vue'
import Datepicker from "../../components/Datepicker.vue";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
export default {
  name: 'StatementsTable',
  components: {
    StatementsTableItem,
    Datepicker
  },
  props: ['selectedItems','statements'],
  emits: ['change-selection'],
  setup(props, { emit }) {
    const isLoading = ref(true);
    const selectAll = ref(false);
    const selected = ref([]);
    const sortedItems = ref(new Map());
    const defaultSortedItem = ref(null);
    const dateStart = ref(dayjs().subtract(1, 'month'))
    const dateEnd = ref(dayjs())
    const pendingReward = ref(0);
    const totalReward = ref(0);
    const totalCashback = ref(0);
    const cashbackAverage = ref(0);
    const statements = computed(() => props.statements);
    const statementsSorted = ref([]);
    statementsSorted.value = statements.value.filter((value) => dayjs(value.date).isBetween(dateStart.value,dateEnd.value,null, '[]'));
    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        selected.value = statements.value.map(order => order.id)
      }
    };

    watch(selected, () => {
      selectAll.value = statements.value.length === selected.value.length
      console.log("event change-selection");
      emit('change-selection', selected.value)
    });

    watch(statementsSorted, (value, oldValue, onCleanup) => {
      console.log("update");
      let tmp = statementsSorted.value;
      totalReward.value = tmp.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + parseFloat(cashback.amount),0),0).toFixed(2);
      totalCashback.value = tmp.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + ((((parseFloat(cashback.fiat_amount_rewarded??0) / 100) * (parseFloat(cashback.rebate_rate)/100))/parseFloat(cashback.amount)) * parseFloat(cashback.amount)),0),0).toFixed(2);
      cashbackAverage.value = totalCashback.value/totalReward.value;
      pendingReward.value = tmp.filter(statement => statement.status !== undefined && statement.status.value === 'pending').reduce((sum, statement) => sum +  parseFloat(statement.reward.value),0).toFixed(2);
    }, {immediate: true})


    isLoading.value = false;
    return {
      selectAll,
      selected,
      checkAll,
      isLoading,
      totalReward,
      totalCashback,
      pendingReward,
      cashbackAverage,
      sortedItems,
      dateStart,
      dateEnd,
      defaultSortedItem,
      statementsSorted
    }
  },
  mounted() {
    this.defaultSortedItem = document.querySelector('[data-sorted="all"]');
    this.sortedItems.set(this.defaultSortedItem.dataset.sorted, this.defaultSortedItem);
  },
  methods:{
    sortBy(event){
      let DOMelement = event.target;
      // CLICK ON SELECTED FILTER
      if(DOMelement.dataset.sortedActive === "true"){
        if(this.sortedItems.size === 1 && this.sortedItems.has("all")){
          return;
        }else{
          this.resetClassFilter(DOMelement);
          if(this.sortedItems.size === 0){
            this.addClassFilter(this.defaultSortedItem);
          }
        }
      }else{ // CLICK ON NO SELECTED FILTER
        if(DOMelement.dataset.sorted === "all"){
          // RESET ALL CLASS FILTTER
          this.sortedItems.forEach((key, value) => {
            this.resetClassFilter(key);
          });
          // CLEAN ALL SORTEDITEMS
          this.sortedItems.clear();
        }
        if(this.sortedItems.size === 1 && this.sortedItems.has("all")){
          this.resetClassFilter(this.sortedItems.get("all"));
        }
        this.addClassFilter(DOMelement);
      }
      // NEED TO UPDATE THE PROPS FOR CHILDREN ELEMENTS
      this.sortedItems = new Map(this.sortedItems);
    },
    resetClassFilter(DOMelement){
      DOMelement.dataset.sortedActive = false;
      DOMelement.classList.replace("bg-indigo-500","bg-white");
      DOMelement.classList.replace("text-white","text-slate-500");
      DOMelement.classList.replace("border-transparent","border-slate-200");
      DOMelement.classList.replace("hover:bg-indigo-600","hover:border-slate-300");
      this.sortedItems.delete(DOMelement.dataset.sorted);
    },
    addClassFilter(DOMelement){
      DOMelement.dataset.sortedActive = true;
      DOMelement.classList.replace("bg-white","bg-indigo-500");
      DOMelement.classList.replace("text-slate-500","text-white");
      DOMelement.classList.replace("border-slate-200","border-transparent");
      DOMelement.classList.replace("hover:border-slate-300","hover:bg-indigo-600");
      this.sortedItems.set(DOMelement.dataset.sorted, DOMelement);
    },
    formatCurrency(value) {
      if (isNaN(value)) {
        return '';
      }

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: localStorage.getItem('local_currency'),
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    },
    refreshFilter(value){
      if(value.length === 1){
        this.dateStart = dayjs(value[0]).startOf('D');
        this.dateEnd = dayjs(value[0]).endOf('D');
      }else{
        this.dateStart = dayjs(value[0]).startOf('D');
        this.dateEnd = dayjs(value[1]).endOf('D');
      }
      let tmp = this.statements;
      this.statementsSorted = tmp.filter((value) => dayjs(value.date).isBetween(this.dateStart,this.dateEnd,null, '[]'));
    }
  },
}
</script>
