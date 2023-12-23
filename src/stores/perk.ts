import {defineStore} from 'pinia'
import {getAllPerks, getUserPerks} from "../utils/PlutusCall";
import * as dayjs from "dayjs";
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import {rewardStore} from "./reward";
import {mergeArrays} from "../utils/Utils";

const storeReward = rewardStore();
export const perkStore = defineStore({
    id: 'perk',
    state: () => ({
        perks: [],
        listPerks: [],
        perksGranted: 0,
        perksNextMonth: 0,
        availablePerks: 0,
        loading: true as boolean,
        error: null
    }),
    getters: {
        unusedPerks(): number{
            return this.perksGranted - this.availablePerks;
        },
        /*usedPerksList(){
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
        },*/
        currentMonthPerks(){
            return mergeArrays(this.listPerks?? [],this.perks?? [],'id');
        },
        nextMonthPerks(){
            return mergeArrays(this.listPerks,this.perksNextMonth,'id');
        }
    },
    actions: {
        async fetchData(){
            this.loading = true
            try {
                await this._fetchUsersPerks();
                await this._fetchAllPerks();
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async _fetchUsersPerks() {
            this.loading = true
            try {
                const [availablePerks, perks, perksGranted, perksNextMonth] = await getUserPerks().then(userPerks => [userPerks.available, userPerks.perks, userPerks.total_perks_granted, userPerks.next_month_perks]);
                this.availablePerks = availablePerks
                this.perks = perks
                this.perksGranted = perksGranted
                this.perksNextMonth = perksNextMonth
                //storeSubscription.cashbackLimit = storeSubscription.subscriptionPlan.maxExpense*(stakingLevel.percent/100)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async _fetchAllPerks(){
            this.loading = true
            try {
                this.listPerks = await getAllPerks().then(userPerks => userPerks);
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})

export type PerkStore = ReturnType<typeof perkStore>