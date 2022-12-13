import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
    state: () => ({
        user: {
            email: null,
            token: null,
            id: null
        }
    }),
    persist: true
})