export class Frequency {
    static DAILY = new Frequency('DAILY');
    static WEEKLY = new Frequency('WEEKLY');
    static MONTHLY = new Frequency('MONTHLY');
    static YEARLY = new Frequency('YEARLY');

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

}