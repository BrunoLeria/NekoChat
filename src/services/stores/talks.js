import { defineStore } from "pinia";

export const useTalkStore = defineStore("talkID", {
    state: () => ({
        talks: {}
    })
});
