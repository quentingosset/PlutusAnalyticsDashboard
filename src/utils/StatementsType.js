import Image29 from "../images/icon-29.svg";
import ImageDepositFundsReceived from "../images/icon-FUNDS_RECEIVED.svg";
import ImageDeclined from "../images/icon-DECLINED.svg";
import ImageShop from "../images/icon-SHOP.svg";
import ImageMetalCardWithdraw from "../images/icon-metal_card_withdraw.svg";
import ImageGift from "../images/icon-GIFT.svg";
import ImageRefresh from "../images/icon-WITHDRAW_FEE.svg";
import ImageWithdrawAccount from "../images/icon-WITHDRAW_ACCOUNT.svg";
import _ from "lodash";

export class StatementsType {
    static TOP_UP_ACCOUNT = new StatementsType("TOP_UP_ACCOUNT",["DEPOSIT_FUNDS_RECEIVED"],ImageDepositFundsReceived);
    static WITHDRAW_ACCOUNT_TO_CARD = new StatementsType("WITHDRAW_ACCOUNT_TO_CARD", ["LOAD_PLUTUS_CARD_FROM_CJ_WALLET","LOAD_PLUTUS_CARD_FROM_WALLET"],ImageWithdrawAccount);
    static TOP_UP_CARD = new StatementsType("TOP_UP_CARD", ["29"],Image29);
    static DEX_BUY = new StatementsType("DEX_BUY", ["ORDER_FULFILLED"],ImageRefresh);
    static WITHDRAW_FEE = new StatementsType("WITHDRAW_FEE", ["PLUTUS_WALLET_WITHDRAW_FEE"],ImageRefresh);
    static BONUS = new StatementsType("BONUS", ["REBATE_BONUS"],ImageGift);
    static REFUNDED = new StatementsType("REFUNDED", ["35","45","CARD_REFUND"],ImageRefresh);
    static DECLINED = new StatementsType("DECLINED", ["5"],ImageDeclined);
    static IN_VALIDATION = new StatementsType("IN_VALIDATION", ["0","AUTHORISATION"],ImageShop);
    static COMPLETED = new StatementsType("COMPLETED", ["31","CARD_SETTLEMENT"],ImageShop);
    static REWARDED = new StatementsType("REWARDED", ["31","CARD_SETTLEMENT"],ImageShop);
    static PENDING = new StatementsType("PENDING", ["31","CARD_SETTLEMENT"],ImageShop);
    static NO_REWARD = new StatementsType("NO_REWARD", ["31","CARD_SETTLEMENT"],ImageShop);
    static REJECTED = new StatementsType("REJECTED", [],ImageShop);
    static PLUTUS_METAL_CHARGE = new StatementsType("PLUTUS_METAL_CHARGE", ["PLUTUS_METAL_CHARGE"],ImageMetalCardWithdraw);

    constructor(name, statementType, icon) {
        this._statementType = statementType;
        this._icon = icon;
        this._name = name;
    }

    is (statementToCheck) {
        return this._statementType.some(item => statementToCheck.includes(item));
    };

    equals (other) {
        return _.isEqual(this,other);
    }

    get name() {
        return this._name;
    }

    get statementType() {
        return this._statementType;
    }

    get icon() {
        return this._icon;
    }

}