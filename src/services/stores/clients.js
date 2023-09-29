import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { GCurl } from "/src/config/url.js";
import router from "../router";

export const useClientsStore = defineStore("client", () => {
    const clients = ref(useLocalStorage("clientsNeko", []));
    const selectedClient = ref({});

    async function createClient(client) {
        const url = GCurl + "clients";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
        return response.status;
    }

    async function findAllClients(req, res) {
        const url = GCurl + "clients";
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar todas os clientes" }
                });
            });
        return result;
    }

    async function findOneClientById(id) {
        const url = GCurl + "clients/" + id;
        const retorno = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar um cliente" }
                });
            });
        return retorno;
    }

    async function updateClient(newClient, identification) {
        const url = GCurl + "clients/" + identification;
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newClient)
        })
            .then((response) => response.json())
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada atualizar um cliente" }
                });
            });
    }

    async function deleteClient(identification) {
        const url = GCurl + "clients/" + identification;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada deletar um cliente" }
                });
            });
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