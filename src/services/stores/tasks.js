import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { GCurl } from "/src/config/url.js";
import router from "../router";

export const useTasksStore = defineStore("task", () => {
    const tasks = ref(useLocalStorage("tasksNeko", {}));
    const selectedTask = ref({});

    async function createTask() {
        const url = GCurl + "tasks";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tasks.value)
        })
            .then((response) => response.json())
            .then((data) => {
                tasks.value = data;
                for (const [key, value] of Object.entries(tasks.value)) {
                    if (value === null) {
                        tasks.value[key] = "";
                    }
                }
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada criar uma nova tarefa" }
                });
            });
    }

    async function findAllTasks(req, res) {
        const url = GCurl + "tasks";
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
                    params: { resource: "chamada encontrar todas as tarefas" }
                });
            });
        return result;
    }

    async function findOneTaskById(id) {
        const url = GCurl + "tasks/" + id;
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
                    params: { resource: "chamada encontrar uma tarefa" }
                });
            });
        return retorno;
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
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
            .then((response) => response.json())
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada atualizar uma tarefa" }
                });
            });
    }

    async function deleteTask(identification) {
        const url = GCurl + "tasks/" + identification;
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
                    params: { resource: "chamada deletar uma tarefa" }
                });
            });
    }

    return {
        tasks,
        selectedTask,
        createTask,
        findAllTasks,
        findOneTaskById,
        findAllTasksByClient,
        findAllTasksByUsers,
        updateTask,
        deleteTask
    };
});