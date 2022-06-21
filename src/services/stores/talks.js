import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";

export const useTalkStore = defineStore("talks", () => {
    const userStore = useUsersStore();
    const apiURL = "http://localhost:3005/";
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
                tlk_client: talks.value[selected.value][0].tlk_client,
                tlk_chat_id: talks.value[selected.value][0].tlk_chat_id,
                tlk_chat_name: talks.value[selected.value][0].tlk_chat_name,
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
                    talks.value = {};
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
                    talks.value = {};
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
    async function updateTalkToSignInUser(idQuemAssumeChat, updateOtherClients = false) {
        const url = apiURL + "updateTalkToSignInUser?id=" + selected.value + "&updateOtherClients=" + updateOtherClients;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tlk_fk_usu_identification: idQuemAssumeChat
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
        const urlSendMessage = "https://api.z-api.io/instances/3AC8C37BA3D35099B0C726CD21F273CD/token/A36485D188106831C7E523FB/send-text";
        fetch(urlSendMessage, {
            body: JSON.stringify({
                phone: selected.value.replace("@c.us", ""),
                message: message
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    async function sendContact(contact) {
        const urlSendContact = "https://api.z-api.io/instances/3AC8C37BA3D35099B0C726CD21F273CD/token/A36485D188106831C7E523FB/send-contact";
        fetch(urlSendContact, {
            body: JSON.stringify({
                phone: selected.value.replace("@c.us", ""),
                contactName: contact.name,
                contactPhone: contact.phone,
                contactBusinessDescription: contact.description
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    async function sendImage(image) {
        const urlSendImage = "https://api.z-api.io/instances/3AC8C37BA3D35099B0C726CD21F273CD/token/A36485D188106831C7E523FB/send-image";
        fetch(urlSendImage, {
            body: JSON.stringify({
                phone: selected.value.replace("@c.us", ""),
                image: image
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    async function sendAudio(audio) {
        const urlSendAudio = "https://api.z-api.io/instances/3AC8C37BA3D35099B0C726CD21F273CD/token/A36485D188106831C7E523FB/send-audio";
        fetch(urlSendAudio, {
            body: JSON.stringify({
                phone: selected.value.replace("@c.us", ""),
                audio: audio
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    async function sendVideo(video) {
        const urlSendVideo = "https://api.z-api.io/instances/3AC8C37BA3D35099B0C726CD21F273CD/token/A36485D188106831C7E523FB/send-video";
        fetch(urlSendVideo, {
            body: JSON.stringify({
                phone: selected.value.replace("@c.us", ""),
                video: video
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    async function sendDocument(document, extensions) {
        const urlSendDocument =
            "https://api.z-api.io/instances/3AC8C37BA3D35099B0C726CD21F273CD/token/A36485D188106831C7E523FB/send-document/" + extensions;
        fetch(urlSendDocument, {
            body: JSON.stringify({
                phone: selected.value.replace("@c.us", ""),
                document: document
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
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
        sendContact,
        sendImage,
        sendAudio,
        sendVideo,
        sendDocument,
        fetchTalks
    };
});
