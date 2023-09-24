import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";
import router from "../router";
import { GCurl } from "/src/config/url.js";

export const useTalkStore = defineStore("talks", () => {
    const userStore = useUsersStore();
    const talks = ref({});
    const selected = ref("");
    const activeChat = ref([]);

    async function createTalk(message) {
        const url = GCurl + "talks";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                fk_users_identification: userStore.user.identification,
                phone_number: phone_number,
                from_me: true
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch(() => {
                // router.push({
                //     name: "404Resource",
                //     params: { resource: "chamada criar conversa", redirect: "Home" }
                // });
            });
    }

    async function findAllTalks() {
        const url = GCurl + "talks";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    talks.value = {};
                    data.forEach((talk) => {
                        talks.value = {};
                        data.forEach((talk) => {
                            talks.value[talk.chat_id] = talk;
                        });
                    });
                }
            })
            .catch(() => {
                // router.push({
                //     name: "404Resource",
                //     params: { resource: "chamada encontrar conversa" }
                // });
            });
    }
    async function findOneTalkByChatID() {
        const url = GCurl + "talks/" + selected.value;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) activeChat.value = data;
            })
            .catch(() => {
                // router.push({
                //     name: "404Resource",
                //     params: { resource: "chamada encontrar conversa por id" }
                // });
            });
    }
    async function findAllTalksByUser() {
        talks.value = {};
        const url = GCurl + "talks/users/" + userStore.user.identification;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    talks.value = {};
                    data.forEach((talk) => {
                        talks.value[talk.chat_id] = talk;
                    });
                }
            })
            .catch(() => {
                // router.push({
                //     name: "404Resource",
                //     params: { resource: "chamada encontrar conversa por usuário" }
                // });
            });
    }
    async function updateTalk(req, res) {}
    async function updateTalkToSignInUser(idQuemAssumeChat, updateOtherClients = false) {
        const url = GCurl + "talks/users/" + idQuemAssumeChat;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fk_users_identification: idQuemAssumeChat
            })
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch(() => {
                // router.push({
                //     name: "404Resource",
                //     params: { resource: "chamada atualizar conversa para usuário", redirect: "Home" }
                // });
            });
    }
    async function updateRobot(assumir) {
        const last = activeChat.value.length - 1;
        const url = "https://app.aquicob.com.br/api.php?a=robo&b=transfere_chat";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
                instance: activeChat.value[last].tlk_robot_instance,
                chat_id: activeChat.value[last].tlk_chat_id,
                token: "661F2EC9C06E8A7AC84561CD206196AEE3D3962C35F1148302EDA31E71D37D91",
                responde: assumir
            })
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch(() => {
                // router.push({
                //     name: "404Resource",
                //     params: { resource: "chamada atuaizar robô", redirect: "Home" }
                // });
            });
    }
    async function fetchTalks() {
        userStore.user.is_admin ? await findAllTalks() : await findAllTalksByUser();
    }

    return {
        talks,
        selected,
        activeChat,
        createTalk,
        findOneTalkByChatID,
        updateTalk,
        updateTalkToSignInUser,
        updateRobot,
        fetchTalks
    };
});
