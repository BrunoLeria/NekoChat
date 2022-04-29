import { defineStore } from "pinia";

export const useaddressStore = defineStore("talksID", {
    talks: () => ({
        con_fk_usu_codigo: "",
        con_messagens: "",
        con_cliente: ""
    })
});
