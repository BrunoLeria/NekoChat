import { defineStore } from "pinia";

export const talksStore = defineStore("talksID", {
    talks: () => ({
        con_codigo: "",
        con_fk_usu_codigo: "",
        con_messagens: "",
        con_cliente: "",
        con_data_hora: "",
        con_chat_id: ""
    })
});
