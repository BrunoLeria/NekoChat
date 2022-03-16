import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("authID", {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            counter: 0,
            name: "Eduardo",
            isAdmin: true,
            token: ""
        };
    }
});
