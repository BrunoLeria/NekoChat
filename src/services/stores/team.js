import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { GCurl } from "../../config/url";
import router from "../router";

export const useTeamStore = defineStore("teamID", () => {
    const teams = ref(useLocalStorage("teamNeko", []));
    const teamOptions = ref(useLocalStorage("teamOptionsNeko", []));

    async function findAllTeam() {
        const url = GCurl + "teams";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data) {
                teams.value = data;
                teamOptions.value = [];
                data.forEach((element) => {
                    teamOptions.value.push({
                        id: element.identification,
                        name: element.name ? element.name : "Usuário " + element.identification
                    });
                });
            }
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar todos os usuários do time" }
            });
        }
    }

    return {
        teams,
        teamOptions,
        findAllTeam
    };
});
