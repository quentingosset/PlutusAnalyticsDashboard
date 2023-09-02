import rewards from '../data/rewards.json';
import cards from '../data/cards.json';
import cardsV3 from '../data/cardsv3.json';
import subscription from '../data/subscription.json';
import statements from '../data/statements.json';
import statementsV2 from '../data/statementsV2.json';
import withdrawals from '../data/withdrawals.json';
import balance from '../data/balance.json';
import userPerk from '../data/UserPerk.json';
import perks from '../data/perks.json';
import profile from '../data/profile.json';
import {StatementsType} from "./StatementsType";
import _ from 'lodash';
import dayjs from "dayjs";
import {formatCurrency} from "./Utils";

export async function getRewards() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/platform/transactions/pluton", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(rewards);
    }
}

export async function getPlutusCard() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        header.append("Content-Type", "application/json");

        var payload = "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  plutus_cards(limit: 1, order_by: {created_at: desc}) {\\n    id\\n    user_id\\n    card_number\\n    contis_consumer {\\n      id\\n      currency\\n      balance\\n      status\\n      created_at\\n      __typename\\n    }\\n    created_at\\n    updated_at\\n    issued\\n    status\\n    expiry_date\\n    __typename\\n  }\\n}\\n\"}";

        var requestOptions = {
            method: 'POST',
            headers: header,
            body: payload,
            redirect: 'follow'
        };

        return await fetch("https://hasura.plutus.it/v1alpha1/graphql", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.data.plutus_cards[0];
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(cards.plutus_cards[0]);
    }
}

export async function getPlutusCardV3() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));

        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/v3/cards", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.data[0];
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(cardsV3.data[0]);
    }
}

export async function getStatements() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        header.append("Content-Type", "application/json");

        var payload = "{\"operationName\":\"transactions_view\",\"variables\":{\"offset\":0,\"limit\":null,\"from\":null,\"to\":null},\"query\":\"query transactions_view($offset: Int, $limit: Int, $from: timestamptz, $to: timestamptz) {\\n  transactions_view_aggregate(\\n    where: {_and: [{date: {_gte: $from}}, {date: {_lte: $to}}]}\\n  ) {\\n    aggregate {\\n      totalCount: count\\n      __typename\\n    }\\n    __typename\\n  }\\n  transactions_view(\\n    order_by: {date: desc}\\n    limit: $limit\\n    offset: $offset\\n    where: {_and: [{date: {_gte: $from}}, {date: {_lte: $to}}]}\\n  ) {\\n    id\\n    model\\n    user_id\\n    currency\\n    amount\\n    date\\n    type\\n    is_debit\\n    description\\n    __typename\\n  }\\n}\\n\"}";

        var requestOptions = {
            method: 'POST',
            headers: header,
            body: payload,
            redirect: 'follow'
        };

        return await fetch("https://hasura.plutus.it/v1alpha1/graphql", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.data.transactions_view;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(statements.data.transactions_view);
    }
}

export async function getStatementsV2() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        header.append("Content-Type", "application/json");

        var payload = "{\"query\": \"query { card_transactions(order_by: { order_id:desc }) { account_id api_response billing_amount billing_amount billing_currency card_id created_at description id mcc order_id status type updated_at }}\"}";

        var requestOptions = {
            method: 'POST',
            headers: header,
            body: payload,
            redirect: 'follow'
        };

        return await fetch("https://hasura.plutus.it/v1alpha1/graphql", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.data.card_transactions;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(statementsV2.data.card_transactions);
    }
}
export async function getWithdrawals() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        header.append("Content-Type", "application/json");

        var payload = "{\"operationName\":\"withdrawals\",\"variables\":{},\"query\":\"query withdrawals($status: enum_pluton_withdraw_requests_status) {\\n  pluton_withdraw_requests(\\n    order_by: {created_at: desc}\\n    where: {status: {_eq: $status}}\\n  ) {\\n    id\\n    address\\n    amount\\n    status\\n    payout_destination_type\\n    created_at\\n    clear_junction_transfer {\\n      amount\\n      currency\\n      __typename\\n    }\\n    card_transfer {\\n      amount\\n      currency\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}";

        var requestOptions = {
            method: 'POST',
            headers: header,
            body: payload,
            redirect: 'follow'
        };

        return await fetch("https://hasura.plutus.it/v1alpha1/graphql", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.data.pluton_withdraw_requests;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(withdrawals.data.pluton_withdraw_requests);
    }
}

export async function getSubscription() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));

        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/platform/subscription", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(subscription);
    }
}

export async function getBalance() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        header.append("Content-Type", "application/json");

        var payload = "{\"operationName\":\"getBalance\",\"variables\":{\"currency\":\"EUR\"},\"query\":\"query getBalance($currency: enum_fiat_balance_currency!) {\\n  fiat_balance(where: {currency: {_eq: $currency}}) {\\n    id\\n    user_id\\n    currency\\n    amount\\n    created_at\\n    updated_at\\n    __typename\\n  }\\n  card_transactions_aggregate(\\n    where: {type: {_eq: \\\"AUTHORISATION\\\"}, status: {_eq: \\\"APPROVED\\\"}}\\n  ) {\\n    aggregate {\\n      sum {\\n        billing_amount\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}";
        var requestOptions = {
            method: 'POST',
            headers: header,
            body: payload,
            redirect: 'follow'
        };

        return await fetch("https://hasura.plutus.it/v1alpha1/graphql", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.data;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(balance.data);
    }
}


