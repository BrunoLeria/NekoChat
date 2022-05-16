import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { ref } from "vue";

export const useTalkStore = defineStore("talkID", () => {
    const userStore = useUsersStore();
    const apiURL = "http://localhost:3005/";
    const talks = ref(0);
    const selected = ref("");

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
                tlk_client: talks[selected][0].tlk_client,
                tlk_chat_id: talks[selected][0].tlk_chat_id,
                tlk_chat_name: talks[selected][0].tlk_chat_name,
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

    async function findAllTalk(req, res) {
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
                        if (!Object.keys(talks).includes(talk.tlk_chat_id)) {
                            talks[talk.tlk_chat_id] = [];
                        }
                        talks[talk.tlk_chat_id].push(talk);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function findOneTalk(req, res) {}
    async function findAllTalkByUser(req, res) {}
    async function updateTalk(req, res) {}
    async function deleteTalk(req, res) {}
    async function deleteAllTalk(req, res) {}
    async function sendMessage(message) {
        console.log(message);
    }

    async function fetchTalks() {
        userStore.user.usu_is_admin ? findAllTalk() : findAllTalkByUser();
    }

    return { talks, selected, createTalk, findAllTalk, findOneTalk, updateTalk, deleteTalk, deleteAllTalk, sendMessage, fetchTalks };
});
