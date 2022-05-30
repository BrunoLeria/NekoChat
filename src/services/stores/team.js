import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export const useTeamStore = defineStore("teamID", () => {
    const team = ref(useLocalStorage("teamNeko", []));

    async function findAllTeam(req, res) {
        const url = apiURL + "findAllTeam";
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
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        team,
        findAllTeam
    };
});
