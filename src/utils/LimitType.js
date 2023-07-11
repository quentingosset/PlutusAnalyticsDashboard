import {Frequency} from "./Frenquency";

export class LimitType {
    // TODO TOUT MODIFIER ICI POUR GERER LES LIMITE : https://plutus.it/fees
    static DAILY_SPEND_STARTER = new LimitType('DAILY_SPEND',Frequency.DAILY,2300);
    static WEEKLY_SPEND_STARTER = new LimitType('WEEKLY_SPEND',Frequency.WEEKLY,2500);
    static MONTHLY_SPEND_STARTER = new LimitType('MONTHLY_SPEND',Frequency.MONTHLY,4000);
    static YEARLY_SPEND_STARTER = new LimitType('YEARLY_SPEND',Frequency.YEARLY,50000);

    static DAILY_SPEND_EVERYDAY = new LimitType('DAILY_SPEND',Frequency.DAILY,5200);
    static WEEKLY_SPEND_EVERYDAY = new LimitType('WEEKLY_SPEND',Frequency.WEEKLY,9100);
    static MONTHLY_SPEND_EVERYDAY = new LimitType('MONTHLY_SPEND',Frequency.MONTHLY,14000);
    static YEARLY_SPEND_EVERYDAY = new LimitType('YEARLY_SPEND',Frequency.YEARLY,100000);

    static DAILY_SPEND_PREMIUM = new LimitType('DAILY_SPEND',Frequency.DAILY,7200);
    static WEEKLY_SPEND_PREMIUM = new LimitType('WEEKLY_SPEND',Frequency.WEEKLY,14100);
    static MONTHLY_SPEND_PREMIUM = new LimitType('MONTHLY_SPEND',Frequency.MONTHLY,20000);
    static YEARLY_SPEND_PREMIUM = new LimitType('YEARLY_SPEND',Frequency.YEARLY,100000);

    constructor(name,frequency,limit) {
        this._name = name;
        this._frequency = frequency;
        this._limit = limit;
    }

    static init(subscriptionType) {
        if(subscriptionType === "starter"){
            return [this.DAILY_SPEND_STARTER,this.WEEKLY_SPEND_STARTER,this.MONTHLY_SPEND_STARTER,this.YEARLY_SPEND_STARTER];
        } else if (subscriptionType === "everyday") {
            return [this.DAILY_SPEND_EVERYDAY,this.WEEKLY_SPEND_EVERYDAY,this.MONTHLY_SPEND_EVERYDAY,this.YEARLY_SPEND_EVERYDAY];
        } else if (subscriptionType === "premium") {
            return [this.DAILY_SPEND_PREMIUM,this.WEEKLY_SPEND_PREMIUM,this.MONTHLY_SPEND_PREMIUM,this.YEARLY_SPEND_PREMIUM];
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