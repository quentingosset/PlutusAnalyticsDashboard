import {defineStore} from 'pinia'
import {getSubscription} from "../utils/PlutusCall";
import {SubscriptionType} from "../utils/SubscriptionType";

export const subscriptionStore = defineStore({
    id: 'subscription',
    state: () => ({
        subscriptionPlan: null,
        subscriptionDesired: null,
        subscriptionEnd: null,
        cashbackLimit: null,
        limitType: null,

        loading: false,
        error: null
    }),
    getters: {
    },
    actions: {
        async fetchSubscription() {
            this.loading = true
            try {
                const [subscriptionPlan, subscriptionDesired, subscriptionEnd] = await getSubscription().then(subscription => [subscription.plan, subscription.desired_plan ,subscription.ends_on]);
                this.subscriptionPlan = SubscriptionType.init(subscriptionPlan)
                this.subscriptionDesired = SubscriptionType.init(subscriptionDesired);
                this.subscriptionEnd = subscriptionEnd;
                this.limitType = null; // TODO LimitType.init(subscriptionPlan);
                this.cashbackLimit = this.subscriptionPlan.maxExpense*(this.subscriptionPlan.percent/100);
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})