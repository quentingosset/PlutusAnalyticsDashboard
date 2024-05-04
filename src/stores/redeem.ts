import {defineStore} from 'pinia'
import {getRedeem} from "../utils/PlutusCall";
import {Redeem} from "../utils/type/Redeem";
import {RedeemChoice} from "../utils/enum/Redeem";
import {sleep} from "../utils/Utils";
import dayjs from "dayjs";

export const redeemStore = defineStore({
    id: 'redeem',
    state: () => ({
        redeemLevel: null as undefined | Redeem[],
        currentRedeem: null as undefined | Redeem,
        redeemHistory: null as undefined | Redeem[],
        updatedAt : null as undefined | number,
        validUntil : null as undefined | number,
        loading: false as boolean,
        error: null
    }),
    getters: {
        shouldRefresh(state): boolean {
            return state.validUntil < dayjs().unix();
        },
    },
    actions: {
        async fetchData(){
            this.loading = true
            try {
                await this._fetchRedeemLevels();
                await this._fetchRedeem();
                await sleep(1000);
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
                this.updatedAt = dayjs().unix();
                this.validUntil = dayjs().add(15,'minute').unix();
            }
        },
        async _fetchRedeemLevels() {
            try {
                // @ts-ignore
                const [redeemLevel] = await getRedeem(RedeemChoice.LEVEL).then(levels => [Object.values(levels).map(level => new Redeem(level.id, level.name, +level.amount, +level.reward_limit, level.available))]);
                this.redeemLevel = redeemLevel;
            } catch (error) {
                this.error = error
            }
        },
        async _fetchRedeem() {
            try {
                // @ts-ignore
                const [redeemLevelId,redeemCreatedAt] = await getRedeem(RedeemChoice.ACTIVE).then(redeem => [redeem.level_id, redeem.created_at]);
                this.currentRedeem = this.redeemLevel.find((redeemLevel) => redeemLevel.id === redeemLevelId);
                this.currentRedeem.active = true;
                this.currentRedeem.createdAt = redeemCreatedAt;
            } catch (error) {
                this.error = error
            }
        }
    }
})

export type RedeemStore = ReturnType<typeof redeemStore>