import {defineStore} from 'pinia'
import {getAllStatements} from "../utils/PlutusCall";
import dayjs from "dayjs";
import {StatementsType} from "../utils/StatementsType";
import {Frequency} from "../utils/Frenquency";
import {toRaw} from "vue";

export const statementStore = defineStore({
    id: 'statement',
    state: () => ({
        statements: [],
        loading: false,
        error: null
    }),
    getters:{},
    actions: {
        async fetchStatements() {
            this.statements = []
            this.loading = true
            try {
                this.statements = await getAllStatements().then((response) => response)
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
                        return sum + (transaction.amount / 100);
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
                        return sum + (transaction.amount / 100);
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
                        return sum + (transaction.amount / 100);
                    },0);
                case Frequency.YEARLY_CASHBACK:
                    console.log(this.statements.filter((value) => {
                    return (dayjs(value.date).isBetween(dayjs().subtract(1, 'year'),dayjs(),null, '[]')
                        && !StatementsType.TOP_UP_ACCOUNT.equals(value.type)
                        && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.equals(value.type)
                        && !StatementsType.TOP_UP_CARD.equals(value.type)
                        && !StatementsType.DEX_BUY.equals(value.type)
                        && !StatementsType.WITHDRAW_FEE.equals(value.type)
                        && !StatementsType.BONUS.equals(value.type)
                        && !StatementsType.REFUNDED.equals(value.type)
                        && !StatementsType.DECLINED.equals(value.type)
                        && value.cashback.length === 0
                    )}));
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
                        return sum + (transaction.amount / 100);
                    },0);
            }
        },
    }
})