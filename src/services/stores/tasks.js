import { defineStore } from "pinia";
import { GCurl } from "/src/config/url.js";
import router from "../router";

export const useTasksStore = defineStore("task", () => {
    async function createTask(task) {
        const url = GCurl + "tasks";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });
            return await response.status;
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada criar uma nova tarefa" }
            });
        }
    }

    async function findAllTasks() {
        const url = GCurl + "tasks";
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
                params: { resource: "chamada encontrar todas as tarefas" }
            });
        }
    }

    async function findOneTaskById(identification) {
        const url = GCurl + "tasks/" + identification;
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
                params: { resource: "chamada encontrar uma tarefa" }
            });
        }
    }

    async function findAllTasksByClient(client_id) {
        const url = `${GCurl}tasks/clients/${client_id}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar todas as tarefas" }
            });
        }
    }

    async function findAllTasksByUsers(user_id) {
        const url = `${GCurl}tasks/users/${user_id}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar todas as tarefas" }
            });
        }
    }

    async function updateTask(newTask, identification) {
        const url = GCurl + "tasks/" + identification;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });
            return await response.status;
        } catch (error) {
            router.push({
                name: "404Resource",
                params: { resource: "chamada atualizar uma tarefa" }
            });
        }
    }

    async function deleteTask(identification) {
        const url = GCurl + "tasks/" + identification;
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
                params: { resource: "chamada deletar uma tarefa" }
            });
        }
    }

    return {
        createTask,
        findAllTasks,
        findOneTaskById,
        findAllTasksByClient,
        findAllTasksByUsers,
        updateTask,
        deleteTask
    };
});