import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";
import router from "../router";
import { GCurl } from "../../config/url.js";

export const useTalksStore = defineStore("talks", () => {
    const userStore = useUsersStore();
    const talks = ref({});
    const selected = ref("");
    const activeChat = ref([]);

    async function createTalk(message, whatsapp_identification, type) {
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
                    type: type,
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
            }
            return;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar conversa" }
            });
        }
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
                data.forEach((talk) => {
                    talks.value[talk.whatsapp_identification] = talk;
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function updateTalksToNewTask(identification, talk) {
        const url = GCurl + "talks/tasks/" + identification;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(talk)
            });
            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada atualizar conversa para usuário", redirect: "Home" }
            });
        }
    }
    async function updateTalkToSignInUser(idQuemAssumeChat, updateOtherClients = false) {
        const url = GCurl + "talks/users/" + idQuemAssumeChat;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fk_users_identification: idQuemAssumeChat
                })
            });
            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada atualizar conversa para usuário", redirect: "Home" }
            });
        }
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
        updateTalkToSignInUser,
        updateTalksToNewTask,
        fetchTalks
    };
});
