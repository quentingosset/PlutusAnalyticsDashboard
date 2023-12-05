export class StakingTier {
    static FREE = new StakingTier(0,"Free", 3,1);
    static HERO = new StakingTier(1,"Hero", 4,4);
    static VETERAN = new StakingTier(2,"Veteran", 5,5);
    static MYTH = new StakingTier(4,"Myth", 7,7);
    static GOAT = new StakingTier(5,"G.O.A.T", 8,8);
    static HB = new StakingTier(6,"Honey Badger", 9,9);

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
            return this.MYTH;
        } else if (stakingLevel === 5) {
            return this.GOAT;
        } else if (stakingLevel === 6) {
            return this.HB;
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