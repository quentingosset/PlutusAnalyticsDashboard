<template>

  <!-- Filters -->
  <div class="sm:flex sm:justify-between sm:items-center mb-5">
    <div class="flex gap-3">
      <DropdownFilter v-model:sorter="sortedItems" @apply-sort="sortTransactions"/>
      <DropdownDownload :statements="statementsSorted" />
    </div>
    <Datepicker v-model:date-start="dateStart" v-model:date-end="dateEnd" @refreshFilter="refreshFilter"/>
  </div>

  <div class="bg-white shadow-lg border border-slate-200 relative">
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
          <tbody class="text-sm" v-if="isLoading">
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse rounded-full bg-slate-200 h-10 w-10"></div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse h-2 bg-slate-200 rounded"></div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse h-2 bg-slate-200 rounded"></div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse h-2 bg-slate-200 rounded"></div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse h-2 bg-slate-200 rounded"></div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse h-2 bg-slate-200 rounded"></div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="animate-pulse h-2 bg-slate-200 rounded"></div>
                </td>
            </tr>
          </tbody>
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
import DropdownFilter from "../../components/DropdownFilter.vue";
import DropdownDownload from "../../components/DropdownDownload.vue";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import {formatCurrency} from "../../utils/Utils";

dayjs.extend(isBetween);
export default {
  name: 'StatementsTable',
  components: {
    DropdownFilter,
    DropdownDownload,
    StatementsTableItem,
    Datepicker
  },
  props: ['selectedItems','statements'],
  emits: ['change-selection'],
  setup(props, { emit }) {
    const isLoading = ref(true);
    const selectAll = ref(false);
    const selected = ref([]);
    const sortedItems = ref(new Set());
    const defaultSortedItem = ref(null);
    const dateStart = ref(dayjs().subtract(1, 'month').subtract(15, 'days').startOf('day'))
    const dateEnd = ref(dayjs().endOf('day'))
    const pendingReward = ref(0);
    const totalReward = ref(0);
    const totalCashback = ref(0);
    const cashbackAverage = ref(0);
    const statements = computed(() => props.statements);
    const statementsSorted = ref([]);
    console.log(dateStart,dateEnd);
    statementsSorted.value = statements.value.filter((value) => dayjs(value.date).isBetween(dateStart.value,dateEnd.value,null, '[]'));
    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        selected.value = statements.value.map(order => order.id)
      }
    };

    watch(selected, () => {
      selectAll.value = statements.value.length === selected.value.length
      emit('change-selection', selected.value)
    });

    watch(statementsSorted, (value, oldValue, onCleanup) => {
      let tmp = statementsSorted.value;
      totalReward.value = tmp.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + parseFloat(cashback.amount),0),0).toFixed(2);
      totalCashback.value = tmp.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + ((((parseFloat(cashback.fiat_amount_rewarded??0) / 100) * (parseFloat(cashback.rebate_rate)/100))/parseFloat(cashback.amount)) * parseFloat(cashback.amount)),0),0).toFixed(2);
      cashbackAverage.value = totalCashback.value/totalReward.value;
      pendingReward.value = tmp.filter(statement => statement.status !== undefined && statement.status.value === 'pending').reduce((sum, statement) => sum +  parseFloat(statement.reward.value),0).toFixed(2);
      isLoading.value = false;
    }, {immediate: true});

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
    //this.defaultSortedItem = document.querySelector('[data-sorted="all"]');
    //this.sortedItems.set(this.defaultSortedItem.dataset.sorted, this.defaultSortedItem);
  },
  methods:{
    formatCurrency,
    sortTransactions(value){
      this.sortedItems = value;
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
