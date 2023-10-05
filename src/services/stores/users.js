import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { GCurl } from "../../config/url.js";
import router from "../router";

export const useUsersStore = defineStore("user", () => {
    const user = ref(useLocalStorage("userNeko", {}));
    const configUser = ref({});

    async function createUser() {
        const url = GCurl + "users";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user.value)
            });
            const data = await response.json();
            user.value = data;
            for (const [key, value] of Object.entries(user.value)) {
                if (value === null) {
                    user.value[key] = "";
                }
            }
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada criar um novo usuário" }
            });
        }
    }

    async function findAllUsers() {
        const url = GCurl + "users";
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
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar todos os usuários" }
            });
        }
    }

    async function findOneUserById(id) {
        const url = GCurl + "users/" + id;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.message === undefined) {
                for (const [key, value] of Object.entries(data)) {
                    if (value === null) {
                        data[key] = "";
                    }
                }
            }
            return data;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar um usuário por e-mail" }
            });
        }
    }

    async function findOneUserByEmail(email) {
        const url = GCurl + "users/email/" + email;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.message === undefined) {
                for (const [key, value] of Object.entries(data)) {
                    if (value === null) {
                        data[key] = "";
                    }
                }
            }
            return data;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar um usuário por e-mail" }
            });
        }
    }

    async function updateUser(newUser, configOthers = false) {
        const id = configOthers ? newUser.identification : user.value.identification;
        const url = GCurl + "users/" + id;
        try {
            Object.keys(newUser).forEach((key) => {
                if (newUser[key] === "" || newUser[key] === "identification") {
                    delete newUser[key];
                }
            });
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();
            if (data.message === "Usuário foi atualizado com sucesso!") {
                if (!configOthers) {
                    for (const key of Object.keys(newUser)) {
                        user.value[key] = newUser[key];
                    }
                }
            }
            return response.status;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada atualizar um usuário" }
            });
        }
    }

    async function deleteUser(req, res) {
        const url = GCurl + "users/" + user.value.identification;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.status;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada deletar um usuário" }
            });
        }
    }

    return {
        user,
        configUser,
        createUser,
        findAllUsers,
        findOneUserById,
        findOneUserByEmail,
        updateUser,
        deleteUser
    };
});
