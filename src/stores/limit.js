import {defineStore} from 'pinia'
import {getSubscription} from "../utils/PlutusCall";
import {statementStore} from "./statement";
import {Subscriptions} from "../utils/type/Subscriptions";
import {LimitType} from "../utils/LimitType";

const storeStatement = statementStore();
export const limitStore = defineStore({
    id: 'limit',
    state: () => ({
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
                this.subscriptionPlan = Subscriptions.init(subscriptionPlan)
                this.subscriptionDesired = Subscriptions.init(subscriptionDesired);
                this.subscriptionEnd = subscriptionEnd;
                this.limitType = LimitType.init(subscriptionPlan);
                this.cashbackLimit = this.subscriptionPlan.maxExpense*(this.subscriptionPlan.percent/100);
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})