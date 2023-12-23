import {defineStore} from 'pinia'
import {getUserProfile} from "../utils/PlutusCall";
import {balanceStore} from "./balance";

export const profileStore = defineStore({
    id: 'profile',
    state: () => ({
        firstname: null as undefined | string,
        loading: false as boolean,
        error: null
    }),
    getters: {
    },
    actions: {
        async fetchProfile() {
            this.loading = true
            try {
                const [firstname] = await getUserProfile().then(profile => [profile?.personal_details.first_name]);
                this.firstname = firstname;
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})

export type ProfileStore = ReturnType<typeof profileStore>