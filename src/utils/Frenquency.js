export class Frequency {
    static DAILY = new Frequency('DAILY');
    static WEEKLY = new Frequency('WEEKLY');
    static MONTHLY = new Frequency('MONTHLY');
    static YEARLY = new Frequency('YEARLY');
    static YEARLY_CASHBACK = new Frequency('YEARLY_CASHBACK');

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

}