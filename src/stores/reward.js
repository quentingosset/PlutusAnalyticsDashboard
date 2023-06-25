import {defineStore} from 'pinia'
import {getRewards} from "../utils/PlutusCall";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

export const rewardStore = defineStore({
    id: 'reward',
    state: () => ({
        rewards: [],
        loading: false,
        error: null
    }),
    getters: {
        monthlyReward(){
            dayjs.extend(isSameOrAfter);
            const isCurrentMonthTransaction = transaction => dayjs(transaction.createdAt).isSameOrAfter(dayjs(),'month');
            const rewardTransactionsOfCurrentMonth = this.rewards.filter(isCurrentMonthTransaction);
            return rewardTransactionsOfCurrentMonth.reduce((sum, cashback) => {
                return sum + ((cashback.fiat_amount_rewarded / 100) * (cashback.rebate_rate / 100));
            },0);
        }
    },
    actions: {
        async fetchRewards() {
            this.rewards = []
            this.loading = true
            try {
                this.rewards = await getRewards().then((response) => response)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})