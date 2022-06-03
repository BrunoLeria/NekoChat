<script setup>
import SideMenu from "../components/SideMenu.vue";
import { ref, onMounted } from "vue";
import Dashboard from "./home/Dashboard.vue";
import Team from "./home/Team.vue";
import Chat from "./home/Chat.vue";
import Analytics from "./home/Analytics.vue";
import Settings from "./home/Settings.vue";
import Socket from "/src/services/socket.js";
import { useTalkStore } from "/src/services/stores/talks.js";
import { useUsersStore } from "/src/services/stores/users.js";
import { useTeamStore } from "/src/services/stores/team";

const components = {
	Dashboard,
	Team,
	Chat,
	Analytics,
	Settings
};
const activeComponent = ref("Dashboard");
const talkStore = useTalkStore();
const userStore = useUsersStore();
const teamStore = useTeamStore();

onMounted(() => {
	if (userStore.user.usu_is_admin) talkStore.findAllTalk();
	else talkStore.findAllTalkByUser();
});

Socket.on("newTalk", () => {
	if (userStore.user.usu_is_admin) talkStore.findAllTalk();
	else talkStore.findAllTalkByUser();

	if (talkStore.selected) talkStore.findOneTalkByChatID();
});
Socket.on("userUpdated", () => {
	teamStore.findAllTeam();
});
</script>

<template>
	<div class="flex h-full bg-white dark:bg-slate-90">
		<SideMenu v-model="activeComponent" />
		<div class="flex-1 flex flex-col max-w-[85%]">
			<div class="py-6 bg-indigo-100">
				<transition name="slide-fade">
					<h3 class="text-indigo-700 text-2xl text-left ml-4 font-bold rounded-xl">
						{{ activeComponent }}
					</h3>
				</transition>
			</div>
			<transition name="component-fade" mode="out-in">
				<component
					:is="components[activeComponent]"
					v-model="activeComponent"
					class="h-full m-6 border-8 z-10 shadow-xl overflow-x-scroll"></component>
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
