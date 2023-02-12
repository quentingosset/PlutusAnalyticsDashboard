<template>
  <!-- Row -->
  <!--<tr v-show="filter !== 'completed'" :class="{ viewportPendulum: filter === 'completed' }" class="tx" :id="`${order.id}`">-->
  <tr v-show="!hidden" :class="{ fadeOut: showFadeOutClass, fadeIn: showFadeInClass }" class="tx" :id="`${transaction.id}`" :data-debug="`${JSON.stringify(transaction)}`">
    <!--<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <input :id="order.id" class="form-checkbox" type="checkbox" :value="value" @change="check"
                 :checked="checked"/>
        </label>
      </div>
    </td>-->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center text-slate-800">
        <div class="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
          <img :src="typeIcon(transaction.type)" width="20" height="20" :alt="transaction.type"/>
        </div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{ transaction.description }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{ formatDate(transaction.date) }}</div>
    </td>
    <!--<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-slate-800">{{order.description}}</div>
    </td>-->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium" :class="amountColor()">{{ formatCurrency(transaction.amount / 100) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <Tooltip class="ml-2" size="sm" position="top" :display="transaction.reward.value > 0">
        <template v-slot:content>
          <div class="text-left font-medium">{{ transaction.reward.text }}</div>
        </template>
        <template  v-slot:tooltip>
          <p class="text-xs whitespace-nowrap text-left" v-html="transaction.reward.tooltip.text"></p>
        </template >
      </Tooltip>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <Tooltip class="ml-2" size="sm" position="top" :display="Object.keys(transaction.reason).length !== 0 || Object.keys(transaction.releaseDate).length !== 0">
        <template v-slot:content>
          <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="transaction.status.style">
            {{ transaction.status.text }}
          </div>
        </template>
        <template  v-slot:tooltip>
          <p class="text-xs whitespace-nowrap text-left">{{ transaction.status.tooltip.text }}</p>
        </template >
      </Tooltip>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <button v-show="transaction.cashback.length > 0"
                class="text-slate-400 hover:text-slate-500 transform"
                :class="descriptionOpen && 'rotate-180'"
                :aria-expanded="descriptionOpen"
                @click.prevent="descriptionOpen = !descriptionOpen"
                :aria-controls="`description-${transaction.id}`"
        >
          <span class="sr-only">Menu</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z"/>
          </svg>
        </button>
      </div>
    </td>
  </tr>
  <!--
  Example of content revealing when clicking the button on the right side:
  Note that you must set a "colSpan" attribute on the <td> element,
  and it should match the number of columns in your table
  -->
  <tr v-show="!hidden" :class="{ fadeOut: showFadeOutClass, fadeIn: showFadeInClass,  'hidden':!descriptionOpen }"
      class="tx-description" :id="`${transaction.id}`" role="region" v-if="transaction.cashback.length !== 0">
    <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
      <div class="flex items-center bg-white rounded-sm border">
        <table class="table-auto w-full divide-y divide-slate-200">
          <thead class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-slate-200">
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
              <div class="font-semibold text-left">Date</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Type</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Txn Amount</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Percent</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Reward</div>
            </th>
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div class="font-semibold text-left">Status</div>
            </th>
          </tr>
          </thead>
          <tbody class="text-sm">
          <template v-for="cashback in transaction.cashback">
            <tr>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div>{{ formatDate(cashback.createdAt) }}</div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                {{ transactionTypeText(cashback.reference_type) }}
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="text-left font-medium">{{ formatCurrency(cashback.fiat_amount_rewarded / 100) }}</div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-slate-100 text-salte-500">
                  {{ formatRate(cashback.rebate_rate) }}%
                </div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="text-left font-medium">{{transaction.reward.text}}</div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <Tooltip class="ml-2" size="lg" position="top" :display="false">
                  <template v-slot:content>
                    <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class=transaction.status.style>{{ transaction.status.text }}</div>
                  </template>
                  <template  v-slot:tooltip>
                    <p class="text-xs whitespace-nowrap text-left">Reason : {{ transaction.reason.value }}</p>
                  </template >
                </Tooltip>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
  <!--<tr :id="`description-${order.id}`" role="region" :class="!descriptionOpen && 'hidden'">
    <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
      <div class="flex items-center bg-slate-50 p-3 -mt-3">
        <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 mr-2">
          <path
              d="M1 16h3c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1zm1-3.6l10-10L13.6 4l-10 10H2v-1.6z"/>
        </svg>
        <div class="italic">{{ order.description }}</div>
      </div>
    </td>
  </tr>-->
