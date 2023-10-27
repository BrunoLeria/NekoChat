import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { GCurl } from "../../config/url";
import router from "../router";

export const useTeamsStore = defineStore("teamID", () => {
    const teams = ref(useLocalStorage("teamNeko", []));
    const teamOptions = ref(useLocalStorage("teamOptionsNeko", []));

    async function createTeam(newTeam) {
        const url = GCurl + "teams";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTeam)
            });
            return response.status;
        } catch (error) {
            console.error(error);
            alert("Erro ao tentar criar um novo time. Erro: " + error);
        }
    }

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

    async function findOneTeamById(identification){
        const url = GCurl + "teams/" + identification;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            alert("Erro ao tentar encontrar um time pelo id. Erro: " + error);
        }
    }

    async function updateTeam(newTeam, identification){
        const url = GCurl + "teams/" + identification;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTeam)
            });
            return response.status;
        } catch (error) {
            console.error(error);
            alert("Erro ao tentar atualizar o time com o id " + identification + ". Erro: " + error);
        }
    }

    async function deleteTeam(identification){
        const url = GCurl + "teams/" + identification;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            return response.status;
        } catch (error) {
            console.error(error);
            alert("Erro ao tentar atualizar o time com o id " + identification + ". Erro: " + error);
        }
    }

    return {    
        teams,
        teamOptions,
        createTeam,
        findAllTeam,
        findOneTeamById,
        updateTeam,
        deleteTeam        
    };
});
