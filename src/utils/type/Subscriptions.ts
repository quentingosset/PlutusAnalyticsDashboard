export class Subscriptions {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _amount: number;
    private readonly _percent: number;
    private readonly _maxExpense: number;
    private readonly _perk: number;
    private readonly _dexPercent: number;

    constructor(id: string, name: string, amount: number, percent: number, maxExpense: number, perk: number/*, dexPercent: number*/) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._percent = percent;
        this._maxExpense = maxExpense;
        this._perk = perk;
        //this._dexPercent = dexPercent;
    }
    is (subscriptionToCheck: string): boolean {
        return subscriptionToCheck === this._name;
    };

    get id() {
        return this._id;
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