<template>
  <div class="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
    <header class="px-5 py-4 border-b border-slate-100 flex items-center">
      <h2 class="text-xl leading-snug justify-center font-semibold animate-pulse h-6 w-52 bg-slate-200 rounded" v-if="isLoading()"></h2>
      <h2 class="font-semibold text-slate-800" v-else>Transactions overview</h2>
    </header>
    <div className="px-5 py-3 border-b border-slate-100">
      <div className="flex flex-wrap justify-center items-end">
        <div class="px-5 py-1">
          <div class="flex flex-wrap">
            <!-- Total Transaction -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded" v-if="isLoading()"></div>
                  <div class="text-xl font-bold text-slate-800 mr-2" v-else><span v-text="formatNumber(statements.length)"></span></div>
                  <!--<div class="text-sm font-medium text-emerald-500">+49%</div>-->
                </div>
                <div v-if="isLoading()"></div>
                <div class="text-sm text-slate-500" v-else>Transactions</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Total Spend -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded" v-if="isLoading()"></div>
                  <div class="text-xl font-bold text-slate-800 mr-2" v-else><span v-text="formatCurrency(totalSpend)"></span></div>
                  <!--<div class="text-sm font-medium text-emerald-500">+49%</div>-->
                </div>
                <div v-if="isLoading()"></div>
                <div class="text-sm text-slate-500" v-else>Total spends</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Total Rewards -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded" v-if="isLoading()"></div>
                  <div class="text-xl font-bold text-slate-800 mr-2" v-else><span v-text="formatNumber(totalReward)"></span> PLU</div>
                  <!--<div class="text-sm font-medium text-emerald-500">+7%</div>-->
                </div>
                <div v-if="isLoading()"></div>
                <div class="text-sm text-slate-500" v-else>Total Rewards</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Pending Reward -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded" v-if="isLoading()"></div>
                  <div class="text-xl font-bold text-slate-800 mr-2" v-else><span v-text="formatNumber(pendingReward)"></span> PLU</div>
                  <!--<div class="text-sm font-medium text-amber-500">-7%</div>-->
                </div>
                <div v-if="isLoading()"></div>
                <div class="text-sm text-slate-500" v-else>Pending rewards</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Visit Duration-->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded" v-if="isLoading()"></div>
                  <div class="text-xl font-bold text-slate-800 mr-2" v-else><span v-text="formatCurrency(totalCashback)"></span></div>
                  <!--<div class="text-sm font-medium text-amber-500">+7%</div>-->
                </div>
                <div v-if="isLoading()"></div>
                <div class="text-sm text-slate-500" v-else>Total cashback</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- PLU AVERAGE -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded" v-if="isLoading()"></div>
                  <div class="text-xl font-bold text-slate-800 mr-2" v-else><span v-text="formatCurrency(cashbackAverage)"></span></div>
                  <!--<div class="text-sm font-medium text-amber-500">+7%</div>-->
                </div>
                <div v-if="isLoading()"></div>
                <div class="text-sm text-slate-500" v-else>PLU average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
    <div class="w-full h-full flex justify-center items-center" v-if="isLoading()">
      <div class="relative items-center block max-w-sm p-6 rounded-lg">
        <div role="status" class="flex flex-col items-center">
          <svg aria-hidden="true" class="w-8 h-8 text-slate-200 animate-spin fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
          <span class="mt-5">Loading data...</span>
        </div>
      </div>
    </div>
    <SpendingChart :data="chartData" width="800" height="300" v-else/>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from 'vue'
import SpendingChart from '../charts/SpendingChart.vue'

// Import utilities
import {
  tailwindConfig,
  hexToRGB,
  formatCurrency,
  formatNumber,
  formatDate,
  CHART_FORMAT_DATE,
} from '../utils/Utils'
import {StatementsType} from "../utils/StatementsType";
import moment from "moment/moment";

