<template>
  <!-- Row -->
  <tr v-show="!hidden" :class="{ fadeOut: showFadeOutClass, fadeIn: showFadeInClass }" class="tx" :id="`${transaction.id}`">
    <debug v-show="false" v-text="debug"></debug>
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
        <div class="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 mr-2 sm:mr-3">
          <img v-if="!transaction.perk" :src="transaction.type._icon" width="20" height="20" :alt="transaction.type._statementType"/>
          <img v-if="transaction.perk" :src="transaction.perk.image_url" :alt="transaction.type._statementType"/>
        </div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" v-show="settings.column.mcc">
      <!--<Tooltip class="ml-2" size="sm" position="top" :display="transaction.card_transactions?.mcc">-->
      <Tooltip class="ml-2" size="sm" position="top" :display="false">
        <template v-slot:content>
          <div class="text-left font-medium" v-if="transaction.card_transactions?.mcc">{{ transaction.card_transactions?.mcc }}</div>
          <div class="text-left font-medium" v-else>-</div>
        </template>
        <template  v-slot:tooltip >
          <p class="text-xs whitespace-nowrap text-left"></p>
        </template >
      </Tooltip>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div v-if="transaction.description">{{ transaction.description }}</div>
      <div v-else>-</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{ formatDate(transaction.card_transactions? transaction.card_transactions.created_at : transaction.date) }}</div>
    </td>
    <!--<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-slate-800">{{order.description}}</div>
    </td>-->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium" :class="amountColor()">{{ formatCurrency(Math.abs(transaction.amount / 100)) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <Tooltip class="ml-2" size="sm" position="top" :display="transaction.reward.value > 0">
        <template v-slot:content>
          <div class="text-left font-medium" v-if="transaction.reward.value">{{ transaction.reward.value.toFixed(4) }} PLU</div>
          <div class="text-left font-medium" v-else>-</div>
        </template>
        <template  v-slot:tooltip>
          <p class="text-xs whitespace-nowrap text-left" v-html="transaction.reward.tooltip.text"></p>
        </template >
      </Tooltip>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <Tooltip class="ml-2" size="sm" position="top" :display="Object.keys(transaction.reason).length !== 0 || Object.keys(transaction.releaseDate).length !== 0">
        <template v-slot:content>
          <div class="inline-flex font-medium text-center px-2.5 py-0.5" :class="transaction.status.style">
            {{ transaction.status.text }}
          </div>
        </template>
        <template  v-slot:tooltip v-if="Object.keys(transaction.releaseDate).length !== 0">
            <p class="text-xs whitespace-nowrap text-left">Reward available on : {{ formatDate(transaction.releaseDate.value) }}</p>
        </template >
        <template  v-slot:tooltip v-if="Object.keys(transaction.reason).length !== 0">
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
                <div class="inline-flex font-medium text-center px-2.5 py-0.5 bg-slate-100 text-salte-500">
                  {{ formatRate(cashback.rebate_rate) }}%
                </div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="text-left font-medium">{{cashback.amount.toFixed(4)}}</div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <Tooltip class="ml-2" size="lg" position="top" :display="false">
                  <template v-slot:content>
                    <div class="inline-flex font-medium text-center px-2.5 py-0.5" :class=transaction.status.style>{{ transaction.status.text }}</div>
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
import {computed, ref, toRaw, watch} from 'vue'
import Tooltip from "../../components/Tooltip.vue";
import {StatementsType} from "../../utils/StatementsType";
import {formatCurrency, formatDate} from "../../utils/Utils";

export default {name: 'StatementsTableItem', components: {
    Tooltip
  }, props: ['statement', 'value', 'selected', 'loading', 'sorted', 'settings'],
  setup(props, context) {
    const checked = computed(() => props.selected.includes(props.value))
    const isLoading = computed(() => props.loading)
    const statement = computed(() => props.statement)
    const sortedItems = computed(() => props.sorted)
    const hidden = ref(false);
    const showFadeOutClass = ref(false);
    const showFadeInClass = ref(true);
    const sortedKeyword = ref(props.statement.sortedKeyword);
    const descriptionOpen = ref(false)
    const debug = statement.value;
    const settings = ref(props.settings);

    const amountColor = () => {
      switch (toRaw(statement.value.type)) {
        case StatementsType.TOP_UP_ACCOUNT:
        case StatementsType.TOP_UP_CARD:
        case StatementsType.REFUNDED:
          return 'text-emerald-600'
        case StatementsType.WITHDRAW_ACCOUNT_TO_CARD:
        case StatementsType.CARD_FEE:
        case StatementsType.PLUTUS_METAL_CHARGE:
        case StatementsType.WITHDRAW_FEE:
        case StatementsType.DEX_BUY:
        case StatementsType.IN_VALIDATION:
        case StatementsType.DECLINED:
        case StatementsType.COMPLETED:
        case StatementsType.REWARDED:
        case StatementsType.PENDING:
          return 'text-rose-600'
        default:
          return 'text-slate-500'
      }
    }

    const transactionTypeText = (tx) => {
      switch (tx) {
        case "fiat_transactions":
        case "contis_transactions": {
          return "Classic Reward";
        }
        case "contis_transactions_partial":
        case "fiat_transactions_partial": {
          return "Partial Reward";
        }
        case "manual_reward": {
          return "Manual Reward";
        }
        default:
          return "Perk Reward";
      }
    }

    return {
      checked,
      isLoading,
      amountColor,
      descriptionOpen,
      transactionTypeText,
      hidden,
      showFadeOutClass,
      showFadeInClass,
      sortedItems,
      sortedKeyword,
      transaction: statement,
      debug
    }
  }, methods: {
    formatCurrency,
    formatDate,
    formatRate(value) {
      if (parseFloat(value) === 0.00) {
        return parseFloat(100).toFixed(2);
      } else {
        return parseFloat(value).toFixed(2);
      }
    }
  }, watch: {
    sortedItems() {
      if (!this.sortedItems.has(...this.sortedKeyword)) {
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
