import {defineStore} from 'pinia'
import {getAllStatements} from "../utils/PlutusCall";
import {StatementsType} from "../utils/StatementsType";
import {Frequency} from "../utils/Frenquency";
import {toRaw} from "vue";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {sleep} from "../utils/Utils";

dayjs.extend(isBetween);
export const statementStore = defineStore({
    id: 'statement',
    state: () => ({
        statements: [],
        updatedAt : null as undefined | number,
        validUntil : null as undefined | number,
        loading: false,
        error: null
    }),
    getters:{
        shouldRefresh(state): boolean {
            return state.validUntil < dayjs().unix();
        },
    },
    actions: {
        async fetchData(){
            this.loading = true
            try {
                await this._fetchStatements();
                await sleep(1000);
                this.updatedAt = dayjs().unix();
                this.validUntil = dayjs().add(15,'minute').unix();
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async _fetchStatements() {
            this.loading = true
            try {
                this.statements = await getAllStatements().then((response) => response)
                await sleep(1000);
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        spendLimit(limitType){
            switch (toRaw(limitType)){
                case Frequency.DAILY:
                    return this.statements.filter((value) => {return (dayjs(value.date).isBetween(dayjs().subtract(1, 'day'),dayjs(),null, '[]')
                        && !StatementsType.TOP_UP_ACCOUNT.equals(value.type)
                        && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(value.type)
                        && !StatementsType.TOP_UP_CARD.equals(value.type)
                        && !StatementsType.DEX_BUY.equals(value.type)
                        && !StatementsType.WITHDRAW_FEE.equals(value.type)
                        && !StatementsType.BONUS.equals(value.type)
                        && !StatementsType.REFUNDED.equals(value.type)
                        && !StatementsType.DECLINED.equals(value.type)
                    )}).reduce((sum, transaction) => {
                        return sum + (Math.abs(transaction.amount) / 100);
                    },0);
                case Frequency.MONTHLY:
                    return this.statements.filter((value) => {return (dayjs(value.date).isBetween(dayjs().subtract(1, 'month'),dayjs(),null, '[]')
                        && !StatementsType.TOP_UP_ACCOUNT.equals(value.type)
                        && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(value.type)
                        && !StatementsType.TOP_UP_CARD.equals(value.type)
                        && !StatementsType.DEX_BUY.equals(value.type)
                        && !StatementsType.WITHDRAW_FEE.equals(value.type)
                        && !StatementsType.BONUS.equals(value.type)
                        && !StatementsType.REFUNDED.equals(value.type)
                        && !StatementsType.DECLINED.equals(value.type)
                    )}).reduce((sum, transaction) => {
                        return sum + (Math.abs(transaction.amount) / 100);
                    },0);
                case Frequency.YEARLY:
                    return this.statements.filter((value) => {return (dayjs(value.date).isBetween(dayjs().subtract(1, 'year'),dayjs(),null, '[]')
                        && !StatementsType.TOP_UP_ACCOUNT.equals(value.type)
                        && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(value.type)
                        && !StatementsType.TOP_UP_CARD.equals(value.type)
                        && !StatementsType.DEX_BUY.equals(value.type)
                        && !StatementsType.WITHDRAW_FEE.equals(value.type)
                        && !StatementsType.BONUS.equals(value.type)
                        && !StatementsType.REFUNDED.equals(value.type)
                        && !StatementsType.DECLINED.equals(value.type)
                    )}).reduce((sum, transaction) => {
                        return sum + (Math.abs(transaction.amount) / 100);
                    },0);
                case Frequency.YEARLY_CASHBACK:
                    return this.statements.filter((value) => {
                        return (dayjs(value.date).isBetween(dayjs().subtract(1, 'year'),dayjs(),null, '[]')
                        && !StatementsType.TOP_UP_ACCOUNT.equals(value.type)
                        && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(value.type)
                        && !StatementsType.TOP_UP_CARD.equals(value.type)
                        && !StatementsType.DEX_BUY.equals(value.type)
                        && !StatementsType.WITHDRAW_FEE.equals(value.type)
                        && !StatementsType.BONUS.equals(value.type)
                        && !StatementsType.REFUNDED.equals(value.type)
                        && !StatementsType.DECLINED.equals(value.type)
                        && value.cashback.length !== 0
                    )}).reduce((sum, transaction) => {
                        return sum + (Math.abs(transaction.amount) / 100);
                    },0);
            }
        },
    }
})

export type StatementStore = ReturnType<typeof statementStore>