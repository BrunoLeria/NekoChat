import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import  { GCurl } from "/src/config/url.js";
import router from "../router";

export const useStatusesStore = defineStore("status", () => {
    const statuses = ref(useLocalStorage("statusNeko", []));

    async function findAllStatuses() {
        const url = GCurl + "statuses";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                statuses.value = data;
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar todos os status" }
                });
            });
    }

    return {
        statuses,
        findAllStatuses
    };
});

