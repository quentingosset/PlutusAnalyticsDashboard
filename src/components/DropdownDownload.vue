<template>
    <div ref="dropdownDownload" class="relative inline-flex">
        <button
                ref="trigger"
                class="btn rounded-none bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                aria-haspopup="true"
                @click.prevent="dropdownOpen = !dropdownOpen"
                :aria-expanded="dropdownOpen"
        >
            <span class="sr-only">Filter</span>
            <wbr/>
            <svg class="w-4 h-4 fill-current rotate-180" viewBox="0 0 16 16">
                <path d="M8 4c-.3 0-.5.1-.7.3L1.6 10 3 11.4l4-4V16h2V7.4l4 4 1.4-1.4-5.7-5.7C8.5 4.1 8.3 4 8 4ZM1 2h14V0H1v2Z"/>
            </svg>
        </button>
        <transition
                enter-active-class="transition ease-out duration-200 transform"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-out duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
        >
            <div v-show="dropdownOpen"
                 class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 pt-1.5 shadow-lg overflow-hidden mt-1"
                 :class="align === 'right' ? 'right-0' : 'left-0'">
                <div ref="dropdown">
                    <div class="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Reports</div>
                    <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                        <div class="flex-1">
                            <ul class="mb-4">
                                <li class="py-1 px-3">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox" :data-filter="ReportsType.STATEMENTS.name"/>
                                        <span class="text-sm font-medium ml-2">Transactions</span>
                                    </label>
                                </li>
                                <li class="py-1 px-3">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox" :data-filter="ReportsType.REWARDS.name"/>
                                        <span class="text-sm font-medium ml-2">Rewards</span>
                                    </label>
                                </li>
                                <li class="py-1 px-3">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox disabled:bg-slate-50" disabled :data-filter="ReportsType.WITHDRAWALS.name"/>
                                        <span class="text-sm font-medium ml-2">Withdrawals</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="py-2 px-3 border-t border-slate-200 bg-slate-50">
                        <ul class="flex items-center justify-around gap-5">
                            <li>
                                <DropdownClassic :options="options" v-model:selected="selected"/>
                            </li>
                            <li>
                                <button class="btn-xs bg-indigo-500 rounded-none hover:bg-indigo-600 text-white" @click="apply"
                                        @focusout="dropdownOpen = false">Download
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import DropdownClassic from "../components/DropdownClassic.vue";
import {downloadObjectAs} from "../utils/Utils";
import {ReportsType} from "../utils/ReportsType";

export default {
    name: 'DropdownDownload',
    computed: {
        ReportsType() {
            return ReportsType
        }
    },
    components: {
        DropdownClassic
    },
    props: ['align','statements'],


    setup(props, context) {

        const defaultFilter = ref(new Set());
        const dropdownOpen = ref(false);
        const trigger = ref(null);
        const dropdown = ref(null);
        const dropdownDownload = ref(null);
        const statements =  computed( () => props.statements);
        const options = ref([
            {
                id: 0,
                value: 'CSV'
            },
            {
                id: 1,
                value: 'JSON'
            },
        ]);
        const selected = ref(options.value[0]);



        // close on click outside
        const clickHandler = ({target}) => {
            if (!dropdownOpen.value || dropdown.value.contains(target)) return;
            if (trigger.value.contains(target)) return;
            dropdownOpen.value = false;
        }

        // close if the esc key is pressed
        const keyHandler = ({keyCode}) => {
            if (!dropdownOpen.value || keyCode !== 27) return
            dropdownOpen.value = false;
        }

        onMounted(() => {
            defaultFilter.value = new Set([...dropdownDownload.value.querySelectorAll('input[type=checkbox]')].map(formatValue => formatValue.dataset.filter));
            document.addEventListener('click', clickHandler)
            document.addEventListener('keydown', keyHandler)
        })

        onUnmounted(() => {
            document.removeEventListener('click', clickHandler)
            document.removeEventListener('keydown', keyHandler)
        })

        const apply = () => {
            let checked = dropdownDownload.value.querySelectorAll('input[type=checkbox]:checked');
            checked = new Set([...checked].map(formatValue => formatValue.dataset.filter));
            if(checked.size){
                checked.forEach(value => {
                    let tmp = JSON.parse(JSON.stringify(statements.value));
                    if (ReportsType.STATEMENTS.is(value)) {
                        tmp.map(statement => {
                            statement.amount = (statement.amount/100).toLocaleString();
                            statement.reward_rate = statement.reward.rate? statement.reward.rate : 0;
                            statement.reward_plu_value = statement.reward.value? statement.reward.value : 0;
                            statement.reward_value = statement.reward.real? statement.reward.real : 0;
                            statement.type = statement.type._name
                            statement.releaseDate = statement.releaseDate.text
                            statement.reason = statement.reason.value
                            statement.mcc = statement.card_transactions?.mcc? statement.card_transactions.mcc : '';
                            statement.perk = statement.perk? statement.perk.label : '';
                            delete statement.user_id;
                            if (selected.value.value === 'CSV') {
                              delete statement.card_transactions;
                              delete statement.cashback;
                            }
                            delete statement.reward;
                            delete statement.sortedKeyword;
                            delete statement.status;
                            delete statement.__typename;
                        });
                    }
                    if (ReportsType.REWARDS.is(value)) {
                        tmp = tmp.filter(statement => statement.cashback.length !== 0).map(statement => statement.cashback).flat(1);
                        tmp.map(cashback => {
                            cashback.reward_plu_value = cashback.amount;
                            cashback.reward_rate = cashback.reward.rate? cashback.reward.rate : 0;
                            cashback.reward_value = cashback.reward.real? cashback.reward.real : 0;
                            cashback.statement_id = cashback.reference_id;
                            cashback.description = cashback.contis_transaction? cashback.contis_transaction.description : "Partial Reward"
                            cashback.amount = cashback.fiat_amount_rewarded/100;
                            delete cashback.fiat_amount_rewarded;
                            delete cashback.reward;
                            delete cashback.exchange_rate_id;
                            delete cashback.base_rate;
                            delete cashback.staking_rate;
                            delete cashback.subscription_plan;
                            delete cashback.contis_transaction;
                            delete cashback.reference_id;
                            delete cashback.user_id;
                        });

                    }
                    if (ReportsType.WITHDRAWALS.is(value)) {
                        console.log("WITHDRAWALS");
                    }
                    /*let tmp = JSON.parse(JSON.stringify(statements.value));
                    tmp.map(statement => {
                        statement.amount = statement.amount/100;
                        statement.reward_rate = statement.reward.rate? statement.reward.rate : 0;
                        statement.reward_plu_value = statement.reward.value? statement.reward.value : 0;
                        statement.reward_value = statement.reward.real? statement.reward.real : 0;
                        statement.type = statement.type._name
                        statement.releaseDate = statement.releaseDate.text
                        statement.reason = statement.reason.value
                        delete statement.reward;
                        delete statement.sortedKeyword;
                        delete statement.status;
                        delete statement.__typename;
                    });*/
                    downloadObjectAs(tmp,value, selected.value.value);
                })
                dropdownOpen.value = false;
            }
        }

        watch(selected, (value, oldValue, onCleanup) => {
            selected.value = value;
        });

        return {
            dropdownOpen,
            trigger,
            dropdown,
            apply,
            dropdownDownload,
            selected,
            options,
        }
    },

}
</script>
