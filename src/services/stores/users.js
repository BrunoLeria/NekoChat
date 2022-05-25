import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useUsersStore = defineStore("user", () => {
    const apiURL = "http://localhost:3005/";
    const user = ref(useLocalStorage("userNeko", {}));

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
                console.error("Error:", error);
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
                console.log(error);
            });
    }

    async function findOneUser(req, res) {}

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
                    user.value = data;
                    for (const [key, value] of Object.entries(user.value)) {
                        if (value === null) {
                            user.value[key] = "";
                        }
                    }
                    return true;
                }
                return false;
            })
            .catch((error) => {
                console.log(error);
            });
        return retorno;
    }

    async function updateUser(req) {
        const url = apiURL + "updateUser?id=" + user.value.usu_identification;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error("Error:", error);
                return error;
            });
    }

    async function deleteUser(req, res) {}

    async function deleteAllUser(req, res) {}

    return { user, createUser, findAllUser, findOneUser, findOneUserByEmail, updateUser, deleteUser, deleteAllUser };
});
