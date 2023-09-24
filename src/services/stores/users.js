import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import  { GCurl } from "/src/config/url.js";
import router from "../router";

export const useUsersStore = defineStore("user", () => {
    const user = ref(useLocalStorage("userNeko", {}));
    const configUser = ref({});

    async function createUser() {
        const url = GCurl + "users";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user.value)
        })
            .then((response) => response.json())
            .then((data) => {
                user.value = data;
                for (const [key, value] of Object.entries(user.value)) {
                    if (value === null) {
                        user.value[key] = "";
                    }
                }
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada criar um novo usuário" }
                });
            });
    }

    async function findAllUser(req, res) {
        const url = GCurl + "users";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar todos os usuários" }
                });
            });
    }

    async function findOneUserByEmail(email) {
        const url = GCurl + "users/" + email;
        const retorno = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === undefined) {
                    data = fillEmptyFields(data);
                    user.value = data;
                    return true;
                }
                return false;
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar um usuário por e-mail" }
                });
            });
        return retorno;
    }

    async function updateUser(configOthers = false) {
        const req = configUser.value && Object.keys(configUser.value).length !== 0 ? ref(configUser.value) : ref(user.value);
        const id = configOthers ? configUser.value.identification : user.value.identification;
        const url = GCurl + "users/" + id;
        Object.keys(req.value).forEach((key) => {
            if (req.value[key] === "") {
                delete req.value[key];
            }
        });
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.value)
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada atualizar um usuário" }
                });
            });
    }

    async function deleteUser(req, res) {
        const url = GCurl + "users/" + user.value.identification;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada deletar um usuário" }
                });
            });
    }

    function fillEmptyFields(data) {
        for (const [key, value] of Object.entries(data)) {
            if (value === null) {
                data[key] = "";
            }
        }
        return data;
    }

    return {
        user,
        configUser,
        createUser,
        findAllUser,
        findOneUserByEmail,
        updateUser,
        deleteUser,
    };
});
