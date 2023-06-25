import {defineStore} from 'pinia'
import {getPlutusCard} from "../utils/PlutusCall";

export const cardStore = defineStore({
    id: 'card',
    state: () => ({
        userCardStatus: null,
        cardNumber: null,
        cardExpiration: null,
        loading: false,
        error: null
    }),
    getters: {
    },
    actions: {
        async fetchCard() {
            this.loading = true
            try {
                const [userCardStatus, cardNumber, cardExpiration] = await getPlutusCard().then(userCard => [userCard.status, userCard.card_number, userCard.expiry_date.substring(0, userCard.expiry_date.length - 2) + "/" + userCard.expiry_date.substring(userCard.expiry_date.length - 2)]);
                this.userCardStatus = userCardStatus;
                this.cardNumber = cardNumber;
                this.cardExpiration = cardExpiration;
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})