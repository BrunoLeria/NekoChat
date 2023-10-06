import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { GCurl } from "../../config/url.js";
import router from "../router";

export const useClientsStore = defineStore("client", () => {
    const clients = ref(useLocalStorage("clientsNeko", []));
    const selectedClient = ref({});

    async function createClient(client) {
        const url = GCurl + "clients";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(client)
            });
            return await response.status;
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar todas os clientes" }
            });
        }
    }

    async function findAllClients() {
        const url = GCurl + "clients";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) clients.value = await response.json();
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar todas os clientes" }
            });
        }
    }

    async function findOneClientById(id) {
        const url = GCurl + "clients/" + id;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.json();
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar um cliente" }
            });
        }
    }

    async function updateClient(newClient, identification) {
        const url = GCurl + "clients/" + identification;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newClient)
            });
            return await response.status;
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada atualizar um cliente" }
            });
        }
    }

    async function deleteClient(identification) {
        const url = GCurl + "clients/" + identification;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.status;
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada deletar um cliente" }
            });
        }
    }

    return {
        clients,
        selectedClient,
        createClient,
        findAllClients,
        findOneClientById,
        updateClient,
        deleteClient
    };
});
