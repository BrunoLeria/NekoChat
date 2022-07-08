import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useUsersStore = defineStore("user", () => {
    const apiURL = "https://napi.aquicob.com.br:8080/";
    const user = ref(useLocalStorage("userNeko", {}));
    const offices = ref(useLocalStorage("officesNeko", []));
    const configUser = ref({});

    async function createUser() {
        const url = apiURL + "createUser";
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
        const url = apiURL + "findAllUser";
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

    async function findOneUser(id, config = false) {
        const url = apiURL + "findOneUser?id=" + id;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === undefined) {
                    data = fillEmptyFields(data);
                    if (config) configUser.value = data;
                    else user.value = data;
                    return true;
                }
                return false;
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar um usuário" }
                });
            });
    }

    async function findOneUserByEmail(email) {
        const url = apiURL + "findOneUserByEmail?email=" + email;
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

    async function findAllOffices() {
        const url = apiURL + "findAllOffices";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) offices.value = data;
            })
            .catch((error) => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar todos os cargos" }
                });
            });
    }

    async function updateUser(configOthers = false) {
        const req = configUser.value && Object.keys(configUser.value).length !== 0 ? ref(configUser.value) : ref(user.value);
        const id = configOthers ? configUser.value.usu_identification : user.value.usu_identification;
        const url = apiURL + "updateUser?id=" + id;
        Object.keys(req.value).forEach((key) => {
            if (req.value[key] === "") {
                delete req.value[key];
            }
        });
        await fetch(url, {
            method: "POST",
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

    async function deleteUser(req, res) {}

    async function deleteAllUser(req, res) {}

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
        offices,
        configUser,
        createUser,
        findAllUser,
        findOneUser,
        findOneUserByEmail,
        findAllOffices,
        updateUser,
        deleteUser,
        deleteAllUser
    };
});
