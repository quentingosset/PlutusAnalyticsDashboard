import {defineStore} from 'pinia'
import {getAllStatements} from "../utils/PlutusCall";
import dayjs from "dayjs";
import {StatementsType} from "../utils/StatementsType";

export const statementStore = defineStore({
    id: 'statement',
    state: () => ({
        statements: [],
        loading: false,
        error: null
    }),
    getters:{
        monthlySpend(){
            let monthlySpend = this.statements.filter((value) => {return (dayjs(value.date).isBetween(dayjs().subtract(1, 'month'),dayjs(),null, '[]')
                && !StatementsType.TOP_UP_ACCOUNT.is(value.type)
                && !StatementsType.WITHDRAW_ACCOUNT_TO_CARD.is(value.type)
                && !StatementsType.TOP_UP_CARD.is(value.type)
                && !StatementsType.DEX_BUY.is(value.type)
                && !StatementsType.WITHDRAW_FEE.is(value.type)
                && !StatementsType.BONUS.is(value.type)
                && !StatementsType.REFUNDED.is(value.type)
                && !StatementsType.DECLINED.is(value.type)
            )});
            return monthlySpend.reduce((sum, transaction) => {
                return sum + (transaction.amount / 100);
            },0);
        }
    },
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
        }
    }
})