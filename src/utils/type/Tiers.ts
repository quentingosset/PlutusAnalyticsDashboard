export class Tiers {
    private readonly _level: number;
    private readonly _name: string;
    private readonly _required: number;
    private readonly _percent: number;
    private readonly _perk: number;
    private readonly _isActiveLevel: boolean;

    constructor(level: number, name: string, required: number, percent: number, perk: number, isActiveLevel: boolean) {
        this._level = level;
        this._name = name;
        this._required = required;
        this._percent = percent;
        this._perk = perk;
        this._isActiveLevel = isActiveLevel;
    }
    is (tierToCheck: number): boolean {
        return tierToCheck === this._level;
    };
    get level(): number {
        return this._level;
    }
    get name(): string {
        return this._name;
    }
    get required(): number {
        return this._required;
    }
    get percent(): number {
        return this._percent;
    }
    get perk(): number {
        return this._perk;
    }
    get isActiveLevel(): boolean {
        return this._isActiveLevel;
    }
}