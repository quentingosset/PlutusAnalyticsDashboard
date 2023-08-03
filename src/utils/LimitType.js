import {Frequency} from "./Frenquency";

export class LimitType {
    // TODO TOUT MODIFIER ICI POUR GERER LES LIMITE : https://plutus.it/fees
    static DAILY_SPEND = new LimitType('DAILY_SPEND',Frequency.DAILY,500000);
    static MONTHLY_SPEND = new LimitType('MONTHLY_SPEND',Frequency.MONTHLY,1000000);
    static YEARLY_SPEND = new LimitType('YEARLY_SPEND',Frequency.YEARLY,12000000);

    static YEARLY_CASHBACK_STARTER = new LimitType('YEARLY_CASHBACK',Frequency.YEARLY_CASHBACK,3000);
    static YEARLY_CASHBACK_EVERYDAY = new LimitType('YEARLY_CASHBACK',Frequency.YEARLY_CASHBACK,24000);
    static YEARLY_CASHBACK_PREMIUM = new LimitType('YEARLY_CASHBACK',Frequency.YEARLY_CASHBACK,100000);

    constructor(name,frequency,limit) {
        this._name = name;
        this._frequency = frequency;
        this._limit = limit;
    }

    static init(subscriptionType) {
        let limit = [this.DAILY_SPEND,this.MONTHLY_SPEND,this.YEARLY_SPEND];
        if(subscriptionType === "starter"){
            limit.push(this.YEARLY_CASHBACK_STARTER);
            return limit;
        } else if (subscriptionType === "everyday") {
            limit.push(this.YEARLY_CASHBACK_EVERYDAY);
            return limit;
        } else if (subscriptionType === "premium") {
            limit.push(this.YEARLY_CASHBACK_PREMIUM);
            return limit;
        }
    }

    get name() {
        return this._name;
    }

    get frequency() {
        return this._frequency;
    }

    get limit() {
        return this._limit;
    }

}