<script setup>
import SideMenu from "../components/SideMenu.vue";
import { ref, onMounted } from "vue";
import Dashboard from "./home/Dashboard.vue";
import Team from "./home/Team.vue";
import Chat from "./home/Chat.vue";
import Analytics from "./home/Analytics.vue";
import Settings from "./home/Settings.vue";
import { useTalkStore } from "/src/services/stores/talks.js";

const components = {
	Dashboard,
	Team,
	Chat,
	Analytics,
	Settings
};
const activeComponent = ref("Dashboard");

const talksStore = useTalkStore();

onMounted(() => {
	fetchTalks();
});

async function fetchTalks() {
	const url = "http://192.168.12.178:3005/findAllConversa";
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				let talks = {};
				data.forEach((talk) => {
					if (!Object.keys(talks).includes(talk.con_chat_id)) {
						talks[talk.con_chat_id] = [];
					}
					talks[talk.con_chat_id].push(talk);
				});
				talksStore.talks = talks;
			}
		})
		.catch((error) => {
			console.log(error);
		});
}
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
