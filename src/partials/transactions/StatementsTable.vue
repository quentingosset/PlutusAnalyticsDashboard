<template>

  <!-- Filters -->
  <div class="sm:flex sm:justify-between sm:items-center mb-5">
    <div class="flex gap-3">
      <DropdownSettings :settings="settings"/>
      <DropdownFilter :sorter="sortedItems" @apply-sort="sortTransactions"/>
      <DropdownDownload :statements="statementsSorted" />
    </div>
    <Datepicker v-model:date-start="dateStart" v-model:date-end="dateEnd" @refreshFilter="refreshFilter"/>
  </div>

  <SpendingOverview :statements="statementsSorted"/>

  <div class="bg-white shadow-lg border border-slate-200 relative">
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
            <th class="px-2 first:pl-3 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Type</div>
            </th>
            <th class="px-2 first:pl-3 py-3 whitespace-nowrap" v-show="settings.column.mcc">
              <div class="font-semibold text-left">MCC</div>
            </th>
            <th class="px-2 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Description</div>
            </th>
            <th class="px-2 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Date</div>
            </th>
            <th class="px-2 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Txn Amount</div>
            </th>
            <th class="px-2 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Reward</div>
            </th>
            <th class="px-2 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Txn Status</div>
            </th>
            <th class="px-2 last:pr-3 py-3 whitespace-nowrap">
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
              :settings="settings"
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
import DropdownSettings from "../../components/DropdownSettings.vue";
import SpendingOverview from "../../components/SpendingOverview.vue";

dayjs.extend(isBetween);
export default {
  name: 'StatementsTable',
  components: {
    SpendingOverview,
    DropdownSettings,
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
    const dateStart = ref(dayjs().startOf('day').subtract(45, 'days'))
    const dateEnd = ref(dayjs().endOf('day'))
    const statements = computed(() => props.statements);
    const statementsSorted = ref([]);
    const settings = ref({
      "column": {
        "mcc": false
      }
    })
    statementsSorted.value = statements.value.filter((value) => dayjs(value.cashback.at(0)?value.cashback.at(0).createdAt : value.date).isBetween(dateStart.value,dateEnd.value,null, '[]'));
    isLoading.value = false;

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
    return {
      selectAll,
      selected,
      checkAll,
      isLoading,
      sortedItems,
      dateStart,
      dateEnd,
      defaultSortedItem,
      statementsSorted,
      settings,
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
      this.statementsSorted = tmp.filter((value) => dayjs(value.card_transactions? value.card_transactions.created_at : value.date).isBetween(this.dateStart,this.dateEnd,null, '[]'));
    }
  },
}
</script>
