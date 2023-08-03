import {defineStore} from 'pinia'
import {getBalance} from "../utils/PlutusCall";

export const balanceStore = defineStore({
    id: 'balance',
    state: () => ({
        userAccountBalance: null,
        userAvailableBalance: null,
        userCreditHoldBalance: null,
        userDebitHoldBalance: null,
        loading: false,
        error: null
    }),
    getters: {
    },
    actions: {
        async fetchBalance() {
            this.userAccountBalance = 0;
            this.userAvailableBalance = 0;
            this.userCreditHoldBalance = 0;
            this.userDebitHoldBalance = 0;
            this.loading = true
            try {
                const [userAccountBalance, userAvailableBalance, userCreditHoldBalance, userDebitHoldBalance] = await getBalance().then(userBalance => [(userBalance.fiat_balance[0].amount - userBalance.card_transactions_aggregate.aggregate.sum.billing_amount)]);;
                this.userAccountBalance = userAccountBalance;
                //this.userAvailableBalance = userAvailableBalance;
                //this.userCreditHoldBalance = userCreditHoldBalance;
                //this.userDebitHoldBalance = userDebitHoldBalance;
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})