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
            contactList.value = await response.json();
            return;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar conversa" }
            });
        }
    }

    async function findContactList() {
        const url = GCurl + "talks/contacts";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar conversa" }
            });
        }
    }

    async function findContactListByUser() {
        const url = GCurl + "talks/contacts/users/" + userStore.user.identification;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await response.json();
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
            return response.status;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada encontrar conversa por id" }
            });
        }
    }
    async function findAllTalksByUser() {
        contactList.value = {};
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
                contactList.value = {};
                data.forEach((talk) => {
                    contactList.value[talk.whatsapp_identification] = talk;
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
    async function updateTalkToNewUser(body) {
        const url = GCurl + "talks/users/" + activeChat.value[0].whatsapp_identification;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log("Success:", data);
            return response.status;
        } catch (error) {
            console.error(error);
            router.push({
                name: "404Resource",
                params: { resource: "chamada atualizar conversa para usuário", redirect: "Home" }
            });
        }
    }

    function fetchContactList() {
        return userStore.user.is_admin ? findContactList() : findContactListByUser();
    }

    return {
        talks,
        selected,
        activeChat,
        createTalk,
        findOneTalkByChatID,
        updateTalkToNewUser,
        updateTalksToNewTask,
        fetchContactList
    };
});
