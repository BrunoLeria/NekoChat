import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";
import router from "../router";
import { GCurl } from "../../config/url.js";

export const useTalkStore = defineStore("talks", () => {
    const userStore = useUsersStore();
    const talks = ref({});
    const selected = ref("");
    const activeChat = ref([]);

    async function createTalk(message, whatsapp_identification) {
        const url = GCurl + "talks";
        try {
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                fk_users_identification: userStore.user.identification,
                whatsapp_identification: whatsapp_identification,
                from_me: true
            })
            });
            const data = await response.json();
                console.log("Success:", data);
        } catch (error) {
            console.error(error);
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada criar conversa", redirect: "Home" }
                });
        }
    }

    async function findAllTalks() {
        const url = GCurl + "talks";
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (data) {
                    talks.value = {};
                    for (const talk of data) {
                        talks.value[talk.whatsapp_identification] = talk;
                    }
                    resolve(talks.value);
                }
            } catch (error) {
                console.error(error);
                reject(error);
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar conversa" }
                });
            }
        });
    }
    async function findOneTalkByChatID() {
        const url = GCurl + "talks/" + selected.value;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.length > 0) activeChat.value = data;
            else throw new Error("Não foi possível encontrar a conversa");
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar conversa por id" }
            });
        }
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
                        talks.value[talk.whatsapp_identification] = talk;
                    });
                }
            })
            .catch(() => {
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada encontrar conversa por usuário" }
                });
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
                router.push({
                    name: "404Resource",
                    params: { resource: "chamada atualizar conversa para usuário", redirect: "Home" }
                });
            });
    }

    function fetchTalks() {
        userStore.user.is_admin ? findAllTalks() : findAllTalksByUser();
    }

    return {
        talks,
        selected,
        activeChat,
        createTalk,
        findOneTalkByChatID,
        updateTalk,
        updateTalkToSignInUser,
        fetchTalks
    };
});
