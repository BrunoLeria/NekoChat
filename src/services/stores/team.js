import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useUsersStore } from "./users";
import { ref } from "vue";

export const useTeamStore = defineStore("teamID", () => {
    const apiURL = "http://napi.aquicob.com.br:3005/";
    const team = ref(useLocalStorage("teamNeko", []));
    const teamOptions = ref(useLocalStorage("teamOptionsNeko", []));
    const userStore = useUsersStore();

    async function findAllTeam() {
        const url = apiURL + "findAllTeam?id=" + userStore.user.usu_identification;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    team.value = data;
                    teamOptions.value = [];
                    data.forEach((element) => {
                        teamOptions.value.push({
                            id: element.usu_identification,
                            name: element.usu_name ? element.usu_name : "Usuário " + element.usu_identification
                        });
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        team,
        teamOptions,
        findAllTeam
    };
});