export default {
  name: 'SpendingOverview',
  components: {
    SpendingChart,
  },
  props: ['statements','loading'],
  methods: {
    isLoading() {
      return this.loadingExternalData || this.loading;
    }
  },
  setup(props) {
    const loading = ref(false);
    const loadingExternalData = computed(() => props.loading);
    const statements = computed(() => props.statements);
    const chartData = ref(null);
    const data = ref({});
    const pendingReward = ref(0);
    const totalSpend = ref(0);
    const totalReward = ref(0);
    const totalCashback = ref(0);
    const cashbackAverage = ref(0);
    const calculStatements = async (statements) => {
      loading.value = true;
      if(statements.value.length) {
        let onlySpendStatements = statements.value.filter(statement => !StatementsType.TOP_UP_ACCOUNT.equals(statement.type)
            && !StatementsType.TOP_UP_CARD.equals(statement.type)
            && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(statement.type)
            && !StatementsType.REFUNDED.equals(statement.type))

        var spendAggregate = onlySpendStatements.reverse().reduce((a, b) => {
          const key = formatDate(moment(b.card_transactions?.created_at ?? b.date).startOf("day").format(), CHART_FORMAT_DATE)
          a[key] = a[key] ? a[key] + (Math.abs(b.amount) / 100) : (Math.abs(b.amount) / 100)
          return a
        }, {})

        let sum;
        let dateList = Object.keys(spendAggregate);
        let valueList = Object.values(spendAggregate);
        let valueAgg = Object.values(spendAggregate).map(amount => sum = (sum || 0) + amount);
        data.value = {
          'date': dateList,
          'value': valueList,
          'agg': valueAgg
        };

        totalSpend.value = valueAgg.at(valueAgg.length - 1).toFixed(2);
        totalReward.value = onlySpendStatements.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + parseFloat(cashback.amount), 0), 0).toFixed(2);
        totalCashback.value = onlySpendStatements.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + ((((parseFloat(cashback.fiat_amount_rewarded ?? 0) / 100) * (parseFloat(cashback.rebate_rate) / 100)) / parseFloat(cashback.amount)) * parseFloat(cashback.amount)), 0), 0).toFixed(2);
        cashbackAverage.value = totalCashback.value / totalReward.value;
        pendingReward.value = onlySpendStatements.filter(statement => statement.status !== undefined && statement.status.value === 'pending').reduce((sum, statement) => sum + parseFloat(statement.reward.value), 0).toFixed(2);

        chartData.value = generateChart(data.value?.date ?? [], data.value?.agg ?? []);
      }
      loading.value = false;
    }
    const generateChart = (labels,data) => {
      return {
        labels: labels,
        datasets: [
          // Indigo line
          {
            label: 'Total spending',
            data: data,
            borderColor: tailwindConfig().theme.colors.indigo[500],
            fill: true,
            backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
            clip: 20,
          },
          // Yellow line
           /*{
             label: 'PLU Earned',
             data: [
               0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
               10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
               20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
               30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
               40,
             ],
             borderColor: tailwindConfig().theme.colors.amber[400],
             borderDash: [4, 4],
             fill: false,
             borderWidth: 2,
             tension: 0,
             pointRadius: 0,
             pointHoverRadius: 3,
             pointBackgroundColor: tailwindConfig().theme.colors.amber[400],
             clip: 20,
           },*/
          // gray line
          /* {
             label: 'Competitors',
             data: [
               0.7, 3.5, 4.5, 3.5, 4.2, 4.6, 6, 7, 6, 6,
               11, 13, 14, 18, 17, 15, 13, 16, 20, 21,
               24, 22, 20, 22, 25, 18, 21, 23, 24, 32,
               28, 29, 35, 37, 42, 32, 32, 33, 33, 37,
               32,
             ],
             borderColor: tailwindConfig().theme.colors.slate[300],
             fill: false,
             borderWidth: 2,
             tension: 0,
             pointRadius: 0,
             pointHoverRadius: 3,
             pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
             clip: 20,
           },*/
        ],
      }
    }

    watch(statements, async () => {
      await calculStatements(statements);
    })

    onMounted(async () => {
      if (statements.value.length > 0) {
        await calculStatements(statements)
      }
    })

    return {
      loading,
      loadingExternalData,
      chartData,
      totalSpend,
      totalReward,
      totalCashback,
      cashbackAverage,
      pendingReward,
      formatNumber,
      formatCurrency
    } 
  },
}
</script>