import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import { createPinia } from "pinia";
import "./services/style.css";
import firebaseMessaging from "./services/firebase";

const app = createApp(App).use(router).use(createPinia());

app.config.globalProperties.$messaging = firebaseMessaging;

app.mount("#app");
