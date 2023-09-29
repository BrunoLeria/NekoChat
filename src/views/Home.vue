<script setup>
import Loading from "../components/Loading.vue";
import { ref, defineAsyncComponent, computed, onBeforeMount } from 'vue';
import Socket from "/src/services/socket.js";
import { useTalkStore } from "/src/services/stores/talks.js";
import { useUsersStore } from "/src/services/stores/users.js";
import { useTeamStore } from "/src/services/stores/team";

const SideMenu = defineAsyncComponent({
	loader: () => import("../components/side_menu/SideMenu.vue"),
	loadingComponent: Loading,
	delay: 200
});
const activeComponent = ref("Welcome");
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();
const translatedTitle = computed(() => {
	document.title = "NChat - Bem-vindo";
	if (activeComponent.value == "Team") document.title = "NChat - Equipe";
	if (activeComponent.value == "Chat") document.title = "NChat - Chat";
	if (activeComponent.value == "Analytics") document.title = "NChat - Análise";
	if (activeComponent.value == "Settings") document.title = "NChat - Configurações";
	if (activeComponent.value == "Tasks") document.title = "NChat - Tarefas";
	if (activeComponent.value == "Clients") document.title = "NChat - Clientes";
	return document.title.replace("NChat - ", "");
});
const selectComponent = (component) => {
	return defineAsyncComponent({
		loader: () => import("./home/" + component + ".vue"),
		loadingComponent: Loading,
		delay: 200
	});
};

onBeforeMount(async () => {
	await talkStore.fetchTalks();
	await teamStore.findAllTeam();
});

Socket.on("newTalk", () => {
	if (userStore.user.identification) {
		if (userStore.user.is_admin) talkStore.fetchTalks();
		else talkStore.fetchTalksByUser();

		if (talkStore.selected) talkStore.findOneTalkByChatID();
	}
});
Socket.on("userUpdated", () => {
	teamStore.findAllTeam();
});
</script>

<template>
	<div class="flex h-full bg-white dark:bg-slate-90">
		<SideMenu v-model="activeComponent" />
		<div class="flex-1 flex flex-col max-w-[75%]">
			<div class="py-6 bg-indigo-100">
				<transition name="slide-fade">
					<h3 class="text-indigo-700 text-2xl text-left ml-4 font-bold rounded-xl">
						{{ translatedTitle }}
					</h3>
				</transition>
			</div>
			<transition name="component-fade" mode="out-in">
				<Loading v-if="activeComponent == 'Loading'" :background-color="'bg-white'" />
				<component
					v-else
					:is="selectComponent(activeComponent)"
					v-model="activeComponent"
					class="h-full m-6 border-8 z-10 shadow-xl overflow-x-scroll"></component>
			</transition>
		</div>
	</div>
</template>

<style scoped>
a {
	color: #42b983;
}
</style>
