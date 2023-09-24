import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useUsersStore } from "./users";
import { ref } from "vue";
import { GCurl } from "../../config/url";
import router from "../router";

export const useTeamStore = defineStore("teamID", () => {
    const teams = ref(useLocalStorage("teamNeko", []));
    const teamOptions = ref(useLocalStorage("teamOptionsNeko", []));
    const userStore = useUsersStore();

    async function findAllTeam() {
        const url = GCurl + "teams";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
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
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar todos os usuários do time" }
                });
            });
    }

    return {
        teams,
        teamOptions,
        findAllTeam
    };
});
