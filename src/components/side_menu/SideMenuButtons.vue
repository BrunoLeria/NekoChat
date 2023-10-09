<script setup>
import { signOut, getAuth } from "firebase/auth";
import { Transition, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../../services/stores/users";

const auth = getAuth();
const userStore = useUsersStore();
const router = useRouter();
const emit = defineEmits(["update:modelValue"]);
const showLoggout = ref(false);
const showConfig = ref(false);
const showTeam = ref(false);
const showAnalytics = ref(false);
const showMenu = ref(false);
const showMenuLabel = ref(false);
const showTasks = ref(false);
const showClients = ref(false);

const handleSignOut = async () => {
	try {
		await signOut(auth);
		await updateStatus(4);
		userStore.user = {};
		await router.push({ name: "Login" });
	} catch (error) {
		console.error(error);
	}
};

function updateStatus(identification) {
	if (identification !== userStore.user.fk_statuses_identification) {
		const newUser = { fk_statuses_identification: identification };
		userStore.updateUser(newUser);
	}
}
</script>
<template>
	<div>
		<transition name='component-fade' mode="out-in">
			<div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3" v-show='showMenu'>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base md:px-2"
					@mouseover="showTeam = true" @mouseleave="showTeam = false" @click="router.push({ name: 'Team' })">
					<svg v-show='!showTeam' xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
						viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showTeam" class="mx-3 sm:hidden lg:inline">Equipe</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base md:px-2"
					@mouseover="showTasks = true" @mouseleave="showTasks = false" @click="router.push({ name: 'Tasks' })">
					<svg v-show='!showTasks' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showTasks" class="mx-3 sm:hidden lg:inline">Tarefas</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base md:px-2"
					@mouseover="showClients = true" @mouseleave="showClients = false"
					@click="router.push({ name: 'Clients' })">
					<svg v-show='!showClients' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showClients" class="mx-3 sm:hidden lg:inline">Clientes</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base md:px-2"
					@mouseover="showConfig = true" @mouseleave="showConfig = false"
					@click="router.push({ name: 'Settings' })">
					<svg v-show='!showConfig' xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
						viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showConfig" class="mx-3 sm:hidden lg:inline">Configurações</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base md:px-2"
					@mouseover="showLoggout = true" @mouseleave="showLoggout = false" @click="handleSignOut">
					<svg v-show='!showLoggout' xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
						viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showLoggout" class="mx-3 sm:hidden lg:inline">Sair</h4>
					</transition>
				</div>
			</div>
		</transition>

		<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base md:px-2"
			@click="showMenu = !showMenu" @mouseover="showMenuLabel = true" @mouseleave="showMenuLabel = false">
			<svg v-show='!showMenuLabel' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
			<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
				<h4 v-show="showMenuLabel" class="mx-3 sm:hidden lg:inline">Menu</h4>
			</transition>
		</div>
	</div>
</template>