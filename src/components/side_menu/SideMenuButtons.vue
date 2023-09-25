<script setup>
import { signOut, getAuth } from "firebase/auth";
import { Transition, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "/src/services/stores/users";

const auth = getAuth();
const userStore = useUsersStore();
const router = useRouter();
const emit = defineEmits(["update:modelValue"]);
const showLoggout = ref(false);
const showConfig = ref(false);
const showTeam = ref(false);
const showChat = ref(false);
const showAnalytics = ref(false);
const showMenu = ref(false);
const showMenuLabel = ref(false);

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
function configLoggedUser() {
	userStore.configUser = false;
	emit("update:modelValue", "Settings");
}

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
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
					@mouseover="showChat = true" @mouseleave="showChat = false" @click="$emit('update:modelValue', 'Chat')">
					<svg v-show='!showChat' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showChat" class="mx-3 sm:hidden lg:inline">Chat</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
					@mouseover="showAnalytics = true" @mouseleave="showAnalytics = false"
					@click="$emit('update:modelValue', 'Analytics')">
					<svg v-show='!showAnalytics' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showAnalytics" class="mx-3 sm:hidden lg:inline">Analiticos</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
					@mouseover="showTeam = true" @mouseleave="showTeam = false" @click="$emit('update:modelValue', 'Team')">
					<svg v-show='!showTeam' xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
						stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showTeam" class="mx-3 sm:hidden lg:inline">Equipe</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base 2xl:col-span-2"
					@mouseover="showConfig = true" @mouseleave="showConfig = false" @click="configLoggedUser">
					<svg v-show='!showConfig' xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
						stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showConfig" class="mx-3 sm:hidden lg:inline">Configurações</h4>
					</transition>
				</div>
				<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
					@mouseover="showLoggout = true" @mouseleave="showLoggout = false" @click="handleSignOut">
					<svg v-show='!showLoggout' xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
						stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
					</svg>
					<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
						<h4 v-show="showLoggout" class="mx-3 sm:hidden lg:inline">Sair</h4>
					</transition>
				</div>
			</div>
		</transition>

		<div class="py-7 px-4 flex items bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-base"
			@click="showMenu = !showMenu" @mouseover="showMenuLabel = true" @mouseleave="showMenuLabel = false">
			<svg v-show='!showMenuLabel' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
			<transition name="slide-fade" :duration="{ enter: 50, leave: 50 }">
				<h4 v-show="showMenuLabel" class="mx-3 sm:hidden lg:inline">Menu</h4>
			</transition>
		</div>
	</div>
</template>