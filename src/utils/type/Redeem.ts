export class Redeem {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _price: number;
    private readonly _rewardLimit: number;
    private readonly _available: boolean;
    private _active: boolean | null;
    private _createdAt: string | null;
    constructor(id: string, name: string, price: number, rewardLimit: number, available: boolean, active: boolean | null ,createdAt: string | null) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._rewardLimit = rewardLimit;
        this._available = available;
        this._active = active;
        this._createdAt = createdAt;
    }
    is (redeemToCheck: string): boolean {
        return redeemToCheck === this._id;
    };

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get rewardLimit() {
        return this._rewardLimit;
    }

    get available() {
        return this._available;
    }

    get active() {
        return this._active;
    }

    get createdAt() {
        return this._createdAt;
    }

    set active(active: boolean){
        this._active = active;
    }

    set createdAt(createdAt: string){
        this._createdAt = createdAt;
    }
}