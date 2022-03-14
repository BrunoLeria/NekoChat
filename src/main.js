import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import { createPinia } from "pinia";
import "./services/style.css";

createApp(App).use(router).use(createPinia()).mount("#app");
