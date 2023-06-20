export class ReportsType {
    static STATEMENTS = new ReportsType("STATEMENTS");
    static REWARDS = new ReportsType("REWARDS");
    static WITHDRAWALS = new ReportsType("WITHDRAWALS");

    constructor(name) {
        this._name = name;
    }

    is (reportType) {
        return reportType === this._name;
    };

    get name() {
        return this._name;
    }
}
