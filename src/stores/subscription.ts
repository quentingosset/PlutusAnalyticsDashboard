import {defineStore} from 'pinia'
import {getSubscription,getSubscriptions} from "../utils/PlutusCall";
import {Subscriptions} from "../utils/type/Subscriptions";
import {LimitType} from "../utils/LimitType";
import {limitStore} from "./limit";
import {sleep} from "../utils/Utils";
import dayjs from "dayjs";

export const subscriptionStore = defineStore({
    id: 'subscription',
    state: () => ({
        subscriptions: null as undefined | Subscriptions[],
        subscriptionPlan: null as undefined | Subscriptions,
        subscriptionDesired: null as undefined | Subscriptions,
        subscriptionEnd: null as undefined | string,
        cashbackLimit: null,
        updatedAt : null as undefined | number,
        validUntil : null as undefined | number,
        loading : false as boolean,
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
                await this._fetchSubscrtiptions();
                await this._fetchSubscription();
                await sleep(1000);
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
                this.updatedAt = dayjs().unix();
                this.validUntil = dayjs().add(15,'minute').unix();
            }
        },
        async _fetchSubscrtiptions() {
            try {
                // @ts-ignore
                const [subscriptions] = await getSubscriptions().then(subscriptions => [Object.values(subscriptions).map(subscription => new Subscriptions(subscription.id, subscription.plan, subscription.monthlyFee, subscription.rewardPercentage, subscription.rewardCap, subscription.perks))]);
                this.subscriptions = subscriptions;
            } catch (error) {
                this.error = error
            }
        },
        async _fetchSubscription() {
            const storeLimit = limitStore();
            try {
                const [subscriptionPlan, subscriptionDesired, subscriptionEnd] = await getSubscription().then(subscription => [subscription.plan, subscription.desired_plan ,subscription.end]);
                this.subscriptionPlan = this.subscriptions.find((subscription) => subscription.name === subscriptionPlan)
                this.subscriptionDesired = this.subscriptions.find((subscription) => subscription.name === subscriptionDesired)
                this.subscriptionEnd = subscriptionEnd;
                storeLimit.limitType = LimitType.init(subscriptionPlan);
            } catch (error) {
                this.error = error
            }
        }
    }
})

export type SubscriptionStore = ReturnType<typeof subscriptionStore>