export async function getUserPerks() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));

        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/platform/perks", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(userPerk);
    }
}

export async function getAllPerks(){
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));

        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/platform/configurations/perks", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse.perks;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(perks.perks);
    }
}


export async function getUserProfile() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));

        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/platform/users/profile", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            })
            .catch(err => console.warn(err));
    }else{
        return _.cloneDeep(profile);
    }
}

export async function getAllStatements(){
    let statements = await getStatements();
    let statementsV2 = await getStatementsV2();
    let rewards = await getRewards();
    let withdrawals = await getWithdrawals();
    let allPerks = await getAllPerks();
    let bonus = rewards.filter((reward) => reward.type === "REBATE_BONUS");
    let result = statements.map((value) => {
        value.amount = Math.abs(value.amount);
        value.card_transactions = statementsV2.find( statement => statement.id === value.id);
        console.log(value.card_transactions);
        if(value.card_transactions === undefined){
            value.card_transactions = {};
            value.card_transactions.created_at = value.date;
        }
        let rewardList = rewards.filter((valueReward) => {
            return valueReward.reference_id === value.id
        });
        //perkTransactionsOfCurrentMonth.every(transaction => !isUsedPerk(transaction, perk)))
        const perkTransactionFound = rewardList.find( reward => reward.reference_type.indexOf('perk') >= 0);
        if(perkTransactionFound){
            const isPerk = (transaction, perk) => transaction.reference_type === `perk_${perk.id}_reward`;
            value.perk = allPerks.find(perk => isPerk(perkTransactionFound, perk));
        }else{
            value.perk = null;
        }
        //console.log(perkTransactionFound);

        value.cashback = rewardList;

        // PARTIAL REWARD USE REFERENCE_ID OF DEFAULT CASHBACK TX NOT MAIN TX
        rewardList.map((reward) => {
            if(reward.fiat_transaction){ // modulr override
                value.card_transactions = reward.fiat_transaction?.card_transactions;
            }
            reward.amount = parseFloat(reward.amount);
            reward.rebate_rate = parseFloat(reward.rebate_rate);
            if (reward.rebate_rate === 0.00) {
                reward.rebate_rate = 100;
            }
            let partialReward = rewards.filter((partial_reward) => {
                partial_reward.amount = parseFloat(partial_reward.amount);
                return reward.id === partial_reward.reference_id;
            });
            if (partialReward.length > 0) {
                partialReward.forEach(element => {
                    element.rebate_rate = parseFloat(element.rebate_rate);
                    value.cashback.push(element)
                });
            }
        });
        return value;
    });


    // BONUS = PLUTON TRANSACTION NOT A STATEMENT
    // CREATE A FAKE STATEMENT TO KEEP THE LOGIC GOOD
    bonus = bonus.map((bonus) => {
        return {amount:0, date:bonus.createdAt, id:bonus.id, type:bonus.type, cashback:[bonus]}
    });
    result = result.concat(bonus);
    result.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    result.map((value) => {return initStatus(value)});

    return result;
}

