import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";

export const useTalkStore = defineStore("talks", () => {
    const userStore = useUsersStore();
    const apiURL = "https://napi.aquicob.com.br:3006/";
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
                tlk_fk_cpn_identification: activeChat.value[0].tlk_fk_cpn_identification,
                tlk_client: activeChat.value[0].tlk_client,
                tlk_chat_id: activeChat.value[0].tlk_chat_id,
                tlk_chat_name: activeChat.value[0].tlk_chat_name,
                tlk_from_me: true
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                alert("Tivemos algum problema na chamada updateTalkToSignInUser. Por favor verifique com o suporte sobre o erro: " + error);
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
                    Object.entries(talks.value).forEach(([key, value]) => {
                        const found = value.find((element) => element.tlk_from_me == "0");
                        if (found == undefined) {
                            delete talks.value[key];
                        }
                    });
                }
            })
            .catch((error) => {
                alert("Tivemos algum problema na chamada findAllTalk. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function findAllTalkByCompany() {
        const url = apiURL + "findAllTalkByCompany?idCompany=" + userStore.user.usu_fk_cpn_identification;
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
                    Object.entries(talks.value).forEach(([key, value]) => {
                        const found = value.find((element) => element.tlk_from_me == "0");
                        if (found == undefined) {
                            delete talks.value[key];
                        }
                    });
                }
            })
            .catch((error) => {
                alert("Tivemos algum problema na chamada findAllTalkByCompany. Por favor verifique com o suporte sobre o erro: " + error);
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
                alert("Tivemos algum problema na chamada findOneTalkByChatID. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function findAllTalkByUser() {
        talks.value = {};
        const url = apiURL + "findAllTalkByUser?id=" + userStore.user.usu_identification + "?idCompany=" + userStore.user.usu_fk_cpn_identification;
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
                    Object.entries(talks.value).forEach(([key, value]) => {
                        const found = value.find((element) => element.tlk_from_me == "0");
                        if (found == undefined) {
                            delete talks.value[key];
                        }
                    });
                }
            })
            .catch((error) => {
                alert("Tivemos algum problema na chamada findAllTalkByUser. Por favor verifique com o suporte sobre o erro: " + error);
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
            .then((data) => {})
            .catch((error) => {
                alert("Tivemos algum problema na chamada updateTalkToSignInUser. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function updateRobot(assumir) {
        const last = activeChat.value.length - 1;
        const url = "https://app.acerteaqui.com/api.php?a=robo&b=transfere_chat";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
                instance: activeChat.value[last].tlk_robot_instance,
                chat_id: activeChat.value[0].tlk_chat_id,
                token: "661F2EC9C06E8A7AC84561CD206196AEE3D3962C35F1148302EDA31E71D37D91",
                responde: assumir
            })
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch((error) => {
                alert("Tivemos algum problema na chamada updateRobot. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function deleteTalk(req, res) {}
    async function deleteAllTalk(req, res) {}
    async function sendMessage(message) {
        const last = activeChat.value.length - 1;
        const instance = activeChat.value[last].tlk_robot_instance;
        const token = activeChat.value[last].tlk_robot_token;
        const urlSendMessage = "https://api.z-api.io/instances/" + instance + "/token/" + token + "/send-text";
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
                alert("Tivemos algum problema na chamada sendMessage. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function sendContact(contact) {
        const last = activeChat.value.length - 1;
        const instance = activeChat.value[last].tlk_robot_instance;
        const token = activeChat.value[last].tlk_robot_token;
        const urlSendContact = "https://api.z-api.io/instances/" + instance + "/token/" + token + "/send-contact";
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
                alert("Tivemos algum problema na chamada sendContact. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function sendImage(image) {
        const last = activeChat.value.length - 1;
        const instance = activeChat.value[last].tlk_robot_instance;
        const token = activeChat.value[last].tlk_robot_token;
        const urlSendImage = "https://api.z-api.io/instances/" + instance + "/token/" + token + "/send-image";
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
                alert("Tivemos algum problema na chamada sendImage. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function sendAudio(audio) {
        const last = activeChat.value.length - 1;
        const instance = activeChat.value[last].tlk_robot_instance;
        const token = activeChat.value[last].tlk_robot_token;
        const urlSendAudio = "https://api.z-api.io/instances/" + instance + "/token/" + token + "/send-audio";
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
                alert("Tivemos algum problema na chamada sendAudio. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function sendVideo(video) {
        const last = activeChat.value.length - 1;
        const instance = activeChat.value[last].tlk_robot_instance;
        const token = activeChat.value[last].tlk_robot_token;
        const urlSendVideo = "https://api.z-api.io/instances/" + instance + "/token/" + token + "/send-video";
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
                alert("Tivemos algum problema na chamada sendVideo. Por favor verifique com o suporte sobre o erro: " + error);
            });
    }
    async function sendDocument(document, extensions) {
        const last = activeChat.value.length - 1;
        const instance = activeChat.value[last].tlk_robot_instance;
        const token = activeChat.value[last].tlk_robot_token;
        const urlSendDocument = "https://api.z-api.io/instances/" + instance + "/token/" + token + "/send-document/" + extensions;
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
                alert("Tivemos algum problema na chamada sendDocument. Por favor verifique com o suporte sobre o erro: " + error);
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
        findAllTalkByCompany,
        findOneTalkByChatID,
        findAllTalkByUser,
        updateTalk,
        updateTalkToSignInUser,
        updateRobot,
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
