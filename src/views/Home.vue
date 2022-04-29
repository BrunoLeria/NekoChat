<script setup>
import SideMenu from "../components/SideMenu.vue";
import { ref } from "vue";
import Dashboard from "./home/Dashboard.vue";
import Team from "./home/Team.vue";
import Chat from "./home/Chat.vue";
import Analytics from "./home/Analytics.vue";
import Settings from "./home/Settings.vue";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const components = {
    Dashboard,
    Team,
    Chat,
    Analytics,
    Settings
};

const activeComponent = ref("Dashboard");

app.post("/webhook-client", async (req, res) => {
    console.log("Inside Callback hook", req.body);
    const { data } = req.body;
    await Model.create(data);
    return res.status(200).end();
});

app.listen(3001, () => {
    console.log("Client has been stated at: http://localhost:8005");
});
</script>

<template>
    <div class="flex h-full bg-white dark:bg-slate-90">
        <SideMenu v-model="activeComponent" />
        <div class="flex-1 flex flex-col">
            <div class="py-6 bg-indigo-100">
                <transition name="slide-fade">
                    <h3
                        class="
                            text-indigo-700 text-2xl text-left
                            ml-4
                            font-bold
                            rounded-xl
                        ">
                        {{ activeComponent }}
                    </h3>
                </transition>
            </div>
            <transition name="component-fade" mode="out-in">
                <component
                    :is="components[activeComponent]"
                    class="
                        h-full
                        m-12
                        border-8
                        z-10
                        shadow-xl
                        overflow-y-auto
                    "></component>
            </transition>
            <div class="py-10 bg-indigo-100"></div>
        </div>
    </div>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>
