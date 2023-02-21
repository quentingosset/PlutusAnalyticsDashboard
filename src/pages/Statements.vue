<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>

        <div class="lg:relative lg:flex">

          <!-- Content -->
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-5">

              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Statements</h1>
              </div>

              <!-- Add card button -->
              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">My Perks</span>
              </button>

            </div>

            <!-- Credit cards -->
            <div class="space-y-2">
              <!-- Table -->
              <TransactionsTable v-if="statements.length > 0" :statements=statements />
            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div class="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
              <div class="py-8 px-4 lg:px-8">
                <div class="max-w-sm mx-auto lg:max-w-none">

                  <div class="text-slate-800 font-semibold text-center mb-6">Physical Plutus Card Summary</div>

                  <!-- Credit Card -->
                  <div class="relative aspect-[7/4] bg-gradient-to-tr from-slate-600 to-slate-800 p-5 rounded-xl shadow-lg overflow-hidden">
                    <!-- Illustration on card -->
                    <div class="absolute inset-0 w-full h-full" aria-hidden="true">
                      <svg class="w-full h-full" width="326" height="190" viewBox="0 0 326 190" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <filter x="-59.5%" y="-73.1%" width="219%" height="246.3%" filterUnits="objectBoundingBox" id="ccill-a">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-34.5%" y="-62.5%" width="169%" height="225.1%" filterUnits="objectBoundingBox" id="ccill-b">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-23.3%" y="-43.5%" width="146.7%" height="186.9%" filterUnits="objectBoundingBox" id="ccill-c">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-15.9%" y="-46.1%" width="131.7%" height="192.1%" filterUnits="objectBoundingBox" id="ccill-d">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-21.8%" y="-58.4%" width="143.6%" height="216.8%" filterUnits="objectBoundingBox" id="ccill-e">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-21.1%" y="-77.5%" width="142.1%" height="254.9%" filterUnits="objectBoundingBox" id="ccill-f">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-19.1%" y="-66%" width="138.3%" height="232.1%" filterUnits="objectBoundingBox" id="ccill-g">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-20%" y="-75.6%" width="140%" height="251.3%" filterUnits="objectBoundingBox" id="ccill-h">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-32.1%" y="-78.2%" width="164.1%" height="256.5%" filterUnits="objectBoundingBox" id="ccill-i">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-24.3%" y="-48.7%" width="148.6%" height="197.4%" filterUnits="objectBoundingBox" id="ccill-j">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-29.7%" y="-67.7%" width="159.4%" height="235.4%" filterUnits="objectBoundingBox" id="ccill-k">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-22.9%" y="-39.7%" width="145.9%" height="179.3%" filterUnits="objectBoundingBox" id="ccill-l">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-27.4%" y="-72%" width="154.8%" height="243.9%" filterUnits="objectBoundingBox" id="ccill-m">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-20.4%" y="-66.7%" width="140.9%" height="233.3%" filterUnits="objectBoundingBox" id="ccill-n">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-70.1%" y="-93.6%" width="240.1%" height="287.2%" filterUnits="objectBoundingBox" id="ccill-o">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-52.4%" y="-122.3%" width="204.7%" height="344.6%" filterUnits="objectBoundingBox" id="ccill-p">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-38.5%" y="-87.5%" width="177%" height="275%" filterUnits="objectBoundingBox" id="ccill-q">
                            <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                          </filter>
                          <filter x="-46.2%" y="-46.4%" width="192.4%" height="192.8%" filterUnits="objectBoundingBox" id="ccill-r">
                            <feGaussianBlur stdDeviation="48" in="SourceGraphic" />
                          </filter>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                          <g stroke="#FFF">
                            <path d="m74.649 51.429 35.813-29.245" filter="url(#ccill-a)" transform="translate(23.168 10.2)" />
                            <path d="m95.001 48.454 61.614-34.273" style="mix-blend-mode:overlay" filter="url(#ccill-b)" transform="translate(23.168 10.2)" />
                            <path d="m102.738 59.711 90.966-49.333" filter="url(#ccill-c)" transform="translate(23.168 10.2)" />
                            <path d="M132.402 56.164c51.89-27.442 9.677-6.22 133.867-46.582" style="mix-blend-mode:overlay" filter="url(#ccill-d)" transform="translate(23.168 10.2)" />
                            <path d="M192.973 49.441c63.823-28.1 31.403-15.88 97.219-36.765" filter="url(#ccill-e)" transform="translate(23.168 10.2)" />
                            <path d="M174.906 63.986 275.21 36.252" filter="url(#ccill-f)" transform="translate(23.168 10.2)" />
                            <path d="M78.484 90.425 188.905 57.9" style="mix-blend-mode:overlay" filter="url(#ccill-g)" transform="translate(23.168 10.2)" />
                            <path d="M107.59 120.722 213.167 92.32" filter="url(#ccill-h)" transform="translate(23.168 10.2)" />
                            <path d="m44.001 139.184 66.091-27.432" filter="url(#ccill-i)" transform="translate(23.168 10.2)" />
                            <path d="m25.233 108.035 87.289-44.052" filter="url(#ccill-j)" transform="translate(23.168 10.2)" />
                            <path d="m0 78.862 71.407-31.693" filter="url(#ccill-k)" transform="translate(23.168 10.2)" />
                            <path d="M41.3 54.036 133.926 0" filter="url(#ccill-l)" transform="translate(23.168 10.2)" />
                            <path d="M177.385 128.372c38.41-17.811 13.059-6.784 77.387-29.83" style="mix-blend-mode:overlay" filter="url(#ccill-m)" transform="translate(23.168 10.2)" />
                            <path d="m190.745 154.661 103.507-32.222" filter="url(#ccill-n)" transform="translate(23.168 10.2)" />
                            <path d="m235.764 74.579 30.397-22.87" filter="url(#ccill-o)" transform="translate(23.168 10.2)" />
                            <path d="M29.686 21.19 70.172 3.645" style="mix-blend-mode:overlay" filter="url(#ccill-p)" transform="translate(23.168 10.2)" />
                            <path d="M17.977 79.61 73.04 55.091" filter="url(#ccill-q)" transform="translate(23.168 10.2)" />
                          </g>
                          <path fill-opacity=".24" fill="#FFF" style="mix-blend-mode:overlay" filter="url(#ccill-r)" d="M156 .573 331.59 311H75L20 .573z" transform="translate(0 -40)" />
                        </g>
                      </svg>
                    </div>
                    <div class="relative h-full flex flex-col justify-between">
                      <!-- Logo on card -->
                      <img :src="logoCard" style="width: 48px;">
                      <!-- Card number -->
                      <div class="flex justify-between text-lg font-bold text-slate-200 tracking-widest drop-shadow-sm">
                        <span v-if="isLoading">****-****-****-****</span>
                        <span v-else>{{cardNumber}}</span>
                      </div>
                      <!-- Card footer -->
                      <div class="relative flex justify-between items-center z-10 mb-0.5">
                        <!-- Card expiration -->
                        <div class="text-sm font-bold text-slate-200 tracking-widest drop-shadow-sm space-x-3">
                          <span v-if="isLoading">EXP **/**</span>
                          <span v-else>EXP {{cardExpiration}}</span>
                          <span>CVC ***</span>
                        </div>
                      </div>
                      <!-- Mastercard logo -->
                      <svg class="absolute bottom-0 right-0" width="48" height="28" viewBox="0 0 48 28">
                        <circle fill="#F59E0B" cx="34" cy="14" r="14" fill-opacity=".8" />
                        <circle fill="#F43F5E" cx="14" cy="14" r="14" fill-opacity=".8" />
                      </svg>
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="mt-6">
                    <div class="text-sm font-semibold text-slate-800 mb-1">Details</div>
                    <ul>
                      <li class="flex items-center justify-between py-3 border-b border-slate-200">
                        <div class="text-sm">Card Balance</div>
                        <div class="text-sm font-medium text-slate-800 ml-2">{{ formatCurrency(availableBalance / 100) }}</div>
                      </li>
                      <li class="flex items-center justify-between py-3 border-b border-slate-200">
                        <div class="text-sm">Subscription</div>
                        <div class="flex items-center justify-between">
                          <div v-html=expirationSubscription()></div>
                          <div class="text-sm font-medium text-slate-800 ml-2 mr-2 capitalize">{{ subscriptionPlan }}</div>
                          <div class="flex items-center space-x-2">
                            <!-- Start -->
                            <Tooltip class="" size="sm" position="left">
                              <template v-slot:content>
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                                </svg>
                              </template>
                              <template  v-slot:tooltip>
                                <p class="text-xs whitespace-nowrap text-left">Expiry date : {{ formatDate(subscriptionEnd) }}</p>
                              </template >
                            </Tooltip>
                            <!-- End -->
                          </div>
                        </div>
                      </li>
                      <li class="flex items-center justify-between py-3 border-b border-slate-200">
                        <div class="text-sm">Status</div>
                        <div class="text-sm font-medium text-slate-800 ml-2">{{ formatStatus() }}</div>
                      </li>
                      <li class="flex items-center justify-between py-3 border-b border-slate-200">
                        <div class="text-sm">Perks used</div>
                        <div class="text-sm font-medium text-slate-800 ml-2" v-html="formatUsedPerk()"></div>
                      </li>
                    </ul>
                  </div>

                  <!-- Subscription Limits -->
                  <div class="mt-6">
                    <div class="text-sm font-semibold text-slate-800 mb-4">Subscription Details</div>
                    <div class="pb-4 border-b border-slate-200">
                      <div class="flex justify-between text-sm mb-2">
                        <div>Cashback This Month</div>
                        <div class="italic"> {{ formatCurrency(monthlyReward) }} <span class="text-slate-400">/</span> {{ formatCurrency(cashbackLimit) }}</div>
                      </div>
                      <div class="relative w-full h-2 bg-slate-300">
                        <div class="absolute inset-0 bg-emerald-500" aria-hidden="true" :style="cashbackMonthlyLimitPercent()"></div>
                      </div>
                    </div>
                  </div>
                  <!-- Payment Limits -->
                  <div class="mt-6">
                    <div class="text-sm font-semibold text-slate-800 mb-4">Rolling Limits</div>
                    <div class="pb-4 border-b border-slate-200">
                      <div class="flex justify-between text-sm mb-2">
                        <div>Monthly spent</div>
                        <div class="italic"> {{ formatCurrency(spendingMonthlyLimit) }} <span class="text-slate-400">/</span> {{ formatCurrency(monthlySpendLimit) }}</div>
                      </div>
                      <div class="relative w-full h-2 bg-slate-300">
                        <div class="absolute inset-0 bg-emerald-500" aria-hidden="true" :style="spendingMonthlyLimitPercent()"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Edit / Delete -->
                  <!--<div class="flex items-center space-x-3 mt-6">
                    <div class="w-1/2">
                      <button class="btn w-full border-slate-200 hover:border-slate-300 text-slate-600">
                        <svg class="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                        </svg>
                        <span class="ml-2">Edit Card</span>
                      </button>
                    </div>
                    <div class="w-1/2">
                      <button class="btn w-full border-slate-200 hover:border-slate-300 text-rose-500">
                        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                          <path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z" />
                        </svg>
                        <span class="ml-2">Block Card</span>
                      </button>
                    </div>
                  </div>-->

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
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import {
  getBalance,
  getPlutusCard,
  getRewards,
  getStatementsAndRewards,
  getSubscription,
  getUserPerks,
  getUserProfile
} from "../utils/PlutusCall";
import TransactionsTable from "../partials/transactions/StatementsTable.vue";
import Tooltip from "../components/Tooltip.vue";
import logoCard from '../images/logo_card.png'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

export default {
  name: 'Transactions',
  components: {
    Sidebar,
    Header,
    TransactionsTable,
    Tooltip
  },
  setup() {
    const isLoading = ref(true);
    const sidebarOpen = ref(false)
    const cardNumber = ref(null);
    const cardStatus = ref(false);
    const cardExpiration = ref(null);
    const subscriptionPlan = ref(null);
    const subscriptionEnd = ref(null);
    const stakingLevel = ref(null);
    const perks = ref(null);
    const percent = ref(null);
    const cashbackUpTo = ref(null);
    const cashbackLimit = ref(null);
    const monthlyReward = ref(null);
    const perksHistory = ref([]);
    const perksUsed = ref([]);
    const availableBalance = ref(0);
    const spendingMonthlyLimit = ref(0);
    const monthlySpendLimit = ref(0);
    const statements = ref([]);
    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    };

    getUserProfile().then(value => {
      localStorage.setItem('local_currency',value?.local_currency??"USD");
      localStorage.setItem('first_name',value?.personal_details.first_name??"FIRST_NAME");
      localStorage.setItem('last_name',value?.personal_details.last_name??"LAST_NAME");
    });

    getPlutusCard().then(value => {
      cardStatus.value = value.status
      cardNumber.value = value.card_number;
      cardExpiration.value = value.expiry_date.substring(0, value.expiry_date.length - 2) + "/" + value.expiry_date.substring(value.expiry_date.length - 2);
    });


    getSubscription().then(value => {
      subscriptionPlan.value = value.plan;
      subscriptionEnd.value = value.ends_on;
      setSubscriptionInformations();
    });

    getStatementsAndRewards().then(value => {
      dayjs.extend(isBetween);

      statements.value = value;

      let spendingMonthlyLimits = value.filter((value) => {return (dayjs(value.date).isBetween(dayjs().subtract(1, 'month'),dayjs(),null, '[]')
          && value.type !== "29"
          && value.type !== "LOAD_PLUTUS_CARD_FROM_CJ_WALLET"
          && value.type !== "DEPOSIT_FUNDS_RECEIVED"
          && value.type !== "PLUTUS_WALLET_WITHDRAW_FEE"
          && value.type !== "ORDER_FULFILLED"
      )});
      spendingMonthlyLimit.value = spendingMonthlyLimits.reduce((sum, transaction) => {
        return sum + (transaction.amount / 100);
      },0);
    });


    getUserPerks().then(value => {
      stakingLevel.value = value.staking_level;
      setStakingInformations();
    });

    getRewards().then(value => {
      let currentMonthReward = value.filter(value => {return dayjs().isSame(value.createdAt, 'month')});
      monthlyReward.value = currentMonthReward.reduce((sum, cashback) => {
        return sum + ((cashback.fiat_amount_rewarded / 100) * (cashback.rebate_rate / 100));
      },0);

      perksHistory.value = value.filter(cashback => {
        let perkFind = cashback.reference_type.match(/(?<=perk_).*(?=_reward)/);
        if(perkFind !== null){
          cashback.perks_id = perkFind[0];
          return true;
        }
        return false;
      });

      perksUsed.value = [...perksHistory.value].filter(value => {return dayjs().isSame(value.createdAt, 'month')});
    });

    /* From https://github.com/styfic/plutus-perk-checker/blob/main/perk-checker.js

    Needs adaption for getRewards() and possibly getUserPerks to return the expected result

    */

    async function checkPerks() {

    const isPerkTransaction = transaction => new Date(transaction.createdAt) >= getFirstDayCurrentMonth() && transaction.reference_type.indexOf('perk') >= 0;
    const perkTransactionsOfCurrentMonth = await getRewards().then(result => result.filter(isPerkTransaction));
    const [userPerks, perksGranted] = await getUserPerks().then(userPerks => [userPerks.perks, userPerks.total_perks_granted]);
    const isUsedPerk = (transaction, perk) => transaction.reference_type === `perk_${perk.id}_reward`;
    const usedPerks = userPerks.filter(perk => perkTransactionsOfCurrentMonth.some(transaction => isUsedPerk(transaction, perk)));
    const unusedPerks = userPerks.filter(perk => perkTransactionsOfCurrentMonth.every(transaction => !isUsedPerk(transaction, perk)));

    perksUsed.value = usedPerks.length
    } 

    getBalance().then(value => {
      availableBalance.value = value.AvailableBalance;
    });

    function setSubscriptionInformations(){
      if(subscriptionPlan.value === "starter"){
        percent.value = 3;
        perks.value = 1;
        cashbackUpTo.value = 250;
        monthlySpendLimit.value = 5000;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      } else if(subscriptionPlan.value === "everyday"){
        percent.value = 3;
        perks.value = 2;
        cashbackUpTo.value = 2000;
        monthlySpendLimit.value = 15500;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      } else if(subscriptionPlan.value === "premium"){
        percent.value = 3;
        perks.value = 3;
        cashbackUpTo.value = 22500;
        monthlySpendLimit.value = 22500;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      }
    }
    function setStakingInformations(){
      if(stakingLevel.value === 1){
        percent.value = 4;
        perks.value = 4;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      } else if(stakingLevel.value === 2){
        percent.value = 5;
        perks.value = 5;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      } else if(stakingLevel.value === 3){
        percent.value = 6;
        perks.value = 6;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      } else if(stakingLevel.value === 4){
        percent.value = 8;
        perks.value = 8;
        cashbackLimit.value = cashbackUpTo.value*(percent.value/100);
      }
    }

    const cashbackMonthlyLimitPercent = () => {
      return `width:${((monthlyReward.value / cashbackLimit.value) * 100)}%;`;
    }

    const spendingMonthlyLimitPercent = () => {
      return `width:${((spendingMonthlyLimit.value / monthlySpendLimit.value) * 100)}%;`;
    }

    return {
      isLoading,
      sidebarOpen,
      cardNumber,
      cardExpiration,
      updateSelectedItems,
      logoCard,
      subscriptionPlan,
      subscriptionEnd,
      cardStatus,
      stakingLevel,
      monthlySpendLimit,
      percent,
      perks,
      cashbackLimit,
      monthlyReward,
      perksHistory,
      perksUsed,
      cashbackMonthlyLimitPercent,
      availableBalance,
      spendingMonthlyLimit,
      spendingMonthlyLimitPercent,
      statements
    }
  },
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('D MMMM YYYY, HH:mm');
    },
    expirationSubscription(){
      const dateExpiration = dayjs(this.subscriptionEnd);
      const dateNow = dayjs();
      const diff = dateExpiration.diff(dateNow, 'd');
      if(diff >= 8){
        return '<div class="w-2 h-2 rounded-full bg-emerald-500"></div>';
      } else if(diff < 8 && diff > 3){
        return '<div class="w-2 h-2 rounded-full bg-amber-500"></div>';
      }else{
        return '<div class="w-2 h-2 rounded-full bg-rose-500"></div>';
      }
    },
    formatStakingLevel(){
      switch (this.stakingLevel){
        case 1:
          return "Hero";
        case 2:
          return "Veteran";
        case 3:
          return "Legend";
        case 4:
          return "G.O.A.T";
        default:
          return "-";
      }
    },
    formatStatus(){
      return `${this.percent}% (${this.formatStakingLevel()}) + ${this.perks} Perks`;
    },
    formatUsedPerk(){
      return `${this.perksUsed.length} / ${this.perks} Used Perks`;
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
    }
  }
}
</script>
