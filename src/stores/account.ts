import {defineStore} from 'pinia'
import {StakingStore, stakingStore} from "./staking";
import {SubscriptionStore, subscriptionStore} from "./subscription";
import {redeemStore, RedeemStore} from "./redeem";
import {perkStore, PerkStore} from "./perk";
import {statementStore, StatementStore} from "./statement";
import {balanceStore, BalanceStore} from "./balance";

export const accountStore = defineStore({
    id: 'account',
    state: () => ({
        lastUpdate: 0 as number,
        loading: false as boolean,
        error: null
    }),
    getters: {
        staking(): StakingStore{
            return stakingStore();
        },
        subscription(): SubscriptionStore{
            return subscriptionStore();
        },
        redeem(): RedeemStore{
            return redeemStore();
        },
        perks(): PerkStore{
            return perkStore();
        },
        statements(): StatementStore{
            return statementStore();
        },
        balance(): BalanceStore{
            return balanceStore();
        },
        totalPerks(): number{
            return (stakingStore().currentLevel?.perk??0) + (subscriptionStore().subscriptionPlan?.perk??0);
        },
        maxCashback(): number{
            return (stakingStore().currentLevel?.percent??0) + (subscriptionStore().subscriptionPlan?.percent??0);
        },
        maxSpending(): number{
            return (subscriptionStore().subscriptionPlan?.maxExpense??0) + (redeemStore().currentRedeem?.rewardLimit??0);
        },
        maxEarning(): any{
            return (this.maxSpending??0) * (this.maxCashback/100);
        },
        shouldRefreshAll(): boolean { // ONLY FOR THE INITT
            return stakingStore().shouldRefresh
                || subscriptionStore().shouldRefresh
                || redeemStore().shouldRefresh
                || statementStore().shouldRefresh
                || balanceStore().shouldRefresh;
        },
    },
    actions: {
        async initData(){
            if(this.shouldRefreshAll){
                this.loading = true;
                Promise.all([
                    await this._fetchBalance(),
                    await this._fetchStaking(),
                    await this._fetchSubscription(),
                    await this._fetchRedeem(),
                    await this._fetchPerk(),
                    await this._fetchStatements()
                ]).finally(() => {
                    this.loading = false;
                });
            }
        },
        async _fetchStaking(){
            const storePerk: StakingStore = stakingStore();
            await storePerk.fetchData();
            console.log("_fetchStaking")
        },
        async _fetchSubscription(){
            const storeSubscription: SubscriptionStore = subscriptionStore();
            await storeSubscription.fetchData();
            console.log("_fetchSubscription")
        },
        async _fetchRedeem(){
            const storeRedeem: RedeemStore = redeemStore();
            await storeRedeem.fetchData();
            console.log("_fetchRedeem")
        },
        async _fetchPerk(){
            const storePerk: PerkStore = perkStore();
            await storePerk.fetchData();
            console.log("_fetchPerk")
        },
        async _fetchStatements(){
            const storeStatement: StatementStore = statementStore();
            await storeStatement.fetchData();
            console.log("_fetchStatements")
        },
        async _fetchBalance(){
            const storeBalance: BalanceStore = balanceStore();
            await storeBalance.fetchData();
            console.log("_fetchBalance")
        }
    }
})

export type AccountStore = ReturnType<typeof accountStore>