</template>
<style>
.fadeOut {
  animation-name: fadeOut;
  animation-duration: 1s;
  animation-delay: 0s, 1s;
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-delay: 0s, 1s;
  animation-fill-mode: both;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
<script>
import {computed, ref} from 'vue'
import Image29 from '../../images/icon-29.svg'
import ImageDepositFundsReceived from '../../images/icon-FUNDS_RECEIVED.svg'
import ImageDeclined from '../../images/icon-DECLINED.svg'
import ImageShop from '../../images/icon-SHOP.svg'
import ImageGift from '../../images/icon-GIFT.svg'
import ImageWithdrawFee from '../../images/icon-WITHDRAW_FEE.svg'
import dayjs from 'dayjs';
import Tooltip from "../../components/Tooltip.vue";

export default {name: 'StatementsTableItem', components: {
    Tooltip
  }, props: ['statement', 'value', 'selected', 'loading', 'sorted'],
  setup(props, context) {
    const checked = computed(() => props.selected.includes(props.value))
    const isLoading = computed(() => props.loading)
    const statement = computed(() => props.statement)
    const sortedItems = computed(() => props.sorted)
    const hidden = ref(false);
    const showFadeOutClass = ref(false);
    const showFadeInClass = ref(true);
    const sortedKeyword = ref(new Map());

    function check() {
      let updatedSelected = [...props.selected]
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1)
      } else {
        updatedSelected.push(props.value)
      }
      context.emit('update:selected', updatedSelected)
    }

    const descriptionOpen = ref(false)
    const statusColor = () => {
      switch (statement.value.type) {
        case 'Approved':
        case 'Completed':
          return 'bg-emerald-100 text-emerald-600'
        case 'Refunded':
          return 'bg-slate-100 text-slate-500'
        case 'Pending':
        case '0':
          return 'bg-amber-100 text-amber-600'
        default:
          //return 'bg-slate-100 text-slate-500'
          return 'bg-emerald-100 text-emerald-600'
      }
    }
    const amountColor = () => {
      switch (statement.value.type) {
        case 'DEPOSIT_FUNDS_RECEIVED':
        case '29':
        case '35':
        case '45':
          return 'text-emerald-600'
        case 'LOAD_PLUTUS_CARD_FROM_CJ_WALLET':
        case 'PLUTUS_WALLET_WITHDRAW_FEE':
        case 'ORDER_FULFILLED':
        case '0':
        case '5':
        case '31':
          return 'text-rose-600'
        default:
          return 'text-slate-500'
      }
    }

    const transactionTypeText = (tx) => {
      if (tx === "contis_transactions_partial") {
        return "Partial Reward";
      } else if (tx === "contis_transactions") {
        return "Classic Reward";
      } else if (tx === "manual_reward") {
        return "Manual Reward";
      } else {
        return "Perk Reward";
      }
    }
    const rewardAvailableColor = (status, reason) => {
      if (status) {
        return 'bg-emerald-100 text-emerald-600 fill-emerald-400';
      } else if (status === false && reason != null) {
        return 'bg-rose-100 text-rose-600 fill-rose-400'
      } else {
        return 'bg-amber-100 text-amber-600 fill-amber-400';
      }

    }

    const initData = () => {
      statement.value.status = {};
      statement.value.status.tooltip = {};
      statement.value.reason = {};
      statement.value.releaseDate = {};
      statement.value.reward = {};
      statement.value.reward.tooltip = {};
      initStatus();
      initReward();

    }

    const initStatus = () => {
      if(statement.value.type === 'LOAD_PLUTUS_CARD_FROM_CJ_WALLET'
          || statement.value.type === 'DEPOSIT_FUNDS_RECEIVED'
          || statement.value.type === 'PLUTUS_WALLET_WITHDRAW_FEE'
          || statement.value.type === 'ORDER_FULFILLED') {
        statement.value.status.value = 'no_reward';
        statement.value.status.text = 'No Reward';
        statement.value.status.style = 'bg-slate-100 text-slate-600';
        sortedKeyword.value.set('no_reward');
      } else if (statement.value.type === 'REBATE_BONUS') {
        sortedKeyword.value.set('bonus');
        statement.value.status.value = 'bonus';
        statement.value.status.text = 'Bonus';
        statement.value.status.style = 'bg-blue-100 text-blue-600';
        let find = statement.value.cashback.find((cashback) => {return cashback.reason !== null});
        statement.value.reason.value = find? find.reason : "-" ;
        statement.value.status.tooltip.text = `Reason : ${statement.value.reason.value}`;
      } else if (statement.value.type === '5') {
        sortedKeyword.value.set('declined');
        statement.value.status.value = 'declined';
        statement.value.status.text = 'Declined';
        statement.value.status.style = 'bg-rose-100 text-rose-600';
      } else if (statement.value.type === '0' && statement.value.cashback.length === 0) {
        sortedKeyword.value.set('validation');
        statement.value.status.value = 'validation';
        statement.value.status.text = 'In Validation';
        statement.value.status.style = 'bg-amber-100 text-amber-600';
      } else if (statement.value.cashback.length > 0 && statement.value.cashback.find((cashback) => {return cashback.available === false && cashback.reason !== null})) {
        sortedKeyword.value.set('rejected');
        statement.value.status.value = 'rejected';
        statement.value.status.text = 'Rejected';
        statement.value.status.style = 'bg-rose-100 text-rose-600';
        statement.value.reason.value = statement.value.cashback.find((cashback) => {return cashback.available === false && cashback.reason !== null}).reason;
        statement.value.status.tooltip.text = `Reason : ${statement.value.reason.value}`;
      } else if (statement.value.cashback.length > 0 && statement.value.cashback.find((cashback) => {return cashback.available === false})) {
        sortedKeyword.value.set('pending');
        let releaseDate = dayjs(statement.value.cashback.find((cashback) => {return cashback.available === false}).createdAt).add(45, 'day').format('DD MMMM YYYY, HH:mm');
        statement.value.status.value = 'pending';
        statement.value.status.text = 'Pending';
        statement.value.status.style = 'bg-amber-100 text-amber-600';
        statement.value.releaseDate.value = releaseDate;
        statement.value.status.tooltip.text = `Reward available on : ${releaseDate}`;
      } else if (statement.value.cashback.length > 0 && statement.value.cashback.find((cashback) => {return cashback.available === true})) {
        statement.value.status.value = 'rewarded';
        statement.value.status.text = 'Rewarded';
        statement.value.status.style = 'bg-emerald-100 text-emerald-600';
        sortedKeyword.value.set('rewarded');
        sortedKeyword.value.set('completed');
      } else if (statement.value.type === '45' || statement.value.type === '35') {
        statement.value.status.value = 'refunded';
        statement.value.status.text = 'Refunded';
        statement.value.status.style = 'bg-slate-100 text-slate-600';
        sortedKeyword.value.set('refunded');
      } else {
        statement.value.status.value = 'no_reward';
        statement.value.status.text = 'No Reward';
        statement.value.status.style = 'bg-slate-100 text-slate-600';
        sortedKeyword.value.set('no_reward');
      }
    }
    const initReward = () => {
      if (statement.value.cashback.length === 0) {
        statement.value.reward.value = 0;
        statement.value.reward.text = "-";
        statement.value.reward.tooltip.text = "TOOLTIP";
      } else {
        let amount = statement.value.cashback.reduce(function (tot, cashback) {
          return tot + parseFloat(cashback.amount);
        }, 0).toFixed(4);
        let txCashback = statement.value.cashback.find(Boolean);
        let PLURate = ((parseFloat(txCashback.fiat_amount_rewarded??0) / 100) * (parseFloat(txCashback.rebate_rate)/100))/parseFloat(txCashback.amount);
        statement.value.reward.value = amount;
        statement.value.reward.text = amount + " PLU";
        statement.value.reward.tooltip.text = `Rate: ${formatCurrency(PLURate)}/PLU<br>Cashback: ${formatCurrency(amount*PLURate)}`;
      }
    }

    // TODO REMOVE
    const rewardAmount = (value) => {
      if (value === undefined) {
        if (statement.value.cashback.length === 0) {
          return "-";
        } else {
          let amount = statement.value.cashback.reduce(function (tot, cashback) {
            return tot + parseFloat(cashback.amount);
          }, 0).toFixed(4);
          if (amount > 0) {
            return amount + " PLU";
          }
          return 0;
        }
      } else {
        return parseFloat(value).toFixed(4) + " PLU";
      }
    }

    const typeIcon = (type) => {
      switch (type) {
        case "29":
        case "LOAD_PLUTUS_CARD_FROM_CJ_WALLET":
          return Image29
        case "DEPOSIT_FUNDS_RECEIVED":
          return ImageDepositFundsReceived
        case "5":
          return ImageDeclined
        case "0":
        case "31":
          return ImageShop
        case "45":
        case "35":
          return ImageShop
        case "REBATE_BONUS":
          return ImageGift
        case "PLUTUS_WALLET_WITHDRAW_FEE":
        case "ORDER_FULFILLED":
          return ImageWithdrawFee
      }
    }

    initData();

    function formatCurrency(value){
      if (isNaN(value)) {
        return '';
      }

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: localStorage.getItem('local_currency'),
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    };

    return {
      check,
      checked,
      isLoading,
      statusColor,
      amountColor,
      typeIcon,
      descriptionOpen,
      rewardAvailableColor,
      rewardAmount,
      transactionTypeText,
      hidden,
      showFadeOutClass,
      showFadeInClass,
      sortedItems,
      sortedKeyword,
      transaction: statement
    }
  }, methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD MMMM YYYY, HH:mm');
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
    formatRate(value) {
      if (parseFloat(value) === 0.00) {
        return parseFloat(100).toFixed(2);
      } else {
        return parseFloat(value).toFixed(2);
      }
    }
  }, watch: {
    sortedItems() {
      if (this.sortedItems.has("all")) {
        this.showFadeOutClass = false;
        this.showFadeInClass = true;
        this.hidden = false;
      } else if ([...this.sortedItems].filter(([k, v]) => this.sortedKeyword.has(k)).length === 0) {
        this.showFadeInClass = false;
        this.showFadeOutClass = true;
        setTimeout(() => this.hidden = true, 1000);
      } else {
        this.showFadeOutClass = false;
        this.showFadeInClass = true;
        this.hidden = false;
      }
    }
  }}
</script>
