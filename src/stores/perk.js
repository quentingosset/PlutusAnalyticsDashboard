import {defineStore} from 'pinia'
import {getUserPerks} from "../utils/PlutusCall";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {StakingTier} from "../utils/StakingTier";
import {rewardStore} from "./reward";
import {subscriptionStore} from "./subscription";

const storeReward = rewardStore();
const storeSubscription = subscriptionStore();
export const perkStore = defineStore({
    id: 'perk',
    state: () => ({
        perks: [],
        perksGranted: null,
        stakingLevel: null,
        perksNextMonth: null,
        loading: false,
        error: null
    }),
    getters: {
        usedPerks(){
            dayjs.extend(isSameOrAfter);
            const isPerkTransaction = transaction => dayjs(transaction.createdAt).isSameOrAfter(dayjs().startOf('month'),'month') && transaction.reference_type.indexOf('perk') >= 0;

            const perkTransactionsOfCurrentMonth = storeReward.rewards.filter(isPerkTransaction);
            const isUsedPerk = (transaction, perk) => transaction.reference_type === `perk_${perk.id}_reward`;

            return this.perks.filter(perk => perkTransactionsOfCurrentMonth.some(transaction => isUsedPerk(transaction, perk)));
        },
        unusedPerks(){
            dayjs.extend(isSameOrAfter);
            const isPerkTransaction = transaction => dayjs(transaction.createdAt).isSameOrAfter(dayjs().startOf('month'),'month') && transaction.reference_type.indexOf('perk') >= 0;

            const perkTransactionsOfCurrentMonth = storeReward.rewards.filter(isPerkTransaction);
            const isUsedPerk = (transaction, perk) => transaction.reference_type === `perk_${perk.id}_reward`;
            return this.perks.value.filter(perk => perkTransactionsOfCurrentMonth.every(transaction => !isUsedPerk(transaction, perk)));
        }
    },
    actions: {
        async fetchUsersPerks() {
            this.loading = true
            try {
                const [perks, perksGranted, stakingLevel, perksNextMonth] = await getUserPerks().then(userPerks => [userPerks.perks, userPerks.total_perks_granted, StakingTier.init(userPerks.staking_level), userPerks.next_month_perks]);
                this.perks = perks
                this.perksGranted = perksGranted
                this.stakingLevel = stakingLevel
                this.perksNextMonth = perksNextMonth
                storeSubscription.cashbackLimit.value = storeSubscription.subscriptionPlan.maxExpense.value*(stakingLevel.value._percent/100)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})