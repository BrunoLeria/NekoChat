import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useUsersStore = defineStore("user", () => {
    const apiURL = "http://192.168.12.178:3005/";
    const user = ref(useLocalStorage("userNeko", {}));
    const statuses = ref(useLocalStorage("statusesNeko", []));
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

    async function findOneUser(id) {
        const url = apiURL + "findOneUserBy?id=" + id;
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
    async function findAllStatuses() {
        const url = apiURL + "findAllStatuses";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) statuses.value = data;
            })
            .catch((error) => {
                console.log(error);
            });
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
        const req = configUser && Object.keys(configUser.value).length !== 0 ? configUser.value : user.value;
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

    return {
        user,
        statuses,
        configUser,
        createUser,
        findAllUser,
        findOneUser,
        findOneUserByEmail,
        findAllStatuses,
        findAllOffices,
        updateUser,
        deleteUser,
        deleteAllUser
    };
});
