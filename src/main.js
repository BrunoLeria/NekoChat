import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";
import { createPinia } from "pinia";
import "./services/style.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCmZGDH4Ymb-sx4fFsoMWzer9Tp_eQWv6k",
    authDomain: "nekochat-8e644.firebaseapp.com",
    projectId: "nekochat-8e644",
    storageBucket: "nekochat-8e644.appspot.com",
    messagingSenderId: "737345411152",
    appId: "1:737345411152:web:ede89a207dca92e7f41955",
    measurementId: "G-6HETE71KHQ"
};

initializeApp(firebaseConfig);

const app = createApp(App).use(router).use(createPinia());

app.mount("#app");
