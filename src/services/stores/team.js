import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useUsersStore } from "./users";
import { ref } from "vue";

export const useTeamStore = defineStore("teamID", () => {
    const apiURL = "http://192.168.12.178:3005/";
    const team = ref(useLocalStorage("teamNeko", []));
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