const initStatus = (value) => {
    value.status = {};
    value.status.tooltip = {};
    value.reason = {};
    value.releaseDate = {};
    value.reward = {};
    value.reward.tooltip = {};
    value.sortedKeyword = new Set();
    if(value.perk){
        value.sortedKeyword.add('perk');
    }
    if (StatementsType.TOP_UP_ACCOUNT.is([value.type])) {
        value.type = StatementsType.TOP_UP_ACCOUNT;
        value.sortedKeyword.add('top_up_account');
        value.status.value = 'top_up_account';
        value.status.text = 'Top up Account';
        value.status.style = 'bg-slate-100 text-slate-600';
        value.description = "Plutus - Load Plutus account";
    } else if (StatementsType.WITHDRAW_ACCOUNT_TO_CARD.is([value.type])) {
        value.type = StatementsType.WITHDRAW_ACCOUNT_TO_CARD;
        value.sortedKeyword.add('unload_account');
        value.status.value = 'unload_account';
        value.status.text = 'Unload Account';
        value.status.style = 'bg-slate-100 text-slate-600'
        value.description = "Plutus - Unload Plutus account";
    } else if (StatementsType.TOP_UP_CARD.is([value.type])) {
        value.type = StatementsType.TOP_UP_CARD;
        value.sortedKeyword.add('top_up_card');
        value.status.value = 'top_up';
        value.status.text = 'Top up Card';
        value.status.style = 'bg-slate-100 text-slate-600';
        value.description = "Plutus - Load a card with deposit";
    } else if (StatementsType.DEX_BUY.is([value.type])) {
        value.type = StatementsType.DEX_BUY;
        value.sortedKeyword.add('dex_buy');
        value.status.value = 'dex_buy';
        value.status.text = 'Dex Buy';
        value.status.style = 'bg-rose-100 text-rose-600';
        value.description = 'Plutus - Dex buy';
    } else if (StatementsType.WITHDRAW_FEE.is([value.type])) {
        value.type = StatementsType.WITHDRAW_FEE;
        value.sortedKeyword.add('withdraw_fee');
        value.status.value = 'withdraw_fee';
        value.status.text = 'Withdraw Fee';
        value.status.style = 'bg-rose-100 text-rose-600';
        value.description = "Plutus - PLU Withdraw fee";
    } else if (StatementsType.BONUS.is([value.type])) {
        value.type = StatementsType.BONUS;
        value.sortedKeyword.add('bonus');
        value.status.value = 'bonus';
        value.status.text = 'Bonus';
        value.status.style = 'bg-blue-100 text-blue-600';
        let find = value.cashback.find((cashback) => {
            return cashback.reason !== null
        });
        value.reason.value = find ? find.reason : "-";
        value.status.tooltip.text = `Reason : ${value.reason.value}`;
        value.description = "Complimentary gift";
    } else if (StatementsType.DECLINED.is([value.type])) {
        value.type = StatementsType.DECLINED;
        value.sortedKeyword.add('declined');
        value.status.value = 'declined';
        value.status.text = 'Declined';
        value.status.style = 'bg-rose-100 text-rose-600';
    } else if (StatementsType.IN_VALIDATION.is([value.type]) && value.cashback.length === 0) {
        value.type = StatementsType.IN_VALIDATION;
        value.sortedKeyword.add('in_validation');
        value.status.value = 'validation';
        value.status.text = 'In Validation';
        value.status.style = 'bg-amber-100 text-amber-600';
    } else if (value.cashback.length > 0 && value.cashback.find((cashback) => {
        return cashback.available === false && cashback.reason !== null
    })) {
        value.type = StatementsType.REJECTED;
        value.sortedKeyword.add('rejected');
        value.status.value = 'rejected';
        value.status.text = 'Rejected';
        value.status.style = 'bg-rose-100 text-rose-600';
        value.reason.value = value.cashback.find((cashback) => {
            return cashback.available === false && cashback.reason !== null
        }).reason;
        value.status.tooltip.text = `Reason : ${value.reason.value}`;
    } else if (value.cashback.length > 0 && value.cashback.find((cashback) => {
        return cashback.available === false
    })) {
        value.type = StatementsType.PENDING;
        value.sortedKeyword.add('pending');
        let releaseDate = dayjs(value.cashback.find((cashback) => {
            return cashback.available === false
        }).createdAt).add(46, 'day');
        value.status.value = 'pending';
        value.status.text = 'Pending';
        value.status.style = 'bg-amber-100 text-amber-600';
        value.releaseDate.value = releaseDate.valueOf();
        value.releaseDate.text = releaseDate.format('YYYY-MM-DD');
    } else if (value.cashback.length > 0 && value.cashback.find((cashback) => {
        return cashback.available === true
    })) {
        value.type = StatementsType.COMPLETED;
        value.status.value = 'rewarded';
        value.status.text = 'Rewarded';
        value.status.style = 'bg-emerald-100 text-emerald-600';
        value.sortedKeyword.add('rewarded');
        value.sortedKeyword.add('completed');
    } else if (StatementsType.REFUNDED.is([value.type])) {
        value.type = StatementsType.REFUNDED;
        value.status.value = 'refunded';
        value.status.text = 'Refunded';
        value.status.style = 'bg-slate-100 text-slate-600';
        value.sortedKeyword.add('refunded');
    } else {
        value.type = StatementsType.NO_REWARD;
        value.status.value = 'no_reward';
        value.status.text = 'No Reward';
        value.status.style = 'bg-slate-100 text-slate-600';
        value.sortedKeyword.add('no_reward');
    }

    initReward(value);
}

const initReward = (value) => {
    if (value.cashback.length === 0) {
        value.reward.value = 0;
        value.reward.tooltip.text = "-";
    } else {
        let amount = value.cashback.reduce(function (tot, cashback) {
            return tot + parseFloat(cashback.amount);
        }, 0);
        let txCashback = value.cashback.find(Boolean);
        let PLURate = ((parseFloat(txCashback.fiat_amount_rewarded??0) / 100) * (parseFloat(txCashback.rebate_rate)/100))/parseFloat(txCashback.amount);
        let realValue = amount*PLURate;
        value.cashback.map(cashback => {
            cashback.reward = {};
            cashback.reward.rate = PLURate
            cashback.reward.real = cashback.amount*PLURate
        });
        value.reward.value = amount;
        value.reward.tooltip.text = `Rate: ${formatCurrency(PLURate)}/PLU<br>Cashback: ${formatCurrency(realValue)}`;
        value.reward.rate = PLURate;
        value.reward.real = realValue;
    }
}