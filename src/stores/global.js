import {defineStore} from 'pinia'

export const globalStore = defineStore({
    id: 'global',
    state: () => ({
        cardSidebarOpen: true,
    }),
    getters: {
    },
    actions: {
    }
})