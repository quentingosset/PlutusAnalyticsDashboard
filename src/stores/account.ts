import {defineStore} from 'pinia'
import {StakingStore, stakingStore} from "./staking";
import * as dayjs from "dayjs";
import {SubscriptionStore, subscriptionStore} from "./subscription";
import {redeemStore, RedeemStore} from "./redeem";
import {perkStore, PerkStore} from "./perk";

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
        }
    },
    actions: {
        async fetchData(){
            /*let now: number = dayjs().unix();
            if(!this.loading && !dayjs.unix(now).isAfter(dayjs.unix(this.lastUpdate).add(5, 'seconds'))){
                return;
            }*/
            this.loading = true;
            Promise.all([this._fetchStaking(),this._fetchSubscription(), this._fetchRedeem(), this._fetchPerk()]).finally(() => {
                //this.lastUpdate = now;
                this.loading = false;
            });
        },
        async _fetchStaking(){
            const storePerk: StakingStore = stakingStore();
            await storePerk.fetchData();
        },
        async _fetchSubscription(){
            const storeSubscription: SubscriptionStore = subscriptionStore();
            await storeSubscription.fetchData();
        },
        async _fetchRedeem(){
            const storeRedeem: RedeemStore = redeemStore();
            await storeRedeem.fetchData();
        },
        async _fetchPerk(){
            const storePerk: PerkStore = perkStore();
            await storePerk.fetchData();
        }
    }
})

export type AccountStore = ReturnType<typeof accountStore>