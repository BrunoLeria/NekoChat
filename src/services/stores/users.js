import { defineStore } from "pinia";

export const useUsersStore = defineStore("userID", {
    state: () => ({
        user: null
    })
});
