import {defineStore} from 'pinia'
import {getPlutusCard, getPlutusCardV3} from "../utils/PlutusCall";

export const cardStore = defineStore({
    id: 'card',
    state: () => ({
        userCardStatus: null,
        cardNumber: null,
        cardExpiration: null,
        cardType: null,
        loading: false,
        error: null
    }),
    getters: {
    },
    actions: {
        async fetchCard() {
            this.loading = true
            try {
                const [userCardStatus, cardNumber, cardExpiration, cardType] = await getPlutusCard().then(userCard => [userCard.status, userCard.card_number, userCard.expiry_date.substring(0, userCard.expiry_date.length - 2) + "/" + userCard.expiry_date.substring(userCard.expiry_date.length - 2)], 'PHYSICAL');
                const [userCardStatusV3, cardNumberV3, cardExpirationV3, cardTypeV3] = await getPlutusCardV3().then(userCard => [userCard.cardStatus, userCard.maskedPan, userCard.expiryDate, userCard.cardType]);
                this.userCardStatus = userCardStatusV3?? userCardStatus;
                this.cardNumber = cardNumberV3?? cardNumber;
                this.cardExpiration = cardExpirationV3?? cardExpiration;
                this.cardType = cardTypeV3?? cardType;
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})