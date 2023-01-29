import rewards from '../data/rewards.json';
import cards from '../data/cards.json';
import plan from '../data/plan.json';
import statements from '../data/statements.json';
import balance from '../data/balance.json';
import perk from '../data/perk.json';
import profile from '../data/profile.json';

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
        return rewards;
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
        return cards.plutus_cards[0];
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
        return statements.data.transactions_view;
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
        return plan;
    }
}

export async function getBalance() {
    if(import.meta.env.MODE === "production") {
        var header = new Headers();
        header.append("Authorization", "Bearer " + localStorage.getItem('id_token'));

        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };

        return await fetch("https://api.plutus.it/platform/consumer/balance", requestOptions)
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            })
            .catch(err => console.warn(err));
    }else{
        return balance;
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
        return perk;
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
        return profile;
    }
}

export async function getStatementsAndRewards(){
    let statements = await getStatements();
    let rewards = await getRewards();
    let bonus = rewards.filter((reward) => reward.type === "REBATE_BONUS");
    let result = statements.map((value) => {
        let rewardList = rewards.filter((valueReward) => {
            return valueReward.reference_id === value.id
        });
        value.cashback = rewardList;
        rewardList.map((reward) => {
            if(parseFloat(reward.rebate_rate) === 0.00){
                reward.rebate_rate = 100;
            }
            let partialReward = rewards.filter((partial_reward) => {
                return reward.id === partial_reward.reference_id;
            });
            if (partialReward.length > 0) {
                partialReward.forEach(element => value.cashback.push(element));
            }
        });
        if(value.type === "DEPOSIT_FUNDS_RECEIVED"){
            value.description = "Plutus - Load Plutus account";
        }
        if(value.type === "LOAD_PLUTUS_CARD_FROM_CJ_WALLET"){
            value.description = "Plutus - Unload Plutus account";
        }
        return value;
    });
    // BONUS = PLUTON TRANSACTION NOT A STATEMENT
    // CREATE A FAKE STATEMENT TO KEEP THE LOGIC GOOD
    bonus = bonus.map((bonus) => {
        let description = "";
        if (bonus.type === "REBATE_BONUS") {
            description = "Complimentary gift";
        }
        return {amount:0, date:bonus.createdAt, id:bonus.id, description:description, type:bonus.type, cashback:[bonus]}
    });
    result = result.concat(bonus);
    result.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    return result;
}
