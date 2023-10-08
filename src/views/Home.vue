<script setup>
import { defineAsyncComponent, computed, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import { useTalksStore } from "../services/stores/talks.js";
import { useUsersStore } from "../services/stores/users.js";
import { useTeamStore } from "../services/stores/team.js";
import Loading from "../components/Loading.vue";
import Socket from "../services/socket.js";
import { useClientsStore } from '../services/stores/clients';

const SideMenu = defineAsyncComponent({
	loader: () => import("../components/side_menu/SideMenu.vue"),
	loadingComponent: Loading,
	delay: 200
});
const talkStore = useTalksStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();
const clientStore = useClientsStore();
const router = useRouter()
const translatedTitle = computed(() => {
	document.title = "NChat - Bem-vindo";
	if (router.currentRoute.value.name == "Team") document.title = "NChat - Equipe";
	if (router.currentRoute.value.name == "Chat") document.title = "NChat - Chat";
	if (router.currentRoute.value.name == "Analytics") document.title = "NChat - Análise";
	if (router.currentRoute.value.name == "Settings") document.title = "NChat - Configurações";
	if (router.currentRoute.value.name == "Tasks") document.title = "NChat - Tarefas";
	if (router.currentRoute.value.name == "Clients") document.title = "NChat - Clientes";
	return document.title.replace("NChat - ", "");
});
const selectComponent = (component) => {
	if (component === "Home") component = "Welcome";
	return defineAsyncComponent({
		loader: () => import("./home/" + component + ".vue"),
		loadingComponent: Loading,
		delay: 200
	});
};

onBeforeMount(async () => {
	await talkStore.fetchTalks();
	await clientStore.findAllClients();
	await teamStore.findAllTeam();
});

Socket.on("talks", () => {
	if (userStore.user.identification) {
		if (userStore.user.is_admin) talkStore.fetchTalks();
		else talkStore.fetchTalksByUser();

		if (talkStore.selected) talkStore.findOneTalkByChatID();
	}
});
Socket.on("users", () => {
	teamStore.findAllTeam();
});
Socket.on("client", () => {
	teamStore.findAllTeam();
});
</script>

<template>
	<div class="flex h-full bg-white dark:bg-slate-90">
		<SideMenu />
		<div class="flex-1 flex flex-col max-w-[75%]">
			<div class="py-6 bg-indigo-100">
				<transition name="slide-fade">
					<h3 class="text-indigo-700 text-2xl text-left ml-4 font-bold rounded-xl">
						{{ translatedTitle }}
					</h3>
				</transition>
			</div>
			<transition name="component-fade" mode="out-in">
				<component :is="selectComponent(router.currentRoute.value.name)"
					class="h-full m-6 border-8 z-10 shadow-xl overflow-x-scroll">
				</component>
			</transition>
		</div>
	</div>
</template>

<style scoped>
a {
	color: #42b983;
}
</style>
