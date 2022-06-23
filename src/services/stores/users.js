import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useUsersStore = defineStore("user", () => {
    const apiURL = "https://napi.aquicob.com.br:3006/";
    const user = ref(useLocalStorage("userNeko", {}));
    const statuses = ref(
        useLocalStorage("statusesNeko", [
            { sts_identification: 1, sts_name: "Online", sts_description: "Online", sts_color: "rgb(74 222 128)" },
            { sts_identification: 2, sts_name: "Occupied", sts_description: "Occupied", sts_color: "rgb(248 113 113)" },
            { sts_identification: 3, sts_name: "Away", sts_description: "Away", sts_color: "rgb(250 204 21)" },
            { sts_identification: 4, sts_name: "Offline", sts_description: "Offline", sts_color: "rgb(156 163 175)" }
        ])
    );
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

    async function findOneUser(id, config = false) {
        const url = apiURL + "findOneUser?id=" + id;
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
                    if (config) configUser.value = data;
                    else user.value = data;
                    return true;
                }
                return false;
            })
            .catch((error) => {
                console.log(error);
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
                console.log(error);
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
                console.log(error);
            });
    }

    async function updateUser(id) {
        const req = configUser.value && Object.keys(configUser.value).length !== 0 ? configUser.value : user.value;
        const url = apiURL + "updateUser?id=" + id;
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
        statuses,
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
