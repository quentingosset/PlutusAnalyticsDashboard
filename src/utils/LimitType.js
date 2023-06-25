export class LimitType {
    // TODO TOUT MODIFIER ICI POUR GERER LES LIMITE : https://plutus.it/fees
    static STARTER = new SubscriptionType('starter',0, 3,250,1,1);
    static EVERYDAY = new SubscriptionType('everyday',4.99, 3,2000,2,0);
    static PREMIUM = new SubscriptionType('premium',14.99, 3,22500,3,0);

    constructor(name,amount,percent,maxExpense,perk,dexPercent) {
        this._name = name;
        this._amount = amount;
        this._percent = percent;
        this._maxExpense = maxExpense;
        this._perk = perk;
        this._dexPercent = dexPercent;
    }

    static init(subscriptionType) {
        if(subscriptionType === "starter"){
            return this.STARTER;
        } else if (subscriptionType === "everyday") {
            return this.EVERYDAY;
        } else if (subscriptionType === "premium") {
            return this.PREMIUM;
        }
    }

    get name() {
        return this._name;
    }

    get amount() {
        return this._amount;
    }

    get percent() {
        return this._percent;
    }

    get maxExpense() {
        return this._maxExpense;
    }

    get perk() {
        return this._perk;
    }

    get dexPercent() {
        return this._dexPercent;
    }
}