import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";

export const useTalkStore = defineStore("talks", () => {
    const userStore = useUsersStore();
    const apiURL = "http://192.168.12.178:3005/";
    const talks = ref({});
    const selected = ref("");
    const activeChat = ref([]);

    async function createTalk(message) {
        const url = apiURL + "createTalk";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tlk_message: message,
                tlk_fk_usu_identification: userStore.user.usu_identification,
                tlk_client: talks.value[selected][0].tlk_client,
                tlk_chat_id: talks.value[selected][0].tlk_chat_id,
                tlk_chat_name: talks.value[selected][0].tlk_chat_name,
                tlk_from_me: true
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    async function findAllTalk() {
        const url = apiURL + "findAllTalk";
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    data.forEach((talk) => {
                        if (!Object.keys(talks.value).includes(talk.tlk_chat_id)) {
                            talks.value[talk.tlk_chat_id] = [];
                        }
                        talks.value[talk.tlk_chat_id].push(talk);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function findOneTalkByChatID() {
        const url = apiURL + "findOneTalkByChatId?id=" + selected.value;
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
            .catch((error) => {
                console.log(error);
            });
    }
    async function findAllTalkByUser() {
        talks.value = {};
        const url = apiURL + "findAllTalkByUser?id=" + userStore.user.usu_identification;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    data.forEach((talk) => {
                        if (!Object.keys(talks.value).includes(talk.tlk_chat_id)) {
                            talks.value[talk.tlk_chat_id] = [];
                        }
                        talks.value[talk.tlk_chat_id].push(talk);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function updateTalk(req, res) {}
    async function updateTalkToSignInUser(assumeChat, updateOtherClients = "") {
        const url = apiURL + "updateTalkToSignInUser?id=" + selected.value + updateOtherClients;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tlk_fk_usu_identification: assumeChat ? userStore.user.usu_identification : 1
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    async function deleteTalk(req, res) {}
    async function deleteAllTalk(req, res) {}
    async function sendMessage(message) {
        if (message != "") {
            const urlSendMessage = "https://api.chat-api.com/instance14140/sendMessage?token=sxefyjuyqkf60mtn";
            const urlRecordMessage = apiURL + "createTalk";
            fetch(urlSendMessage, {
                body: "body=" + message + "&phone=" + selected.value.replace("@c.us", ""),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post"
            })
                .then((response) => {
                    fetch(urlRecordMessage, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            tlk_message: message,
                            tlk_fk_usu_identification: 1,
                            tlk_client: talks[selected].value[0].tlk_client,
                            tlk_chat_id: talks[selected].value[0].tlk_chat_id,
                            tlk_chat_name: talks[selected].value[0].tlk_chat_name,
                            tlk_from_me: true
                        })
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Success:", data);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    async function fetchTalks() {
        userStore.user.usu_is_admin ? findAllTalk() : findAllTalkByUser();
    }

    return {
        talks,
        selected,
        activeChat,
        createTalk,
        findAllTalk,
        findOneTalkByChatID,
        findAllTalkByUser,
        updateTalk,
        updateTalkToSignInUser,
        deleteTalk,
        deleteAllTalk,
        sendMessage,
        fetchTalks
    };
});
