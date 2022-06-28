import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useUsersStore = defineStore("user", () => {
    const apiURL = "https://napi.aquicob.com.br:3006/";
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
                alert("Tivemos algum problema na chamada createUser. Por favor verifique com o suporte sobre o erro: " + error);
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
                alert("Tivemos algum problema na chamada findAllUser. Por favor verifique com o suporte sobre o erro: " + error);
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
                alert("Tivemos algum problema na chamada findOneUser. Por favor verifique com o suporte sobre o erro: " + error);
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
                alert("Tivemos algum problema na chamada findOneUserByEmail. Por favor verifique com o suporte sobre o erro: " + error);
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
                alert("Tivemos algum problema na chamada findAllOffices. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }

    async function updateUser(id = user.value.usu_identification) {
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
                alert("Tivemos algum problema na chamada updateUser. Por favor verifique com o suporte sobre o erro: " + error);
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
