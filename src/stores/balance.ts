import {defineStore} from 'pinia'
import {getBalance, getPlutonBalance} from "../utils/PlutusCall";
import {sleep} from "../utils/Utils";
import dayjs from "dayjs";

export const balanceStore = defineStore({
    id: 'balance',
    state: () => ({
        userAvailableBalance: 0 as number,
        userHoldingBalance: 0 as number,
        userPLUAvailable: 0 as number,
        userCreditHoldBalance: 0 as number,
        userDebitHoldBalance: 0 as number,
        updatedAt : null as undefined | number,
        validUntil : null as undefined | number,
        loading: false as boolean,
        error: null
    }),
    getters: {
        shouldRefresh(state): boolean {
            return state.validUntil < dayjs().unix();
        },
    },
    actions: {
        async fetchData(){
            this.loading = true
            try {
                await this._fetchBalance();
                await sleep(1000);
                this.updatedAt = dayjs().unix();
                this.validUntil = dayjs().add(15,'minute').unix();
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async _fetchBalance() {
            this.userAvailableBalance = 0;
            this.userHoldingBalance = 0;
            this.userCreditHoldBalance = 0;
            this.userDebitHoldBalance = 0;
            this.userPLUAvailable = 0;
            this.userPLUPending = 0;
            this.userPLUTotal = 0;
            this.userDebitHoldBalance = 0;
            this.loading = true
            try {
                const [userAvailableBalance, userHoldingBalance, userCreditHoldBalance, userDebitHoldBalance] = await getBalance().then(userBalance => [
                    (userBalance.fiat_balance[0].amount - userBalance.card_transactions_aggregate.aggregate.sum.billing_amount),
                    userBalance.card_transactions_aggregate.aggregate.sum.billing_amount
                ]);
                this.userAvailableBalance = userAvailableBalance;
                this.userHoldingBalance = userHoldingBalance;

                const [amount, available_amount, pending_amount] = await getPlutonBalance().then(plutonBalance => [plutonBalance.amount, plutonBalance.available_amount, (plutonBalance.amount - plutonBalance.available_amount)])
                this.userPLUTotal = amount;
                this.userPLUPending = pending_amount;
                this.userPLUAvailable = available_amount;
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})

export type BalanceStore = ReturnType<typeof balanceStore>