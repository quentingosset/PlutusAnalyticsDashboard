import {defineStore} from 'pinia'
import {getStaking, getTiers} from "../utils/PlutusCall";
import {Tiers} from "../utils/type/Tiers";
import * as dayjs from "dayjs";


export const stakingStore = defineStore({
    id: 'staking',
    state: () => ({
        levels: null as undefined | Tiers[],
        currentLevel: null as undefined | Tiers,
        percentToNextLevel: 0 as number,
        pluToNextLevel: 0 as number,
        totalStaked: 0 as number,
        externalStaked: 0 as number,
        isMaxStakingLevel: false as boolean,
        loading: false as boolean,
        error: null
    }),
    getters: {},
    actions: {
        async fetchData(){
            this.loading = true
            try {
                await this._fetchLevels();
                await this._fetchStaking();
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async _fetchLevels() {
            try {
                const [levels] = await getTiers().then(stakings => [stakings.map(staking => new Tiers(staking.id,staking.label,staking.threshold,staking.additionalPercentage,staking.additionalPerks, staking.isActiveLevel?? false))])
                this.levels = levels;
                this.currentLevel = levels.find((level) => level.isActiveLevel === true);
            } catch (error) {
                this.error = error
            }
        },
        async _fetchStaking() {
            try {
                const [percentToNextLevel,pluToNextLevel,totalStaked,externalStaked,isMaxStakingLevel] = await getStaking().then(staking => [staking.percentToNextLevel,staking.pluToNextLevel,staking.totalStaked, staking.externalStaked, staking.isMaxStakingLevel]);
                this.percentToNextLevel = percentToNextLevel;
                this.pluToNextLevel = pluToNextLevel;
                this.totalStaked = totalStaked;
                this.externalStaked = externalStaked;
                this.isMaxStakingLevel = isMaxStakingLevel;
            } catch (error) {
                this.error = error
            }
        },
    },
})

export type StakingStore = ReturnType<typeof stakingStore>