import {defineStore} from 'pinia'
import {getBalance} from "../utils/PlutusCall";

export const balanceStore = defineStore({
    id: 'balance',
    state: () => ({
        userAvailableBalance: 0 as number,
        userHoldingBalance: 0 as number,
        userCreditHoldBalance: 0 as number,
        userDebitHoldBalance: 0 as number,
        loading: false as boolean,
        error: null
    }),
    getters: {
    },
    actions: {
        async fetchBalance() {
            this.userAvailableBalance = 0;
            this.userHoldingBalance = 0;
            this.userCreditHoldBalance = 0;
            this.userDebitHoldBalance = 0;
            this.loading = true
            try {
                const [userAvailableBalance, userHoldingBalance, userCreditHoldBalance, userDebitHoldBalance] = await getBalance().then(userBalance => [
                    (userBalance.fiat_balance[0].amount - userBalance.card_transactions_aggregate.aggregate.sum.billing_amount),
                    userBalance.card_transactions_aggregate.aggregate.sum.billing_amount
                ]);
                this.userAvailableBalance = userAvailableBalance;
                this.userHoldingBalance = userHoldingBalance;
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})

export type BalanceStore = ReturnType<typeof balanceStore>