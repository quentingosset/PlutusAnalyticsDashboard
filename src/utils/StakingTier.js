export class StakingTier {
    static FREE = new StakingTier(0,"Free", 0,3);
    static HERO = new StakingTier(1,"Hero", 4,4);
    static VETERAN = new StakingTier(2,"Veteran", 5,5);
    static LEGEND = new StakingTier(3,"Legend", 6,6);
    static GOAT = new StakingTier(4,"G.O.A.T", 8,8);

    constructor(level, name, percent, perk) {
        this._level = level;
        this._name = name;
        this._percent = percent;
        this._perk = perk;
    }

    static init(stakingLevel) {
        if(stakingLevel === 1){
            return this.HERO;
        } else if (stakingLevel === 2) {
            return this.VETERAN;
        } else if (stakingLevel === 3) {
            return this.LEGEND;
        } else if (stakingLevel === 4) {
            return this.GOAT;
        }
        return this.FREE;
    }

    is (stakingTierToCheck) {
        return stakingTierToCheck === this._level;
    };

    get level() {
        return this._level;
    }

    get name() {
        return this._name;
    }

    get percent() {
        return this._percent;
    }

    get perk() {
        return this._perk;
    }
}