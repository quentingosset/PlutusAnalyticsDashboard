<template>
  <div class="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
    <header class="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 class="font-semibold text-slate-800">Transactions overview</h2>
    </header>
    <div className="px-5 py-3">
      <div className="flex flex-wrap justify-center items-end">
        <div class="px-5 py-1">
          <div class="flex flex-wrap">
            <!-- Total Transaction -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl font-bold text-slate-800 mr-2"><span v-text="formatNumber(statements.length)"></span></div>
                  <!--<div class="text-sm font-medium text-emerald-500">+49%</div>-->
                </div>
                <div class="text-sm text-slate-500">Transactions</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Total Spend -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl font-bold text-slate-800 mr-2"><span v-text="formatCurrency(totalSpend)"></span></div>
                  <!--<div class="text-sm font-medium text-emerald-500">+49%</div>-->
                </div>
                <div class="text-sm text-slate-500">Total spends</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Total Rewards -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl font-bold text-slate-800 mr-2"><span v-text="formatNumber(totalReward)"></span> PLU</div>
                  <!--<div class="text-sm font-medium text-emerald-500">+7%</div>-->
                </div>
                <div class="text-sm text-slate-500">Total Rewards</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Pending Reward -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl font-bold text-slate-800 mr-2"><span v-text="formatNumber(pendingReward)"></span> PLU</div>
                  <!--<div class="text-sm font-medium text-amber-500">-7%</div>-->
                </div>
                <div class="text-sm text-slate-500">Pending rewards</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- Visit Duration-->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl font-bold text-slate-800 mr-2"><span v-text="formatCurrency(totalCashback)"></span></div>
                  <!--<div class="text-sm font-medium text-amber-500">+7%</div>-->
                </div>
                <div class="text-sm text-slate-500">Total cashback</div>
              </div>
              <div class="hidden md:block w-px h-8 bg-slate-200 mr-5" aria-hidden="true"></div>
            </div>
            <!-- PLU AVERAGE -->
            <div class="flex items-center py-2">
              <div class="mr-5">
                <div class="flex items-center">
                  <div class="text-xl font-bold text-slate-800 mr-2"><span v-text="formatCurrency(cashbackAverage)"></span></div>
                  <!--<div class="text-sm font-medium text-amber-500">+7%</div>-->
                </div>
                <div class="text-sm text-slate-500">PLU average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
    <SpendingChart :data="chartData" width="800" height="300" />
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'
import SpendingChart from '../charts/SpendingChart.vue'

// Import utilities
import {tailwindConfig, hexToRGB, formatCurrency, formatNumber, formatDate, CHART_FORMAT_DATE} from '../utils/Utils'
import {StatementsType} from "../utils/StatementsType";
import moment from "moment/moment";

export default {
  name: 'SpendingOverview',
  methods: {formatNumber, formatCurrency},
  components: {
    SpendingChart,
  },
  props: ['statements'],

  setup(props) {
    const statements = computed(() => props.statements);
    const chartData = ref(null);
    const data = ref({});
    const pendingReward = ref(0);
    const totalSpend = ref(0);
    const totalReward = ref(0);
    const totalCashback = ref(0);
    const cashbackAverage = ref(0);
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
          /* {
             label: 'Expected Return',
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
    const calculStatements = (statements) => {
      let onlySpendStatements = statements.value.filter(statement => !StatementsType.TOP_UP_ACCOUNT.equals(statement.type)
          && !StatementsType.TOP_UP_CARD.equals(statement.type)
          && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(statement.type)
          && !StatementsType.REFUNDED.equals(statement.type))

      var spendAggregate = onlySpendStatements.reverse().reduce((a,b) => {
        const key = formatDate(moment(b.card_transactions?.created_at??b.date).startOf("day").format(),CHART_FORMAT_DATE)
        a[key] = a[key]? a[key]+(Math.abs(b.amount)/100): (Math.abs(b.amount)/100)
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
      totalReward.value = onlySpendStatements.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + parseFloat(cashback.amount),0),0).toFixed(2);
      totalCashback.value = onlySpendStatements.map(cashback => cashback.cashback).reduce((sum, cashback) => sum + cashback.reduce((previousSum, cashback) => previousSum + ((((parseFloat(cashback.fiat_amount_rewarded??0) / 100) * (parseFloat(cashback.rebate_rate)/100))/parseFloat(cashback.amount)) * parseFloat(cashback.amount)),0),0).toFixed(2);
      cashbackAverage.value = totalCashback.value/totalReward.value;
      pendingReward.value = onlySpendStatements.filter(statement => statement.status !== undefined && statement.status.value === 'pending').reduce((sum, statement) => sum +  parseFloat(statement.reward.value),0).toFixed(2);

      chartData.value = generateChart(data.value?.date??[],data.value?.agg??[]);
    }

    calculStatements(statements);

    watch(statements, () => {
      calculStatements(statements);
    });

    return {
      chartData,
      totalSpend,
      totalReward,
      totalCashback,
      cashbackAverage,
      pendingReward
    } 
  }
}
</script>